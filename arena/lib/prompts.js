// Rules text and prompt builders. The rules a player sees depend on the table config so that
// every variant is described truthfully.
const fs = require("fs");
const path = require("path");
const { PY_HARNESS, TS_HARNESS } = require("../../lib/runner");

const SCORING_SRC = fs.readFileSync(path.join(__dirname, "..", "..", "lib", "scoring.js"), "utf8");
const VARIANTS_SRC = fs.readFileSync(path.join(__dirname, "variants.js"), "utf8");
const { isShipped } = require("./variants");
const fence = (lang, code) => "```" + lang + "\n" + code.replace(/\n?$/, "\n") + "```";
const langName = (cfg) => (cfg.language === "python" ? "Python" : "TypeScript");
const sig = (cfg) => (cfg.language === "python" ? "score(program: str) -> float" : "function score(program: string): number");

function rules(cfg) {
  const L = [];
  L.push(`# Quine Court - rules for this table

Quine Court: every program sits on the bench and stands trial. Win by judging sharply and being judged well, a few AST edits at a time.

- ${cfg.players} players. Each writes a ${langName(cfg)} program that defines \`${sig(cfg)}\` returning a number in [0, 1].
- Every round, every program is run as a *judge* on the source code of every program at the table, including its own. Row = judge (scorer), column = judged program. Errors, timeouts (1 s) and out-of-range values score 0.
- ${cfg.numRounds} rounds. Round 1: any program within the size limit. Every later round your program must be within **${cfg.distanceLimit} edits** of your previous round's program (tree edit distance on the syntax tree). A player whose new program is invalid re-enters their previous program unchanged.
- Size limit: **${cfg.nodeLimit} syntax-tree nodes**.
${cfg.visibility === "sealed"
  ? "- Visibility: **sealed**. You never see any other player's program: not during the game, not after it. The only evidence you get is results: after each round everyone sees the full score matrix (values rounded to 3 decimals; a cell marked `err` means that judge raised an error or timed out on that program and it counts as 0; error messages are not shown), plus every program's node count and edit distance."
  : `- Visibility: during the game everyone sees every round's full score matrix (including error messages), plus every program's node count and edit distance. ${cfg.visibility === "open" ? "**This table plays open-source: after each round, everyone's code for that round is revealed to all players.**" : "You see only your own code; everyone's code is revealed when the game ends."}`}
${cfg.chat ? "- Talk: each round you may post one short public message (max 300 chars) that every player reads before the next round. Talk is cheap: nothing enforces promises.\n" : ""}
## Final score = ${cfg.hunt ? "d^2 x m x (1 - L/2)" : "d^2 x m"}
${cfg.m === "rank"
  ? "- **m (esteem is relative on this table)**: every round, each judge's scores of the *other* programs are converted to evenly spaced ranks in [0, 1] (the program it scores highest among the others gets 1, the lowest gets 0; ties share the average rank). m = the mean rank you receive from the other judges over all rounds. Every judge therefore hands out the same total esteem; only the order it puts the others in matters, and a judge's score of itself is ignored."
  : cfg.self === "excluded"
  ? "- **m** = mean score your program received from the *other* judges in every round (your own judge's score of yourself is ignored on this table)."
  : "- **m** = mean score your program received from every judge (including itself) in every round (the mean of your column over all rounds)."}
- **d** = discriminability of your judge across all rounds: how consistently your program scores each lineage (the sequence of programs one player submits) while separating different lineages. For every lineage i, every ordered pair of distinct rounds t != t', and every other lineage i' != i in every round t'': it is a win if |x[i][t] - x[i][t']| < |x[i][t] - x[i'][t'']| (strict; ties lose). d = wins / comparisons. ${cfg.self === "excluded" || cfg.m === "rank" ? "On this table your own lineage is **not** included: d is computed over the other players' lineages only." : "Your own lineage counts as one of the lineages."} Scale doesn't matter, only consistency and separation.${cfg.hunt ? `
- **L (legibility)** = how well the *other* judges track *you*: the share of their d-comparisons whose reference lineage is yours that they win, averaged over the other judges. Being hard to track (inconsistent across rounds in their eyes, or confusable with other players) lowers L and raises your total by up to 2x relative to being perfectly tracked.` : ""}
${cfg.objective === "absolute" ? "- Objective: **maximize your own final score d^2 x m.** Your absolute score is what counts; placement relative to others does not matter." : "- Objective: **place 1st at this table by final score.** Only placement counts."}`);

  L.push(`## How code is measured
- Code is parsed with tree-sitter-${cfg.language}. Size = number of named syntax nodes. Comments and whitespace are not nodes.
- A leaf node's label is its type plus its exact text (an identifier, number, or the text of a string), so changing one name, number or string is 1 relabel edit. Distance = unit-cost tree edit distance (insert / delete / relabel a node).`);
  if (cfg.measure === "bounded") {
    L.push(`- **This table uses bounded measurement:** the text inside every string literal and every comment is split into tokens (runs of letters/digits/_ and runs of whitespace, each up to 8 characters, plus each punctuation character), and each token is a node; any other leaf longer than 8 characters (e.g. a long identifier or number) is split into 8-character chunks. So long strings, comments and literals cost nodes and edits in proportion to their length.`);
  }

  L.push(`## Execution
- Programs run in an isolated sandbox: no network, no access to other judges' processes or files. ${cfg.language === "python" ? "The Python standard library is available." : "Only the JavaScript built-ins Math and JSON are provided."} Anything your program does inside its own judge process is fair game.`);
  if (cfg.isolation === "call") L.push(`- **This table isolates every call:** each (judge, program) pair is evaluated in a brand-new process, so nothing carries over between calls; score() only ever sees the one source string it is given.`);
  if (cfg.isolation === "row-shuffled") L.push(`- **This table shuffles inputs:** each judge process scores all programs in a fresh random order every round.`);
  if (cfg.rulesDetail === "full") {
    if (cfg.isolation === "row" || !cfg.isolation) L.push(`- Each round, each judge's program is loaded once in a fresh process, then score() is called on each program's source in seat order (the order shown in the matrix; it never changes during the game).`);
    L.push(`- The exact harness each judge runs in (from the game server's lib/runner.js; the arena only adds the sandbox around it):
${fence(cfg.language === "python" ? "python" : "js", cfg.language === "python" ? PY_HARNESS.trim() : TS_HARNESS.trim())}
- The exact scoring code, where rounds' matrices have rows = judges${isShipped(cfg) ? " (lib/scoring.js)" : ` (this table uses the variant rules in arena/lib/variants.js with ${JSON.stringify({ self: cfg.self, m: cfg.m, hunt: cfg.hunt })}; its finalScores fallback is the shipped lib/scoring.js)`}:
${fence("js", (isShipped(cfg) ? SCORING_SRC : VARIANTS_SRC).trim())}`);
  }
  return L.join("\n\n");
}

