const test = require("node:test");
const assert = require("node:assert");
const path = require("path");
const vm = require("vm");
const { execFileSync } = require("child_process");
const { stripTypeScriptTypes } = require("module");
const Parser = require("web-tree-sitter");
const { canonicalize } = require("../lib/canonical");

const PY = `import math
# a comment that evaluators must not see
def helper(text, k=3):
    """docstring"""
    counts = {}
    for ch in text:
        counts[ch] = counts.get(ch, 0) + 1
    return len(counts) / (k + math.sqrt(len(text) + 1))

class Box:
    size = 2
    def grow(self, n):
        return self.size * n

def score(program):
    return max(0.0, min(1.0, helper(program, k=2) / 10 + Box().grow(0)))
`;
const TS = `// a comment that evaluators must not see
const WEIGHT: number = 0.5;
function helper(text: string, k: number): number {
  const counts: Record<string, number> = {};
  for (const ch of text) { counts[ch] = (counts[ch] || 0) + 1 } // no semicolon
  const o = { k, total: text.length }
  return Object.keys(counts).length / (o.k + Math.sqrt(o.total + 1)) * WEIGHT
}
function score(program: string): number {
  const v = helper(program, 3)
  return Math.max(0, Math.min(1, \`\${v}\`.length > 0 ? v / 10 : 0))
}
`;

const runPy = (code, arg) => Number(execFileSync("python3", ["-I", "-c", code + "\nimport sys\nprint(score(sys.argv[1]))", arg]).toString());
const runTs = (code, arg) => { const ctx = vm.createContext({ Math, JSON, Object }); vm.runInContext(stripTypeScriptTypes(code), ctx); return ctx.score(arg); };

test("python: comments, docstrings and defined names removed; behaviour unchanged", async () => {
  const [c] = await canonicalize("python", [PY]);
  assert.ok(!c.includes("comment") && !c.includes("docstring"));
  for (const name of ["helper", "counts", "text", "Box"]) assert.ok(!new RegExp(`\\b${name}\\b`).test(c), name);
  assert.match(c, /def score\(/);
  assert.equal(runPy(c, "hello world"), runPy(PY, "hello world"));
});

test("python: canonical form ignores comments, naming and layout", async () => {
  const variant = PY.replace(/helper/g, "zzz").replace(/counts/g, "tally").replace("# a comment", "# other").replace("    counts", "    tally");
  const [a, b] = await canonicalize("python", [PY, variant]);
  assert.equal(a, b);
});

test("typescript: comments and defined names removed; behaviour unchanged", async () => {
  await Parser.init();
  const p = new Parser();
  p.setLanguage(await Parser.Language.load(path.join(__dirname, "..", "public", "grammars", "tree-sitter-typescript.wasm")));
  const [c] = await canonicalize("typescript", [TS], p);
  assert.ok(!c.includes("comment"));
  for (const name of ["helper", "counts", "WEIGHT"]) assert.ok(!new RegExp(`\\b${name}\\b`).test(c), name);
  assert.equal(runTs(c, "hello world"), runTs(TS, "hello world"));
  const [again] = await canonicalize("typescript", [TS.replace(/WEIGHT/g, "W2").replace(/\n  /g, "\n    ")], p);
  assert.equal(again, c);
});
