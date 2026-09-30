#!/usr/bin/env node
// Run a season: a persistent roster of (persona x model) agents plays generations of parallel
// tables. After every game each agent rewrites its notebook; after every generation a public
// digest (standings + winning programs) is published to everyone. This is what lets a metagame
// form, drift, and (maybe) settle.
//   node arena/bin/season.js arena/configs/<season>.json [--gens N]
const fs = require("fs");
const path = require("path");
const { runGame, mulberry32 } = require("../lib/game");
const { PERSONAS, HANDLES } = require("../lib/personas");
const llm = require("../lib/llm");
const engine = require("../lib/engine");

const cfgPath = process.argv[2];
if (!cfgPath) { console.error("usage: season.js <config.json> [--gens N]"); process.exit(1); }
const S = JSON.parse(fs.readFileSync(cfgPath, "utf8"));
const gensArg = process.argv.indexOf("--gens");
const GENS = gensArg > 0 ? parseInt(process.argv[gensArg + 1]) : S.generations;
const ROOT = path.resolve(__dirname, "..", "runs", S.name);
fs.mkdirSync(path.join(ROOT, "notebooks"), { recursive: true });
fs.chmodSync(path.join(__dirname, "..", "runs"), 0o700); // judges run as other uids; keep live data unreadable to them
fs.writeFileSync(path.join(ROOT, "config.json"), JSON.stringify(S, null, 1));
llm.setLedger(path.join(ROOT, "ledger.jsonl"));
const logFile = path.join(ROOT, "log.txt");
const log = (s) => { const line = `[${new Date().toISOString().slice(11, 19)}] ${s}`; console.log(line); fs.appendFileSync(logFile, line + "\n"); };

// Roster: stable ids and neutral handles.
const agents = S.roster.map((a, i) => ({
  agentId: `${a.persona}-${a.model}${a.tag ? "-" + a.tag : ""}`,
  handle: a.handle || HANDLES[i % HANDLES.length],
  personaId: a.persona, persona: PERSONAS[a.persona], model: a.model, effort: a.effort || S.effort || "medium",
}));
for (const a of agents) if (!a.persona) throw new Error("unknown persona " + a.personaId);
if (new Set(agents.map((a) => a.agentId)).size !== agents.length) throw new Error("duplicate agent ids");
fs.writeFileSync(path.join(ROOT, "agents.json"), JSON.stringify(agents.map(({ persona, ...a }) => a), null, 1));
const nbPath = (a) => path.join(ROOT, "notebooks", `${a.agentId}.md`);
const readNb = (a) => (fs.existsSync(nbPath(a)) ? fs.readFileSync(nbPath(a), "utf8") : "");

function tableConfig(g, t, rng) {
  const tables = S.tables || [{}];
  const c = { ...S.base, ...tables[t % tables.length] };
  for (const [k, vals] of Object.entries(S.sweep || {})) c[k] = vals[Math.floor(rng() * vals.length)];
  c.players = c.players || S.tableSize;
  return c;
}

const fy = (a, rng) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
// Deal agents to tables so that each table mixes models (stratified shuffle).
function seatTables(rng, nTables, size) {
  const shuffled = fy(agents.slice(), rng);
  const byModel = {};
  for (const a of shuffled) (byModel[a.model] = byModel[a.model] || []).push(a);
  const dealt = fy(Object.values(byModel), rng).flat();
  const tables = Array.from({ length: nTables }, () => []);
  dealt.forEach((a, i) => tables[i % nTables].push(a));
  return tables.map((t) => fy(t.slice(0, size), rng));
}

function digestFor(g, results) {
  const L = [`## Generation ${g} (${results.length} tables)`];
  results.forEach(({ cfg, record }, t) => {
    const flags = [`${cfg.players} players`, `${cfg.numRounds} rounds`, `node limit ${cfg.nodeLimit}`, `edit budget ${cfg.distanceLimit}`,
      `measure ${cfg.measure}`, `isolation ${cfg.isolation}`, cfg.visibility === "open" ? "open code" : null, cfg.chat ? "chat" : null].filter(Boolean).join(", ");
    const ranked = record.final.slice().sort((a, b) => a.rank - b.rank);
    L.push(`### Table ${t + 1} (${flags})\n` + "```\n" + ranked.map((s) => `${s.rank}. ${s.handle.padEnd(10)} d=${s.d.toFixed(3)} m=${s.m.toFixed(3)} total=${s.total.toFixed(4)}`).join("\n") + "\n```");
    const wi = record.final.findIndex((s) => s.rank === 1);
    const lastCode = record.rounds[record.rounds.length - 1].programs[wi].code;
    L.push(`Winner ${record.final[wi].handle}'s final program:\n` + "```" + cfg.language + "\n" + lastCode.replace(/\n?$/, "\n") + "```");
  });
  return L.join("\n\n");
}

