#!/usr/bin/env node
// Empirical game-theoretic analysis (EGTA) by replay: recorded program lineages (the R programs a
// player submitted in one game) are re-seated into synthetic tables and re-judged by the engine,
// no LLM involved. This measures how strategies fare against each other outside the game they
// evolved in, and lets us search for fixpoints and cycles of best-response dynamics.
//
//   node arena/bin/replay.js library  <runsGlob...>                      -> list lineages
//   node arena/bin/replay.js fitness  --mode row|call --tables 400 --size 6 --rounds 4 <season...>
//   node arena/bin/replay.js br       --mode row|call --starts 20 --steps 40 --size 6 --rounds 4 <season...>
//
// Lineages from games with a different number of rounds are truncated / padded (last program repeated).
// Mode "call" evaluates each (judge, program) cell in its own process and caches it, which is exact
// for isolation=call tables and a stateless approximation for the others. Mode "row" replays each
// judge row exactly as the live server would (state, seat order), with no cross-table cache.
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const engine = require("../lib/engine");
const sandbox = require("../lib/sandbox");
const { mulberry32 } = require("../lib/game");

const args = process.argv.slice(2);
const cmd = args[0];
const opt = (k, d) => { const i = args.indexOf("--" + k); return i > 0 ? args[i + 1] : d; };
const seasons = args.slice(1).filter((a, i, arr) => !a.startsWith("--") && !(i > 0 && arr[i - 1].startsWith("--")));
const RUNS = path.resolve(__dirname, "..", "runs");
const MODE = opt("mode", "call"), SIZE = +opt("size", 6), ROUNDS = +opt("rounds", 4);
const OUT = opt("out", null);
const rng = mulberry32(+opt("seed", 1));
const hash = (s) => crypto.createHash("sha1").update(s).digest("hex").slice(0, 12);

function library(filter = {}) {
  const L = [];
  for (const s of seasons) {
    const root = path.join(RUNS, s);
    for (const g of fs.readdirSync(root).filter((d) => d.startsWith("gen-")).sort())
      for (const t of fs.readdirSync(path.join(root, g)).filter((d) => /^t\d+$/.test(d))) {
        const f = path.join(root, g, t, "game.json");
        if (!fs.existsSync(f)) continue;
        const G = JSON.parse(fs.readFileSync(f, "utf8"));
        if (!G.final) continue;
        if (filter.language && G.cfg.language !== filter.language) continue;
        G.seats.forEach((seat, i) => {
          let codes = G.rounds.map((r) => r.programs[i].code);
          while (codes.length < ROUNDS) codes.push(codes[codes.length - 1]);
          codes = codes.slice(0, ROUNDS);
          L.push({ id: `${s}/${g}/${t}/${seat.handle}`, season: s, gen: g, table: t, handle: seat.handle, agentId: seat.agentId, persona: seat.personaId, model: seat.model,
            cfg: G.cfg, orig: G.final[i], codes, h: codes.map(hash) });
        });
      }
  }
  return L;
}

const cellCache = new Map();
async function cell(language, judge, input) {
  const k = hash(judge) + hash(input);
  if (!cellCache.has(k)) cellCache.set(k, sandbox.runJudge(language, judge, [input]).then((r) => r[0].value));
  return cellCache.get(k);
}

// Score one synthetic table (array of lineages). Returns finalScores + rank per seat.
async function evalTable(lins, language = "python") {
  const rounds = [];
  for (let t = 0; t < ROUNDS; t++) {
    const codes = lins.map((l) => l.codes[t]);
    let matrix;
    if (MODE === "call") matrix = await Promise.all(codes.map((j) => Promise.all(codes.map((c) => cell(language, j, c)))));
    else matrix = (await sandbox.runMatrix(language, codes, "row")).matrix;
    rounds.push({ matrix });
  }
  const fin = engine.finalScores(lins.map((_, i) => i), rounds);
  const order = fin.map((_, i) => i).sort((a, b) => fin[b].total - fin[a].total);
  fin.forEach((s, i) => (s.rank = order.indexOf(i) + 1));
  return fin;
}

