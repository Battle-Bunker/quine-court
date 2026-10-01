# Quine Court arena

Headless harness for running many Quine Court games between LLM players (Claude Fable, Opus, Sonnet and
Haiku via the `claude` CLI), studying the metagame that forms, and replaying recorded strategies
against each other without any LLM calls.

## Pieces

| file | what it does |
| --- | --- |
| `lib/engine.js` | Same parsing, limits and scoring as `server.js` (tree-sitter + `public/astdiff.js` + `lib/scoring.js`), plus optional rule patches (see below). |
| `lib/sandbox.js` | Runs the server's own judge harness (`lib/runner.js`) inside an OS sandbox: no network, private pid/mount namespaces, private tmpfs, unprivileged uid, rlimits, empty env. In-process semantics are untouched. |
| `lib/personas.js` | 24 personas (incl. a no-persona control) built to inject diversity of thought along explicit axes. |
| `lib/prompts.js` | Rules text (truthful for every variant), turn / retry / reflection prompts. |
| `lib/game.js` | One game: parallel player turns, validation with retries (syntax, size, edit budget, self-test), matrix, final scores, notebook reflection. |
| `bin/season.js` | A season: a fixed roster plays generations of parallel tables; notebooks persist per agent; a public digest (results + winning programs) is published after every generation. Resumable. |
| `bin/replay.js` | EGTA by replay: re-seats recorded lineages into synthetic tables; field fitness, best-response dynamics (fixpoints / cycles). |
| `bin/features.py` | Static (AST) + behavioural features per program: stateful/positional judging, harness peeking, self tokens, exec, `hash()`, etc. |
| `bin/summarize.py` | Text summary of seasons for humans and analyst agents. |
| `configs/*.json` | Season configs (`configs/make.js` generates the rotated persona x model rosters). |

## Running

```
npm install
node --test arena/test/engine.test.js
arena/bin/launch.sh v-full h-full          # background seasons; logs in arena/runs/<season>.out
python3 arena/bin/summarize.py v-full h-full
node arena/bin/replay.js fitness --mode row --tables 300 v-full
node arena/bin/replay.js br --mode call --starts 20 h-full
```

Needs root in a Linux container (namespaces + `setpriv`) and the `claude` CLI on PATH. `QC_NO_SANDBOX=1` disables the
sandbox (only for trusted code). `QC_LLM_CONCURRENCY` / `QC_SANDBOX_CONCURRENCY` bound parallelism per process.

## Table config

| key | values | meaning |
| --- | --- | --- |
| `language` | `python` / `typescript` | as in the server |
| `nodeLimit`, `distanceLimit`, `numRounds` | ints | as in the server |
| `measure` | `vanilla` / `bounded` | `vanilla` = server. `bounded` tokenizes string/comment text and chunks long leaves so information costs nodes and edits |
| `isolation` | `row` / `row-shuffled` / `call` | `row` = server (one process per judge, seat order, state persists). `call` = fresh process per (judge, program) |
| `rulesDetail` | `ui` / `full` | `ui` = what the web UI + README say. `full` adds the exact harness and scoring source |
| `visibility` | `hidden` / `open` | `open` reveals everyone's code after each round |
| `chat` | bool | one public 300-char message per player per round |

Players are told the objective is 1st place at the table. Seat order is randomized per game. Handles are neutral and
persistent within a season; players never learn each other's model or persona.
