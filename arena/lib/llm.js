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

// Account usage limits ("You've hit your session limit · resets 4:30pm (UTC)") must never turn into
// failed turns: every caller in this process pauses until the stated reset (or 15 min), then retries.
let pausedUntil = 0;
const LIMIT_RE = /session limit|usage limit|rate.?limit|429|overloaded|529/i;
function resetTime(msg) {
  const m = /resets\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i.exec(msg || "");
  if (!m) return Date.now() + 15 * 60 * 1000;
  let h = +m[1] % 12 + (m[3].toLowerCase() === "pm" ? 12 : 0);
  const d = new Date(); d.setUTCHours(h, +(m[2] || 0), 0, 0);
  let t = d.getTime();
  while (t < Date.now()) t += 24 * 3600 * 1000;
  return t + 2 * 60 * 1000;
}
const log = (s) => console.log(`[${new Date().toISOString().slice(11, 19)}] ${s}`);

// Spend-rate governor: the account's usage window is shared with the orchestrating session, so each
// process keeps its rolling one-hour spend under QC_BUDGET_PER_HOUR (USD, API-equivalent).
const BUDGET = parseFloat(process.env.QC_BUDGET_PER_HOUR) || Infinity;
const recent = []; // [time, cost]
async function governor() {
  for (;;) {
    const now = Date.now();
    while (recent.length && recent[0][0] < now - 3600e3) recent.shift();
    const used = recent.reduce((a, [, c]) => a + c, 0);
    if (used < BUDGET) return;
    await new Promise((r) => setTimeout(r, Math.max(5000, recent[0][0] + 3600e3 - now)));
  }
}

async function call(opts) {
  const { label = "", retries = 3 } = opts;
  const timeoutMs = opts.timeoutMs || 20 * 60 * 1000;
  let last;
  for (let attempt = 0; attempt <= retries;) {
    while (Date.now() < pausedUntil) await new Promise((r) => setTimeout(r, Math.min(60000, pausedUntil - Date.now() + 1000)));
    await governor();
    last = await sem.with(() => once({ ...opts, timeoutMs }));
    totalCost += last.cost || 0;
    if (last.cost) recent.push([Date.now(), last.cost]);
    const u = last.usage || {};
    if (ledgerPath) fs.appendFileSync(ledgerPath, JSON.stringify({ at: new Date().toISOString(), label, model: opts.model, effort: opts.effort, ok: last.ok, cost: last.cost, ms: last.ms, in: u.input_tokens, out: u.output_tokens, err: last.ok ? undefined : last.error }) + "\n");
    if (last.ok) return last;
    if (LIMIT_RE.test(last.error || "")) {
      const until = /session limit|usage limit/i.test(last.error) ? resetTime(last.error) : Date.now() + 2 * 60 * 1000;
      if (until > pausedUntil) { pausedUntil = until; log(`usage limit hit (${label}); pausing all calls until ${new Date(until).toISOString()}`); }
      continue; // limit waits do not consume retries
    }
    attempt++;
    await new Promise((r) => setTimeout(r, 5000 * 2 ** attempt));
  }
  return last;
}

module.exports = { call, setLedger, spent };