function sample(L, n, exclude = new Set()) {
  const pool = L.filter((l) => !exclude.has(l.id));
  const out = [];
  const used = new Set();
  while (out.length < n && used.size < pool.length) {
    const k = Math.floor(rng() * pool.length);
    if (used.has(k)) continue;
    used.add(k); out.push(pool[k]);
  }
  return out;
}

async function fitness(L) {
  const T = +opt("tables", 300);
  const stats = new Map(L.map((l) => [l.id, { n: 0, total: 0, d: 0, m: 0, win: 0, rankSum: 0 }]));
  for (let k = 0; k < T; k++) {
    const table = sample(L, SIZE);
    const fin = await evalTable(table);
    table.forEach((l, i) => { const s = stats.get(l.id); s.n++; s.total += fin[i].total; s.d += fin[i].d; s.m += fin[i].m; s.win += fin[i].rank === 1; s.rankSum += fin[i].rank; });
    if ((k + 1) % 50 === 0) console.error(`  ${k + 1}/${T} tables`);
  }
  const rows = L.map((l) => { const s = stats.get(l.id); return { id: l.id, agentId: l.agentId, persona: l.persona, model: l.model, n: s.n, total: s.total / s.n, d: s.d / s.n, m: s.m / s.n, winRate: s.win / s.n, meanRank: s.rankSum / s.n, origRank: l.orig.rank, origTotal: l.orig.total }; })
    .filter((r) => r.n).sort((a, b) => b.total - a.total);
  return rows;
}

// Best-response dynamics over the library: start from a random table; repeatedly let the worst
// seat switch to the library lineage that maximises its own score given the others (a myopic
// best response). A repeated table state is a cycle; a state where no seat can improve is a
// pure-strategy fixpoint (Nash equilibrium restricted to the library).
async function bestResponse(L) {
  const starts = +opt("starts", 10), steps = +opt("steps", 30), cands = +opt("cands", 60);
  const runs = [];
  for (let s = 0; s < starts; s++) {
    let table = sample(L, SIZE);
    const seen = new Map();
    const trace = [];
    let outcome = "max-steps";
    for (let step = 0; step < steps; step++) {
      const key = table.map((l) => l.id).sort().join("|");
      if (seen.has(key)) { outcome = `cycle(len ${step - seen.get(key)})`; break; }
      seen.set(key, step);
      const fin = await evalTable(table);
      // try every seat, starting from the worst, until one can improve
      const bySeat = fin.map((_, i) => i).sort((a, b) => fin[a].total - fin[b].total);
      let moved = false;
      for (const seat of bySeat) {
        const inTable = new Set(table.map((l) => l.id));
        const candidates = sample(L, cands, inTable);
        let best = null, bestVal = fin[seat].total;
        for (const c of candidates) {
          const trial = table.slice(); trial[seat] = c;
          const f2 = await evalTable(trial);
          if (f2[seat].total > bestVal + 1e-9) { bestVal = f2[seat].total; best = c; }
        }
        if (best) {
          trace.push({ step, seat, out: table[seat].id, in: best.id, gain: bestVal - fin[seat].total, from: fin[seat].total, to: bestVal });
          table = table.slice(); table[seat] = best; moved = true; break;
        }
      }
      if (!moved) { outcome = "fixpoint"; break; }
    }
    const fin = await evalTable(table);
    runs.push({ start: s, outcome, steps: trace.length, final: table.map((l, i) => ({ id: l.id, persona: l.persona, model: l.model, total: fin[i].total, d: fin[i].d, m: fin[i].m })), trace });
    console.error(`  start ${s}: ${outcome} after ${trace.length} moves`);
  }
  return runs;
}

(async () => {
  await engine.init();
  const L = library({ language: "python" });
  console.error(`library: ${L.length} lineages from ${seasons.join(", ")} (mode ${MODE}, size ${SIZE}, rounds ${ROUNDS})`);
  let result;
  if (cmd === "library") result = L.map(({ codes, h, cfg, ...l }) => ({ ...l, nodeLimit: cfg.nodeLimit }));
  else if (cmd === "fitness") result = await fitness(L);
  else if (cmd === "br") result = await bestResponse(L);
  else { console.error("unknown command"); process.exit(1); }
  const text = JSON.stringify(result, null, 1);
  if (OUT) fs.writeFileSync(OUT, text); else console.log(text);
})();
