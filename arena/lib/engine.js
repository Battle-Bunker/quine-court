// Headless Quine Court engine: same parsing, limits and scoring as server.js, plus optional
// rule patches so the arena can compare the shipped game with variants.
const path = require("path");
const Parser = require("web-tree-sitter");
const AstDiff = require("../../public/astdiff.js");
const { finalScores, discriminability } = require("../../lib/scoring");
const variants = require("./variants");
const sandbox = require("./sandbox");

const PUB = path.join(__dirname, "..", "..", "public");
const differs = {};
let ready = null;

function init() {
  if (!ready) ready = (async () => {
    await Parser.init();
    for (const lang of ["python", "typescript"]) {
      const p = new Parser();
      p.setLanguage(await Parser.Language.load(path.join(PUB, "grammars", `tree-sitter-${lang}.wasm`)));
      differs[lang] = AstDiff.createTreeSitterDiff(p);
    }
  })();
  return ready;
}

// --- measurement ------------------------------------------------------------------------
// measure "vanilla": exactly what server.js does (tree-sitter AST; comments free; any leaf,
//   however long, is one node and one relabel).
// measure "bounded": patch that closes the free-information loopholes: string contents are
//   split into word/punctuation tokens (<= 8 chars each, escape sequences included), every other
//   leaf longer than 8 chars is split into 8-char chunks, and comments are counted as tokenized
//   nodes. Normal code measures the same as vanilla.
const STRINGY = new Set(["string_content", "string_fragment", "comment"]);
// Whitespace runs inside strings/comments count too (8 chars per token); outside literals, layout is free.
const tokenize = (s) => (s.match(/[A-Za-z0-9_]+|\s+|[^\sA-Za-z0-9_]/g) || []).flatMap((t) => t.length <= 8 ? [t] : t.match(/.{1,8}/gs));
const leaf = (label) => ({ kind: "tok", label, children: [] });

function bounded(parsed) {
  const src = parsed.source;
  const xf = (n) => {
    if (STRINGY.has(n.kind)) return { kind: n.kind, label: n.kind, children: tokenize(src.slice(n.start, n.end)).map((t) => leaf("tok=" + t)) };
    if (!n.children.length) {
      const text = src.slice(n.start, n.end);
      if (text.length > 8) return { kind: n.kind, label: n.kind, children: text.match(/.{1,8}/gs).map((t) => leaf("chunk=" + t)) };
      return n;
    }
    return { ...n, children: n.children.map(xf) };
  };
  const root = xf(parsed.root);
  if (parsed.comments.length) root.children = [...root.children, { kind: "comments", label: "comments", children: parsed.comments.map(([s, e]) => xf({ kind: "comment", label: "comment", start: s, end: e, children: [] })) }];
  const sizeOf = (n) => n.children.reduce((a, c) => a + sizeOf(c), 1);
  return { ...parsed, root, size: sizeOf(root) };
}

function measure(language, code, mode = "vanilla") {
  const ad = differs[language];
  const p = ad.parse(code);
  return mode === "bounded" ? bounded(p) : p;
}

function distance(language, a, b, mode = "vanilla") {
  const ad = differs[language];
  if (mode !== "bounded") return ad.diff(a, b).distance;
  return ad.ted(measure(language, a, mode).root, measure(language, b, mode).root).distance;
}

// Mirrors server.js check(): syntax, node limit, edit budget from the previous round's program.
function check(cfg, prevCode, code) {
  const parsed = measure(cfg.language, code, cfg.measure);
  if (parsed.hasError) return { ok: false, error: "Syntax error" };
  if (parsed.size > cfg.nodeLimit) return { ok: false, error: `Too complex: ${parsed.size} nodes > limit ${cfg.nodeLimit}`, nodeCount: parsed.size };
  let dist = null;
  if (prevCode != null) {
    dist = distance(cfg.language, prevCode, code, cfg.measure);
    if (dist > cfg.distanceLimit) return { ok: false, error: `Too many changes: distance ${dist} > budget ${cfg.distanceLimit}`, nodeCount: parsed.size, distance: dist };
  }
  return { ok: true, nodeCount: parsed.size, distance: dist };
}

// Human-readable detail for a rejected program (the web UI shows diff highlights; this is the text
// equivalent): node counts per top-level statement, and the edit operations against the previous program.
function explain(cfg, prevCode, code) {
  const L = [];
  const p = measure(cfg.language, code, cfg.measure);
  const sizeOf = (n) => n.children.reduce((a, c) => a + sizeOf(c), 1);
  const src = code.split("\n");
  L.push("Node count by top-level statement:");
  for (const c of p.root.children) {
    const first = (src[(c.line || 1) - 1] || "").trim().slice(0, 60);
    L.push(`  ${String(sizeOf(c)).padStart(4)}  line ${c.line || "?"}: ${c.kind === "comments" ? "(comments)" : first}`);
  }
  if (prevCode != null) {
    const a = measure(cfg.language, prevCode, cfg.measure), b = p;
    const { mapping } = differs[cfg.language].ted(a.root, b.root);
    const ops = [];
    for (const [x, y] of mapping) {
      if (!x) ops.push(`insert ${y.label} (new line ${y.line || "?"})`);
      else if (!y) ops.push(`delete ${x.label} (old line ${x.line || "?"})`);
      else if (x.label !== y.label) ops.push(`relabel ${x.label} -> ${y.label} (line ${y.line || "?"})`);
    }
    L.push(`Edit operations vs your previous program (${ops.length}):`);
    ops.slice(0, 60).forEach((o) => L.push("  " + o.slice(0, 120)));
    if (ops.length > 60) L.push(`  ... ${ops.length - 60} more`);
  }
  return L.join("\n");
}

async function runRound(cfg, codes, rng) {
  return sandbox.runMatrix(cfg.language, codes, cfg.isolation || "row", rng);
}

// Final scores under the table's scoring rule (shipped rule = lib/scoring.js).
const scoreGame = (cfg, ids, rounds) => variants.scores(cfg, ids, rounds.map((r) => ({ matrix: r.matrix })));
// Provisional standings from the rounds so far (d needs >= 2 rounds).
function standings(cfg, ids, rounds) {
  if (!rounds.length) return null;
  return scoreGame(cfg, ids, rounds);
}

module.exports = { init, measure, distance, check, explain, runRound, scoreGame, finalScores, discriminability, standings, differs };
