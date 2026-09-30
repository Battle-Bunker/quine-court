// Thin wrapper around the `claude` CLI in print mode: no tools, no MCP, no settings, custom
// system prompt, prompt on stdin, JSON result. Global concurrency limit + retries + cost ledger.
const { spawn } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { Semaphore } = require("./sandbox");

const sem = new Semaphore(parseInt(process.env.QC_LLM_CONCURRENCY) || 16);
const WORKDIR = fs.mkdtempSync(path.join(os.tmpdir(), "qc-llm-"));
// Session/transport variables of the parent Claude Code process must not leak into child calls.
const STRIP = ["CLAUDE_CODE_SESSION_ID", "CLAUDE_CODE_REMOTE_SESSION_ID", "CLAUDE_CODE_TEE_SDK_STDOUT", "CLAUDE_CODE_MESSAGING_SOCKET",
  "CLAUDE_CODE_MESSAGING_TOKEN", "CLAUDE_CODE_SYNC_SESSION_REFS", "CLAUDE_CODE_DIAGNOSTICS_FILE", "CLAUDE_CODE_DEBUG",
  "CLAUDE_CODE_SESSION_ATTENDED", "CLAUDE_CODE_CHILD_SESSION", "CLAUDE_EFFORT", "MAX_THINKING_TOKENS"];
const childEnv = () => { const e = { ...process.env }; for (const k of STRIP) delete e[k]; return e; };

let ledgerPath = null;
const setLedger = (p) => { ledgerPath = p; };
let totalCost = 0;
const spent = () => totalCost;

function once({ model, effort, system, prompt, timeoutMs }) {
  return new Promise((resolve) => {
    const args = ["-p", "--model", model, "--no-session-persistence", "--tools", "", "--strict-mcp-config", "--setting-sources", "",
      "--disable-slash-commands", "--system-prompt", system, "--output-format", "json"];
    if (effort) args.push("--effort", effort);
    const t0 = Date.now();
    const child = spawn("claude", args, { cwd: WORKDIR, env: childEnv(), stdio: ["pipe", "pipe", "pipe"] });
    let out = "", err = "";
    child.stdout.on("data", (d) => (out += d));
    child.stderr.on("data", (d) => { if (err.length < 2e4) err += d; });
    const killer = setTimeout(() => child.kill("SIGKILL"), timeoutMs);
    child.on("error", (e) => { err += String(e); });
    child.on("close", (code) => {
      clearTimeout(killer);
      const ms = Date.now() - t0;
      try {
        const d = JSON.parse(out);
        if (d.is_error || typeof d.result !== "string") return resolve({ ok: false, error: `cli error: ${String(d.result || d.subtype).slice(0, 300)}`, cost: d.total_cost_usd || 0, ms });
        resolve({ ok: true, text: d.result, cost: d.total_cost_usd || 0, usage: d.usage, ms, modelUsage: Object.keys(d.modelUsage || {}) });
      } catch {
        resolve({ ok: false, error: `exit ${code}: ${(err || out).slice(0, 500)}`, cost: 0, ms });
      }
    });
    child.stdin.on("error", () => {});
    child.stdin.end(prompt);
  });
}

async function call(opts) {
  const { label = "", retries = 3 } = opts;
  const timeoutMs = opts.timeoutMs || 20 * 60 * 1000;
  let last;
  for (let attempt = 0; attempt <= retries; attempt++) {
    last = await sem.with(() => once({ ...opts, timeoutMs }));
    totalCost += last.cost || 0;
    if (ledgerPath) fs.appendFileSync(ledgerPath, JSON.stringify({ at: new Date().toISOString(), label, model: opts.model, effort: opts.effort, ok: last.ok, cost: last.cost, ms: last.ms, out: last.usage && last.usage.output_tokens, err: last.ok ? undefined : last.error }) + "\n");
    if (last.ok) return last;
    await new Promise((r) => setTimeout(r, 5000 * 2 ** attempt));
  }
  return last;
}

module.exports = { call, setLedger, spent };
