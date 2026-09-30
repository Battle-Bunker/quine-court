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
# Programs are pure functions: the program is loaded afresh for every input, so no state survives between calls.
for s in req["inputs"]:
    ns = {"__name__": "__program__"}
    try:
        signal.setitimer(signal.ITIMER_REAL, req["ms"] / 1000)
        exec(compile(req["code"], "<program>", "exec"), ns)
        fn = ns.get("score")
        if not callable(fn): raise Exception("program must define score(program: str) -> float")
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
  let js;
  try { js = stripTypeScriptTypes(req.code); } catch (e) {
    for (const _ of req.inputs) out({ error: "load: " + String(e && e.message || e).slice(0, 200) });
    return;
  }
  // Programs are pure functions: a fresh context per input, so no state survives between calls.
  for (const s of req.inputs) {
    try {
      const ctx = vm.createContext({ Math, JSON });
      vm.runInContext(js + "\n;globalThis.__score = typeof score === 'function' ? score : undefined;", ctx, { timeout: req.ms });
      if (typeof ctx.__score !== "function") throw new Error("program must define function score(program: string): number");
      ctx.__arg = s;
      const v = vm.runInContext("__score(__arg)", ctx, { timeout: req.ms });
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
// Each program runs from its own raw code; the sources it scores are `inputs` (the canonical forms).
async function runMatrix(language, codes, inputs = codes) {
  const rows = await Promise.all(codes.map((c) => runRow(language, c, inputs)));
  return { matrix: rows.map((r) => r.map((c) => c.value)), errors: rows.map((r) => r.map((c) => c.error)) };
}

module.exports = { runMatrix };
