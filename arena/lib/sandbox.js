// OS-level sandbox around the stock Quine Court harnesses (lib/runner.js).
// Each spawn gets: no network (netns), private pid namespace (cannot see/kill other judges),
// private tmpfs over the world-writable temp dirs (no cross-judge files), an unprivileged uid
// from a rotating pool, rlimits, and an empty environment. The harness code itself is the
// server's own, so in-process semantics (shared state across calls within a row, etc.) are
// exactly what the live game has.
const { spawn } = require("child_process");
const { PY_HARNESS, TS_HARNESS, PER_CALL_MS } = require("../../lib/runner");

const UID_BASE = 21000, UID_POOL = 500;
let uidNext = 0;
const USE_SANDBOX = !process.env.QC_NO_SANDBOX;

const INNER = [
  "mount -t tmpfs -o size=16m tmpfs /tmp",
  "mount -t tmpfs -o size=1m tmpfs /dev/shm",
  "mount -t tmpfs -o size=1m tmpfs /var/tmp",
  'exec setpriv --reuid="$0" --regid="$0" --clear-groups --no-new-privs "$@"',
].join(" && ");

class Semaphore {
  constructor(n) { this.n = n; this.q = []; }
  async acquire() { if (this.n > 0) { this.n--; return; } await new Promise((r) => this.q.push(r)); }
  release() { const r = this.q.shift(); if (r) r(); else this.n++; }
  async with(fn) { await this.acquire(); try { return await fn(); } finally { this.release(); } }
}
// Row timing is wall-clock (SIGALRM / vm timeout), so keep concurrent judges <= cores.
const sem = new Semaphore(parseInt(process.env.QC_SANDBOX_CONCURRENCY) || Math.max(2, require("os").cpus().length));

function command(language, nInputs) {
  const cpu = String(Math.ceil((PER_CALL_MS * (nInputs + 1)) / 1000) + 5);
  if (language === "python") {
    return ["prlimit", "--nproc=32", "--as=1073741824", "--fsize=1048576", "--nofile=64", `--cpu=${cpu}`, "--",
      "python3", "-I", "-c", PY_HARNESS];
  }
  return ["prlimit", "--nproc=128", "--fsize=1048576", "--nofile=64", `--cpu=${cpu}`, "--",
    process.execPath, "--no-warnings", "--max-old-space-size=256", "-e", TS_HARNESS];
}

function spawnJudge(language, code, inputs) {
  return new Promise((resolve) => {
    const argv = command(language, inputs.length);
    const env = { PATH: "/usr/local/bin:/usr/bin:/bin:" + require("path").dirname(process.execPath), LANG: "C.UTF-8", HOME: "/tmp" };
    let child;
    if (USE_SANDBOX) {
      const uid = String(UID_BASE + (uidNext++ % UID_POOL));
      child = spawn("unshare", ["-n", "-m", "-p", "-f", "--mount-proc", "--kill-child", "sh", "-c", INNER, uid, ...argv],
        { stdio: ["pipe", "pipe", "pipe"], env });
    } else {
      child = spawn(argv[argv.indexOf("--") + 1], argv.slice(argv.indexOf("--") + 2), { stdio: ["pipe", "pipe", "pipe"], env });
    }
    let out = "", err = "";
    child.stdout.on("data", (d) => { if (out.length < 4e6) out += d; });
    child.stderr.on("data", (d) => { if (err.length < 1e4) err += d; });
    const killer = setTimeout(() => child.kill("SIGKILL"), PER_CALL_MS * (inputs.length + 1) + 3000);
    child.on("error", () => {});
    child.on("close", () => {
      clearTimeout(killer);
      // Same parsing/validation as lib/runner.js runRow.
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
    child.stdin.on("error", () => {});
    child.stdin.end(JSON.stringify({ code, inputs, ms: PER_CALL_MS }));
  });
}

const runJudge = (language, code, inputs) => sem.with(() => spawnJudge(language, code, inputs));

function shuffle(n, rng) {
  const p = [...Array(n).keys()];
  for (let i = n - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; }
  return p;
}

// isolation "row": one process per judge, inputs in seat order (exactly the live server).
// isolation "row-shuffled": one process per judge, inputs in a fresh random order per judge per round.
// isolation "call": one process per (judge, input) -> score() is effectively a pure function.
async function runMatrix(language, codes, isolation = "row", rng = Math.random) {
  const n = codes.length;
  let rows;
  if (isolation === "call") {
    rows = await Promise.all(codes.map((c) => Promise.all(codes.map((s) => runJudge(language, c, [s]).then((r) => r[0])))));
  } else if (isolation === "row-shuffled") {
    rows = await Promise.all(codes.map(async (c) => {
      const p = shuffle(n, rng);
      const r = await runJudge(language, c, p.map((i) => codes[i]));
      const back = new Array(n);
      p.forEach((i, k) => (back[i] = r[k]));
      return back;
    }));
  } else {
    rows = await Promise.all(codes.map((c) => runJudge(language, c, codes)));
  }
  return { matrix: rows.map((r) => r.map((c) => c.value)), errors: rows.map((r) => r.map((c) => c.error)) };
}

module.exports = { runMatrix, runJudge, Semaphore };