function matrixTable(handles, r, sealed = false) {
  const fmt = (v, e) => (sealed && e ? "err" : typeof v === "number" ? v.toFixed(sealed ? 3 : 6) : "-");
  const w = Math.max(8, ...handles.map((h) => h.length));
  const head = "judge \\ judged".padEnd(w + 2) + handles.map((h) => h.padStart(10)).join("");
  const rows = handles.map((h, i) => h.padEnd(w + 2) + r.matrix[i].map((v, j) => fmt(v, r.errors[i][j]).padStart(10)).join(""));
  const errs = [];
  if (!sealed) r.errors.forEach((row, i) => row.forEach((e, j) => { if (e) errs.push(`  ${handles[i]} judging ${handles[j]}: ${e}`); }));
  return "```\n" + head + "\n" + rows.join("\n") + "\n```" + (errs.length ? "\nErrors (scored 0):\n" + errs.join("\n") : "");
}

function standingsTable(handles, st) {
  if (!st) return "";
  const hasL = st.some((s) => s.L != null);
  return "```\n" + "player".padEnd(12) + "d".padStart(9) + "m".padStart(9) + (hasL ? "L".padStart(9) : "") + "total".padStart(9) + "\n" +
    st.map((s, i) => handles[i].padEnd(12) + s.d.toFixed(4).padStart(9) + s.m.toFixed(4).padStart(9) + (hasL ? (s.L ?? 0).toFixed(4).padStart(9) : "") + s.total.toFixed(4).padStart(9)).join("\n") + "\n```";
}