function summaryRows(g, t, record) {
  const R = record.rounds, n = record.seats.length;
  return record.seats.map((s, i) => {
    const given = R.flatMap((r) => r.matrix[i].filter((_, j) => j !== i));
    const recvOthers = R.flatMap((r) => r.matrix.filter((_, j) => j !== i).map((row) => row[i]));
    return {
      season: S.name, gen: g, table: t, gameId: record.gameId, agentId: s.agentId, handle: s.handle, persona: s.personaId, model: s.model, effort: s.effort,
      cfg: record.cfg, rank: record.final[i].rank, n, d: record.final[i].d, m: record.final[i].m, total: record.final[i].total,
      selfScore: R.reduce((a, r) => a + r.matrix[i][i], 0) / R.length,
      givenMean: given.reduce((a, b) => a + b, 0) / given.length,
      recvFromOthers: recvOthers.reduce((a, b) => a + b, 0) / recvOthers.length,
      errorsGiven: R.reduce((a, r) => a + r.errors[i].filter(Boolean).length, 0),
      failedTurns: R.filter((r) => r.programs[i].failed).length,
      meanDistance: R.slice(1).reduce((a, r) => a + (r.programs[i].distance || 0), 0) / Math.max(1, R.length - 1),
      nodes: R.map((r) => r.programs[i].nodeCount),
      cost: R.reduce((a, r) => a + r.turnStats[i].cost, 0),
    };
  });
}

(async () => {
  await engine.init();
  const rng = mulberry32(S.seed || 1);
  const size = S.tableSize;
  const nTables = S.tablesPerGen || Math.floor(agents.length / size);
  let digest = null;
  for (let g = 1; g <= GENS; g++) {
    const gdir = path.join(ROOT, `gen-${String(g).padStart(2, "0")}`);
    const seating = seatTables(rng, nTables, size);
    const cfgs = seating.map((_, t) => tableConfig(g, t, rng));
    const seeds = seating.map(() => Math.floor(rng() * 1e9));
    if (fs.existsSync(path.join(gdir, "done.json"))) { digest = fs.readFileSync(path.join(gdir, "digest.md"), "utf8"); log(`gen ${g} already done, skipping`); continue; }
    fs.rmSync(gdir, { recursive: true, force: true });
    fs.mkdirSync(gdir, { recursive: true });
    log(`gen ${g}: ${nTables} tables; spent so far $${llm.spent().toFixed(2)}`);
    const results = await Promise.all(seating.map(async (tableAgents, t) => {
      const cfg = cfgs[t];
      const gameId = `${S.name}/g${g}t${t + 1}`;
      const seats = tableAgents.map((a) => ({ ...a, notebook: S.notebooks === false ? "" : readNb(a) }));
      log(`  ${gameId}: ${seats.map((s) => `${s.handle}[${s.personaId}/${s.model}]`).join(" ")} :: ${JSON.stringify(cfg)}`);
      try {
        const { record, notebooks } = await runGame({ gameId, cfg, seats, dir: path.join(gdir, `t${t + 1}`), digest: S.digest === false ? null : digest, seed: seeds[t], reflect: S.reflect !== false, log });
        if (S.notebooks !== false) tableAgents.forEach((a, i) => fs.writeFileSync(nbPath(a), notebooks[i]));
        log(`  ${gameId} final: ` + record.final.slice().sort((a, b) => a.rank - b.rank).map((s) => `${s.handle} ${s.total.toFixed(3)} (d${s.d.toFixed(2)} m${s.m.toFixed(2)})`).join(" | "));
        return { cfg, record };
      } catch (e) {
        log(`  ${gameId} CRASHED: ${e.stack}`);
        return null;
      }
    }));
    const ok = results.filter(Boolean);
    digest = digestFor(g, ok);
    fs.writeFileSync(path.join(gdir, "digest.md"), digest);
    for (const [t, r] of results.entries()) if (r) for (const row of summaryRows(g, t + 1, r.record)) fs.appendFileSync(path.join(ROOT, "summary.jsonl"), JSON.stringify(row) + "\n");
    fs.writeFileSync(path.join(gdir, "done.json"), JSON.stringify({ at: new Date().toISOString(), tables: ok.length, spent: llm.spent() }));
    log(`gen ${g} done; spent $${llm.spent().toFixed(2)}`);
  }
  log(`season done; spent $${llm.spent().toFixed(2)}`);
})();
