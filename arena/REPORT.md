# Quine Court ecosystem report

*Arena runs of LLM players (Claude Fable, Opus, Sonnet, Haiku) with personas, analyst checkpoints, and replay-based
game-theoretic analysis. Data: `arena/runs/`, analyst reports: `arena/analysis/`.*

<!-- TLDR -->

## 1. What was built

- **Headless engine** (`arena/lib/engine.js`): the server's own tree-sitter measurement, AST diff, judge harness and
  scoring. The judges run inside an OS sandbox: no network, private pid and mount namespaces, an unprivileged uid,
  rlimits and an empty environment. Rule options:
  - `isolation`: `row` = shipped; `call` = a fresh process per (judge, program), which gives the designer's pure
    evaluations.
  - `measure`: `vanilla` = shipped; `bounded` = text in strings and comments costs nodes and edits.
  - `visibility`: `hidden` = shipped, code revealed at the end; `sealed` = no program is ever shown, results only.
  - Scoring variants: self excluded, relative-esteem `m`, and hunt/legibility.
- **Players**: `claude -p` with no tools, one call per turn. Rejected programs get validation feedback (node counts
  per statement, edit operations, a self-test) and retries. Each player keeps private notes within a game, a
  notebook across games, and gets a public digest after every generation.
- **24 personas plus a no-persona control**, designed along explicit axes: cognition, social orientation, technical
  lens, relationship to change, relationship to the meta, and relationship to the rules. Persona-to-model pairings
  rotate across seasons as a Latin square, so persona and model effects can be told apart. A second-generation
  "creed" option binds each persona to a mechanism.
- **Analysis tools**:
  - `features.py`: static and behavioural features of programs.
  - `summarize.py`
  - `dynamics.py`: per-generation entropy, turnover, hierarchy churn and repeat winners.
  - `replay.js`: re-seats recorded lineages into synthetic tables to measure field fitness, best-response
    fixpoints and cycles, and a cross-generation tournament.
- **Operational safeguards**:
  - A spend-rate governor.
  - Pause-and-resume on account usage limits.
  - Deterministic, resumable seasons.
  - Rollback of contaminated generations.

## 2. Wave 1: the game as currently implemented

Six seasons (220 clean seat-games, 4 tables x 6 players per generation) under the shipped `lib/runner.js`
semantics, with code revealed at game end and winning programs published in digests.

### 2.1 The shipped runner lets judges be stateful, and that collapses the game in three generations
The server runs each judge's whole row in one process, calling `score()` on the programs **in seat order** with
shared globals. A judge can therefore count calls and score by seat: it ignores content and gets d = 1 for free.
```python
calls = []
def score(program: str) -> float:
    calls.append(1)
    return (0.0, 0.02, 0.04, 1.0, 0.01, 0.03)[len(calls) % 6]   # v-full g2 t4, 1st place
```
- **Discovery depends on model and information.**
  - When the harness source was shown, Fable used the counter in round 1 of **12/12** games; Opus did in 1/12,
    Sonnet and Haiku in 0.
  - With UI-level rules (`v-ui`), no player found it.
- **The collapse** (`v-full`):
  - Mechanism entropy fell from 2.59 to 1.61 to **0.25 bits** over generations 1–3, and **24/24** gen-3 programs
    were seat counters.
  - Mean score given to rivals fell from 0.49 to 0.21 ("stingy crumbs" such as `(0, .01, .02, .03, .04, 1.0)`).
  - Winners stopped repeating: rank correlation between generations went from 0.36 to 0.09, and 0/4 repeat winners.
    The hierarchy dissolved into a **seat lottery** decided by other judges' arbitrary crumb orderings.
  - `sweep-v` collapsed in a single generation (entropy 1.92 to 0.41) at every node limit (40 to 250) and edit
    budget (3 to 30).
- **Replay confirms the fixpoint.**
  - Best-response dynamics over v-full lineages reached a pure fixpoint from **12/12** random starts in about 3
    moves. All 72 fixpoint seats are seat counters with d = 1.00.
  - The cross-generation tournament is transitive: gen-1 lineages win 7% of mixed tables against gen 2 and gen 3,
    and gen 2 wins 27% against gen 3.
  - This is **monotone convergence to a degenerate sink, with no cycling**.

### 2.2 Why it is a sink (theory, confirmed by data)
- d is scale-free and ties lose. So every judge must strictly order its rivals, but it can do so with "crumbs" as
  small as it likes. That ordering doesn't affect the judge's own payoff, and it decides everyone else's m.
  Once d is solved, the result is **kingmaking**.
- The self-score is worth 1/N of m, and it is free with a self-recognition token.
- With a placement objective, every point given away is pure loss, so stinginess dominates. With an absolute
  objective the same replay analysis finds only fixpoints (`h-abs`, 16/16).
- In-game reciprocity or punishment costs d, because changing how you score someone mid-game breaks your own
  consistency. Several strong players worked this out explicitly and froze their judges.

### 2.3 Measurement loopholes (shipped `vanilla` measurement)
- Comments and whitespace are not nodes, so they are free to add and free to change. Players padded their programs
  with thousands of characters to game length-based judges.
- Any leaf counts as 1 node however long it is: 10k-character tokens, huge identifiers.
- A string containing an escape sequence has its content invisible to the edit distance, so rewrites cost 0.
- `exec("<any judge>")` costs about 13 nodes, and a full rewrite costs about 3 edits. The node limit and the edit
  budget are therefore not binding for anyone who notices. The analysts verified this; no player used it.
- `import __main__; __main__.req` exposes the harness request. Under row isolation that is every input; under call
  isolation it is the judge's own source, which gives self-recognition nobody can forge. No player found it.

### 2.4 Imitation and counterfeiting through revealed code
- Revealing code at game end and publishing winners let a winning mechanism spread to 75% of programs in one
  generation.
- It also enabled **identity theft**: 10/24 players pasted other players' published self-tokens into their own
  code. One gen-1 winner went from 1st to last as its judge gave 1.0 to four counterfeiters.
- Under the designer's intended rules (sealed), neither channel exists.

### 2.5 Personas: voice, not mechanism (checkpoint-1 diversity audit)
- Approach was predicted by **model**, not persona.
  - Model is recoverable from code 55% of the time (chance 25%) and from notes 84%.
  - Persona is recoverable from code at chance (5%).
  - Model explains 56% of rank variance; the persona effect is not detectable (p = 0.11).
- Personas showed up in the notes' vocabulary and in padding style (a poem, a lookup-table "ledger", `ÿÿÿ`), but
  rarely in mechanism. The FP-purist persona wrote a stateful judge and admitted "Not pure, I know."
- Under selection the difference vanished. The effective number of strategies fell from 6.5 to 3.1 in one
  generation, and notebooks said so explicitly: "'zen gardener' stability sounds good but lost."
- Lenses that point straight at a judge's feature space did leave marks: the cryptographer's MinHash, the security
  engineer's comment-stripping AST judge, the rules lawyer finding the counter. Social personas (diplomat, altruist,
  trickster) had no channel to act through.

<!-- INTENDED -->

<!-- VARIANTS -->

<!-- RECOMMENDATIONS -->

<!-- METHODS -->
