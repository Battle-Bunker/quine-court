// Runs every program (as scorer) against every program's source (as input).
// NOT a security sandbox: subprocess + per-call timeouts only.
const { spawn } = require("child_process");
const path = require("path");

const PER_CALL_MS = 1000;

const PY_HARNESS = String.raw`
import sys, json, signal, math
def _alarm(*a): raise TimeoutError("timeout")
signal.signal(signal.SIGALRM, _alarm)
req = json.loads(sys.stdin.read())
ns = {"__name__": "__program__"}
try:
    signal.setitimer(signal.ITIMER_REAL, req["ms"] / 1000)
    exec(compile(req["code"], "<program>", "exec"), ns)
    signal.setitimer(signal.ITIMER_REAL, 0)
    fn = ns.get("score")
    if not callable(fn): raise Exception("program must define score(program: str) -> float")
except BaseException as e:
    signal.setitimer(signal.ITIMER_REAL, 0)
    for _ in req["inputs"]: print(json.dumps({"error": "load: " + repr(e)[:200]}), flush=True)
    sys.exit(0)
for s in req["inputs"]:
    try:
        signal.setitimer(signal.ITIMER_REAL, req["ms"] / 1000)
        v = fn(s)
        signal.setitimer(signal.ITIMER_REAL, 0)
        print(json.dumps({"value": v if isinstance(v, (int, float)) and not isinstance(v, bool) else None, "raw": repr(v)[:80]}), flush=True)
    except BaseException as e:
        signal.setitimer(signal.ITIMER_REAL, 0)
        print(json.dumps({"error": repr(e)[:200]}), flush=True)
`;

const TS_HARNESS = String.raw`
const vm = require("vm");
const { stripTypeScriptTypes } = require("module");
let buf = "";
process.stdin.on("data", (d) => (buf += d));
process.stdin.on("end", () => {
  const req = JSON.parse(buf);
  const out = (o) => process.stdout.write(JSON.stringify(o) + "\n");
  let fn;
  const ctx = vm.createContext({ Math, JSON });
  try {
    const js = stripTypeScriptTypes(req.code);
    vm.runInContext(js + "\n;globalThis.__score = typeof score === 'function' ? score : undefined;", ctx, { timeout: req.ms });
    fn = ctx.__score;
    if (typeof fn !== "function") throw new Error("program must define function score(program: string): number");
  } catch (e) {
    for (const _ of req.inputs) out({ error: "load: " + String(e && e.message || e).slice(0, 200) });
    return;
  }
  ctx.__fn = fn;
  for (const s of req.inputs) {
    try {
      ctx.__arg = s;
      const v = vm.runInContext("__fn(__arg)", ctx, { timeout: req.ms });
      out({ value: typeof v === "number" ? v : null, raw: String(v).slice(0, 80) });
    } catch (e) {
      out({ error: String(e && e.message || e).slice(0, 200) });
    }
  }
});
`;

function runRow(language, code, inputs) {
  return new Promise((resolve) => {
    const [cmd, args] =
      language === "python"
        ? ["python3", ["-I", "-c", PY_HARNESS]]
        : [process.execPath, ["--no-warnings", "-e", TS_HARNESS]];
    const child = spawn(cmd, args, { stdio: ["pipe", "pipe", "pipe"] });
    let out = "";
    child.stdout.on("data", (d) => (out += d));
    const killer = setTimeout(() => child.kill("SIGKILL"), PER_CALL_MS * (inputs.length + 1) + 3000);
    child.on("close", () => {
      clearTimeout(killer);
      const lines = out.split("\n").filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return { error: "bad output" }; } });
      resolve(inputs.map((_, i) => {
        const r = lines[i];
        if (!r) return { value: 0, error: "timeout / crashed" };
        if (r.error) return { value: 0, error: r.error };
        const v = r.value;
        if (typeof v !== "number" || !Number.isFinite(v) || v < 0 || v > 1) return { value: 0, error: "not a number in [0,1]: " + r.raw };
        return { value: v, error: null };
      }));
    });
    child.stdin.end(JSON.stringify({ code, inputs, ms: PER_CALL_MS }));
  });
}

// Returns { matrix: number[][], errors: (string|null)[][] } with rows = scorer, cols = scored program.
async function runMatrix(language, codes) {
  const rows = await Promise.all(codes.map((c) => runRow(language, c, codes)));
  return { matrix: rows.map((r) => r.map((c) => c.value)), errors: rows.map((r) => r.map((c) => c.error)) };
}

module.exports = { runMatrix };