function history(ctx) {
  const { cfg, handles, rounds, me, standings } = ctx;
  if (!rounds.length) return "No rounds have been played yet.";
  const L = [];
  rounds.forEach((r, k) => {
    L.push(`### Round ${k + 1} score matrix (rows = judges, columns = judged programs)\n` + matrixTable(handles, r, cfg.visibility === "sealed"));
    L.push("Programs: " + handles.map((h, i) => `${h} ${r.programs[i].nodeCount} nodes${k ? (r.programs[i].carriedOver ? " (carried over)" : `, ${r.programs[i].distance} edits`) : ""}`).join("; "));
    if (cfg.visibility === "open") L.push(handles.map((h, i) => i === me ? "" : `${h}'s round ${k + 1} program:\n${fence(cfg.language, r.programs[i].code)}`).filter(Boolean).join("\n\n"));
    if (cfg.chat && r.messages) {
      const msgs = handles.map((h, i) => r.messages[i] ? `  ${h}: ${r.messages[i]}` : null).filter(Boolean);
      if (msgs.length) L.push(`Public messages posted with round ${k + 1}:\n` + msgs.join("\n"));
    }
  });
  if (rounds.length >= 2 && standings) L.push(`### Provisional standings if the game ended now\n` + standingsTable(handles, standings));
  return L.join("\n\n");
}

function turnPrompt(ctx) {
  const { cfg, handles, rounds, me, myCodes, myNotes, notebook, digest } = ctx;
  const k = rounds.length + 1;
  const L = [rules(cfg)];
  if (digest) L.push(`# Public archive: results from the previous generation of games\n${digest}`);
  if (notebook) L.push(`# Your notebook (your own lessons from earlier games)\n${notebook}`);
  L.push(`# This game
You are **${handles[me]}** (seat ${me + 1}). Seats in order: ${handles.map((h, i) => `${i + 1}. ${h}${i === me ? " (you)" : ""}`).join(", ")}.
Other players are other AI agents with their own styles; you know them only by these handles.`);
  L.push(`## History\n` + history(ctx));
  if (myCodes.length) {
    L.push(`## Your programs so far\n` + myCodes.map((c, i) => `Round ${i + 1}:\n${fence(cfg.language, c)}`).join("\n\n"));
  }
  if (myNotes.length) L.push(`## Your private notes from earlier rounds\n` + myNotes.map((n, i) => `After round ${i + 1}: ${n}`).join("\n"));
  const constraint = myCodes.length
    ? `It must have at most ${cfg.nodeLimit} nodes and be within ${cfg.distanceLimit} edits of your round ${k - 1} program above (submitting it unchanged is allowed).`
    : `It must have at most ${cfg.nodeLimit} nodes.`;
  L.push(`## Your move: round ${k} of ${cfg.numRounds}
Write your program for round ${k}. ${constraint}
Respond with:
<notes>private notes to your future self for the next rounds (max ~150 words)</notes>
${cfg.chat ? "<message>optional public message to the table (max 300 chars)</message>\n" : ""}<program>
${fence(cfg.language, cfg.language === "python" ? "def score(program: str) -> float:\n    ..." : "function score(program: string): number {\n  ...\n}")}
</program>`);
  return L.join("\n\n");
}

