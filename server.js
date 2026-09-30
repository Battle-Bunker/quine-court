const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const Parser = require("web-tree-sitter");
const AstDiff = require("./public/astdiff.js");
const { runMatrix } = require("./lib/runner");
const { finalScores } = require("./lib/scoring");
const { canonicalize } = require("./lib/canonical");

const PORT = process.env.PORT || 8080;
const PUB = path.join(__dirname, "public");
const rooms = new Map(); // in-memory only (MVP)
const differs = {};
const parsers = {};

async function initParsers() {
  await Parser.init();
  for (const lang of ["python", "typescript"]) {
    const p = new Parser();
    p.setLanguage(await Parser.Language.load(path.join(PUB, "grammars", `tree-sitter-${lang}.wasm`)));
    differs[lang] = AstDiff.createTreeSitterDiff(p);
    const cp = new Parser();
    cp.setLanguage(p.getLanguage());
    parsers[lang] = cp;
  }
}

const uid = () => crypto.randomUUID();

// What a given viewer is allowed to see: others' code stays private until the game ends.
function view(room, token) {
  const me = room.players.find((p) => p.token === token);
  const isAdmin = token === room.adminToken;
  const finished = room.status === "finished";
  const lastProgram = (pid) => {
    for (let i = room.rounds.length - 1; i >= 0; i--) if (room.rounds[i].programs[pid]) return room.rounds[i].programs[pid].code;
    return null;
  };
  return {
    id: room.id, name: room.name, config: room.config, status: room.status, running: room.running,
    roundNumber: room.rounds.length + 1, isAdmin,
    me: me ? { id: me.id, name: me.name, submission: room.submissions[me.id] || null, previous: lastProgram(me.id), participant: !room.participants || room.participants.includes(me.id) } : null,
    players: room.players.map((p) => ({ id: p.id, name: p.name, submitted: !!room.submissions[p.id], participant: !room.participants || room.participants.includes(p.id) })),
    rounds: room.rounds.map((r) => ({
      index: r.index, players: r.players, matrix: r.matrix, errors: r.errors, ranAt: r.ranAt,
      programs: Object.fromEntries(Object.entries(r.programs).map(([pid, pr]) => [pid, { nodeCount: pr.nodeCount, distance: pr.distance, carriedOver: pr.carriedOver, code: finished || (me && pid === me.id) ? pr.code : undefined, canonical: finished || (me && pid === me.id) ? pr.canonical : undefined }])),
    })),
    final: room.final,
    lastError: room.lastError || null,
  };
}

function check(room, playerId, code) {
  const ad = differs[room.config.language];
  const parsed = ad.parse(code);
  if (parsed.hasError) return { ok: false, error: "Syntax error" };
  if (parsed.size > room.config.nodeLimit) return { ok: false, error: `Too complex: ${parsed.size} nodes > limit ${room.config.nodeLimit}` };
  let distance = null;
  const prev = room.rounds.length ? room.rounds[room.rounds.length - 1].programs[playerId] : null;
  if (prev) {
    distance = ad.diff(prev.code, code).distance;
    if (distance > room.config.distanceLimit) return { ok: false, error: `Too many changes: distance ${distance} > budget ${room.config.distanceLimit}` };
  }
  return { ok: true, nodeCount: parsed.size, distance };
}

async function runRound(room) {
  const ad = differs[room.config.language];
  if (!room.participants) room.participants = room.players.filter((p) => room.submissions[p.id]).map((p) => p.id);
  const ids = room.participants;
  if (ids.length < 2) throw new Error("Need at least 2 players with submitted programs");
  const prevRound = room.rounds[room.rounds.length - 1];
  const programs = {};
  for (const id of ids) {
    const sub = room.submissions[id];
    if (sub) programs[id] = { code: sub.code, nodeCount: sub.nodeCount, distance: sub.distance, carriedOver: false };
    else {
      const p = prevRound.programs[id];
      programs[id] = { code: p.code, nodeCount: p.nodeCount, distance: 0, carriedOver: true };
    }
  }
  room.running = true;
  try {
    // Evaluators only ever see the canonical minified form (no comments, generic names, regenerated whitespace).
    const codes = ids.map((id) => programs[id].code);
    const canon = await canonicalize(room.config.language, codes, parsers[room.config.language]);
    ids.forEach((id, i) => (programs[id].canonical = canon[i]));
    const { matrix, errors } = await runMatrix(room.config.language, codes, canon);
    room.rounds.push({ index: room.rounds.length + 1, players: ids, programs, matrix, errors, ranAt: new Date().toISOString() });
  } finally {
    room.running = false;
  }
  room.submissions = {};
  room.status = room.rounds.length >= room.config.numRounds ? "finished" : "running";
  if (room.status === "finished") room.final = finalScores(ids, room.rounds);
}

