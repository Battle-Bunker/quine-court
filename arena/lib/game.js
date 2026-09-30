// One game at one table: LLM players submit programs each round, the engine runs the matrix,
// final scores use the server's scoring code, then each player writes a notebook reflection.
const fs = require("fs");
const path = require("path");
const engine = require("./engine");
const sandbox = require("./sandbox");
const llm = require("./llm");
const P = require("./prompts");

const NULL_PROGRAM = { python: "def score(program: str) -> float:\n    return 0.0\n", typescript: "function score(program: string): number {\n  return 0;\n}\n" };

function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

async function validate(cfg, prevCode, code) {
  if (!code) return { ok: false, error: "No program found. Put your code inside <program> ... </program>." };
  const c = engine.check(cfg, prevCode, code);
  if (!c.ok) return c;
  const [self] = await sandbox.runJudge(cfg.language, code, [code]);
  if (self.error) return { ...c, ok: false, error: `Your program fails when judging its own source: ${self.error}` };
  return { ...c, selfTest: self.value };
}

async function playTurn({ cfg, seat, ctx, dir, round, log }) {
  const system = P.systemPrompt(seat.handle, seat.persona);
  const base = P.turnPrompt(ctx);
  let prompt = base, attempts = [], chosen = null;
  const prevCode = ctx.myCodes.length ? ctx.myCodes[ctx.myCodes.length - 1] : null;
  for (let a = 0; a < 3; a++) {
    const r = await llm.call({ model: seat.model, effort: seat.effort, system, prompt, label: `${ctx.gameId}/${seat.handle}/r${round}/a${a}` });
    if (!r.ok) { attempts.push({ ok: false, llmError: r.error, cost: r.cost, ms: r.ms }); continue; }
    const program = P.extractProgram(r.text);
    const v = await validate(cfg, prevCode, program);
    attempts.push({ text: r.text, program, valid: v, cost: r.cost, ms: r.ms, outTokens: r.usage && r.usage.output_tokens });
    if (v.ok) { chosen = { program, notes: (P.extract(r.text, "notes") || "").trim().slice(0, 1500), message: cfg.chat ? (P.extract(r.text, "message") || "").trim().slice(0, 300) : null, v }; break; }
    let detail = "";
    if (program && /Too (complex|many changes)/.test(v.error || "")) { try { detail = "\n" + engine.explain(cfg, prevCode, program); } catch {} }
    prompt = P.retryPrompt(base, r.text, program, v.error + detail);
    log(`  ${ctx.gameId} ${seat.handle} r${round} attempt ${a + 1} rejected: ${v.error}`);
  }
  fs.writeFileSync(path.join(dir, "transcripts", `${seat.handle}-r${round}.json`), JSON.stringify({ system, prompt: base, attempts }, null, 1));
  return { chosen, attempts };
}

// seats: [{ agentId, handle, persona: {title,prompt}, personaId, model, effort, notebook }]
async function runGame({ gameId, cfg, seats, dir, digest = null, seed = 1, reflect = true, log = console.log }) {
  await engine.init();
  fs.mkdirSync(path.join(dir, "transcripts"), { recursive: true });
  const rng = mulberry32(seed);
  const handles = seats.map((s) => s.handle);
  const ids = seats.map((_, i) => i);
  const rounds = [];
  const myCodes = seats.map(() => []);
  const myNotes = seats.map(() => []);
  const record = { gameId, cfg, seed, startedAt: new Date().toISOString(), seats: seats.map(({ notebook, persona, ...s }) => ({ ...s, personaTitle: persona.title })), rounds };
  const save = () => fs.writeFileSync(path.join(dir, "game.json"), JSON.stringify(record, null, 1));

  for (let k = 1; k <= cfg.numRounds; k++) {
    const standings = rounds.length ? engine.standings(cfg, ids, rounds) : null;
    const turns = await Promise.all(seats.map((seat, i) => playTurn({
      cfg, seat, round: k, dir, log,
      ctx: { gameId, cfg, handles, rounds, me: i, myCodes: myCodes[i], myNotes: myNotes[i], notebook: seat.notebook, digest, standings },
    })));
    const programs = turns.map((t, i) => {
      const prev = myCodes[i].length ? myCodes[i][myCodes[i].length - 1] : null;
      if (t.chosen) return { code: t.chosen.program, nodeCount: t.chosen.v.nodeCount, distance: t.chosen.v.distance, carriedOver: false, selfTest: t.chosen.v.selfTest };
      if (prev != null) { const c = engine.check(cfg, null, prev); return { code: prev, nodeCount: c.nodeCount, distance: 0, carriedOver: true, failed: true }; }
      const code = NULL_PROGRAM[cfg.language];
      return { code, nodeCount: engine.check(cfg, null, code).nodeCount, distance: null, carriedOver: false, failed: true, fallback: true };
    });
    programs.forEach((p, i) => { myCodes[i].push(p.code); if (turns[i].chosen) myNotes[i].push(turns[i].chosen.notes); });
    const { matrix, errors } = await engine.runRound(cfg, programs.map((p) => p.code), rng);
    rounds.push({
      index: k, programs, matrix, errors,
      messages: cfg.chat ? turns.map((t) => (t.chosen && t.chosen.message) || null) : undefined,
      notes: turns.map((t) => (t.chosen ? t.chosen.notes : null)),
      turnStats: turns.map((t) => ({ attempts: t.attempts.length, cost: t.attempts.reduce((a, x) => a + (x.cost || 0), 0), ms: t.attempts.reduce((a, x) => a + (x.ms || 0), 0), failed: !t.chosen })),
      ranAt: new Date().toISOString(),
    });
    save();
    log(`  ${gameId} round ${k}/${cfg.numRounds} done` + (programs.some((p) => p.failed) ? ` (failed: ${handles.filter((_, i) => programs[i].failed).join(",")})` : ""));
  }
  const final = engine.scoreGame(cfg, ids, rounds);
  const order = final.map((s, i) => i).sort((a, b) => final[b].total - final[a].total);
  final.forEach((s, i) => { s.rank = order.indexOf(i) + 1; s.handle = handles[i]; });
  record.final = final;
  record.finishedAt = new Date().toISOString();
  save();

  let notebooks = seats.map((s) => s.notebook || "");
  if (reflect) {
    notebooks = await Promise.all(seats.map(async (seat, i) => {
      const prompt = P.reflectionPrompt({ cfg, handles, rounds, me: i, final, notebook: seat.notebook, persona: seat.persona });
      const r = await llm.call({ model: seat.model, effort: seat.effort, system: P.systemPrompt(seat.handle, seat.persona), prompt, label: `${gameId}/${seat.handle}/reflect` });
      const nb = r.ok ? (P.extract(r.text, "notebook") || "").trim() : "";
      fs.writeFileSync(path.join(dir, "transcripts", `${seat.handle}-reflect.json`), JSON.stringify({ prompt, text: r.ok ? r.text : r.error, cost: r.cost }, null, 1));
      return nb ? nb.slice(0, 4000) : (seat.notebook || "");
    }));
    record.notebooksAfter = notebooks;
    save();
  }
  return { record, notebooks };
}

module.exports = { runGame, mulberry32, NULL_PROGRAM };