function retryPrompt(base, prevText, program, problem) {
  return `${base}

# Your previous attempt was rejected
You submitted:
${fence("", program || "(no program found in your response)")}
Problem: ${problem}
Fix it and respond again in exactly the required format (<notes>, ${"<program>"}).`;
}

function reflectionPrompt(ctx) {
  const { cfg, handles, rounds, me, final, notebook, persona } = ctx;
  const L = [rules(cfg)];
  L.push(`# Game over - ${cfg.visibility === "sealed" ? "final results" : "full reveal"}
You were **${handles[me]}** (seat ${me + 1}).`);
  L.push(`## Final scores\n` + "```\n" + final.map((s, i) => ({ ...s, h: handles[i] })).sort((a, b) => b.total - a.total)
    .map((s, r) => `${r + 1}. ${s.h.padEnd(10)} d=${s.d.toFixed(4)} m=${s.m.toFixed(4)}${s.L != null ? ` L=${s.L.toFixed(4)}` : ""} total=${s.total.toFixed(4)}`).join("\n") + "\n```");
  L.push(`## History\n` + history({ ...ctx, cfg: { ...cfg, visibility: cfg.visibility === "sealed" ? "sealed" : "hidden" } }));
  if (cfg.visibility === "sealed") L.push(`## Your code (other players' programs are never revealed)\n` + rounds.map((r, k) => `Round ${k + 1}:\n${fence(cfg.language, r.programs[me].code)}`).join("\n"));
  else L.push(`## Everyone's code\n` + handles.map((h, i) => {
    const codes = rounds.map((r) => r.programs[i].code);
    const firstLast = codes.length > 1 && i !== me ? [[1, codes[0]], [codes.length, codes[codes.length - 1]]] : codes.map((c, k) => [k + 1, c]);
    return `### ${h}${i === me ? " (you)" : ""}\n` + firstLast.map(([k, c]) => `Round ${k}:\n${fence(cfg.language, c)}`).join("\n");
  }).join("\n\n"));
  L.push(`# Your notebook so far\n${notebook || "(empty)"}`);
  L.push(`# Task
Update your notebook for future games of Quine Court (you will play again, against a reshuffled mix of the same pool of players, possibly with different table settings). Keep what is still useful, add what this game taught you: what won and why, what failed, what other players (by handle) tend to do${cfg.visibility === "sealed" ? " (as far as you can infer it from results)" : ""}, and what you plan to try next. Max 350 words. Respond with:
<notebook>...</notebook>`);
  return L.join("\n\n");
}

function systemPrompt(handle, persona) {
  return `You are ${handle}, a player in Quine Court, a programming game played by several AI agents.

${persona.prompt}
${persona.creed ? `\nYour creed (binding: every program you submit follows it): ${persona.creed}\n` : ""}
Let your persona shape how you think and what you try, but play to win: the persona is a lens, not an excuse for careless play. Always reply in the exact format requested.`;
}

// Parsing model output.
function extract(text, tag) {
  const re = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, "g");
  let m, last = null;
  while ((m = re.exec(text))) last = m[1];
  return last;
}
function extractProgram(text) {
  let body = extract(text, "program");
  if (body == null) {
    const blocks = [...text.matchAll(/```(?:python|py|typescript|ts)?\n([\s\S]*?)```/g)];
    if (!blocks.length) return null;
    body = blocks[blocks.length - 1][1];
  }
  const fenced = body.match(/```[a-zA-Z]*\n([\s\S]*?)```/);
  if (fenced) body = fenced[1];
  return body.replace(/^\n+/, "").replace(/\s+$/, "") + "\n";
}

module.exports = { rules, turnPrompt, retryPrompt, reflectionPrompt, systemPrompt, extract, extractProgram, matrixTable, standingsTable };