function body(req) {
  return new Promise((res, rej) => {
    let b = "";
    req.on("data", (d) => { b += d; if (b.length > 1e6) req.destroy(); });
    req.on("end", () => { try { res(b ? JSON.parse(b) : {}); } catch (e) { rej(e); } });
  });
}
const json = (res, code, obj) => { res.writeHead(code, { "content-type": "application/json" }); res.end(JSON.stringify(obj)); };
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".wasm": "application/wasm", ".css": "text/css" };

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://x");
  const parts = url.pathname.split("/").filter(Boolean);
  try {
    if (parts[0] === "api") {
      if (req.method === "POST" && parts[1] === "rooms" && parts.length === 2) {
        const b = await body(req);
        const room = {
          id: uid(), name: String(b.name || "Untitled room").slice(0, 80), adminToken: uid(),
          config: { language: "python", nodeLimit: 100, distanceLimit: 10, numRounds: 3 },
          status: "lobby", players: [], submissions: {}, rounds: [], participants: null, final: null, running: false,
        };
        rooms.set(room.id, room);
        return json(res, 200, { id: room.id, adminToken: room.adminToken });
      }
      const room = rooms.get(parts[2]);
      if (parts[1] !== "rooms" || !room) return json(res, 404, { error: "Room not found" });
      const token = url.searchParams.get("token") || req.headers["x-token"] || "";
      if (req.method === "GET" && parts.length === 3) return json(res, 200, view(room, token));
      const b = req.method === "POST" ? await body(req) : {};
      const action = parts[3];
      const isAdmin = token === room.adminToken;
      const me = room.players.find((p) => p.token === token);
      if (action === "config") {
        if (!isAdmin) return json(res, 403, { error: "Admin only" });
        if (room.status !== "lobby") return json(res, 400, { error: "Config is locked once round 1 has run" });
        const c = b.config || {};
        const lang = c.language === "typescript" ? "typescript" : "python";
        if (lang !== room.config.language) room.submissions = {};
        room.config = {
          language: lang,
          nodeLimit: Math.max(1, parseInt(c.nodeLimit) || 100),
          distanceLimit: Math.max(0, parseInt(c.distanceLimit) || 0),
          numRounds: Math.max(2, parseInt(c.numRounds) || 3),
        };
        return json(res, 200, view(room, token));
      }
      if (action === "join") {
        const name = String(b.name || "").trim().slice(0, 40);
        if (!name) return json(res, 400, { error: "Name required" });
        const p = { id: uid(), name, token: uid() };
        room.players.push(p);
        return json(res, 200, { playerId: p.id, token: p.token });
      }
      if (action === "check" || action === "submit") {
        if (!me) return json(res, 403, { error: "Join the room first" });
        if (room.status === "finished") return json(res, 400, { error: "Game over" });
        if (room.participants && !room.participants.includes(me.id)) return json(res, 400, { error: "You joined after round 1; spectating" });
        const code = String(b.code || "");
        const r = check(room, me.id, code);
        if (action === "submit" && r.ok) room.submissions[me.id] = { code, nodeCount: r.nodeCount, distance: r.distance, at: new Date().toISOString() };
        return json(res, r.ok ? 200 : 400, r);
      }
      if (action === "run") {
        if (!isAdmin) return json(res, 403, { error: "Admin only" });
        if (room.running) return json(res, 409, { error: "Already running" });
        if (room.status === "finished") return json(res, 400, { error: "Game over" });
        try { await runRound(room); room.lastError = null; } catch (e) { return json(res, 400, { error: e.message }); }
        return json(res, 200, view(room, token));
      }
      return json(res, 404, { error: "Unknown action" });
    }
    // static
    let file = path.join(PUB, path.normalize(url.pathname).replace(/^(\.\.[\/\\])+/, ""));
    if (!file.startsWith(PUB) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(PUB, "index.html");
    res.writeHead(200, { "content-type": TYPES[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  } catch (e) {
    console.error(e);
    json(res, 500, { error: String(e.message || e) });
  }
});

initParsers().then(() => server.listen(PORT, () => console.log(`quine-court on :${PORT}`)));
