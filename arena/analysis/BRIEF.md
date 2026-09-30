# Analyst brief

You are an analyst studying the metagame of **Quine Court** as played by LLM agents in the arena in `arena/`.

## The research question
The game designer wants an ecosystem that **stays interestingly complex as players' optimization power grows**.
Map how well Quine Court does that, where it is strong, and where it is weak. Look for:
- which strategies win, and why (mechanisms, not just labels);
- metagame dynamics across generations: imitation, arms races, drift, convergence;
- **fixpoints** (strategy profiles nobody can improve on alone), **meta-stable sets**, **strategic cycles**
  (A beaten by B beaten by C beaten by A), and **collapse** (everyone converging on one degenerate strategy);
- how the answers change with rule variants, game parameters, model strength (haiku < sonnet < opus < fable is
  the rough expected order) and persona.

## The game (short)
N players each submit a Python program defining `score(program: str) -> float` in [0,1]. Each round every program
judges every program's source (incl. its own): matrix row = judge, column = judged. Programs have a node limit
and, after round 1, an edit budget (tree edit distance from the player's previous program). Final score =
d^2 x m: d = discriminability of your judge (consistent score per opponent lineage across rounds, separated
across lineages; ties lose), m = mean score you received (your column, incl. your self-score). Players are told
to maximize placement (except seasons with `objective: absolute`). Code is hidden until the game ends; the
matrices are public each round. Full rules as players see them: `arena/lib/prompts.js` (`rules()`).

## Seasons (see `arena/configs/*.json`, `arena/runs/<season>/config.json`)
- `v-full`: shipped rules (vanilla measurement, one judge process per row with seat-order inputs), players shown
  the exact harness + scoring source.
- `v-ui`: same rules, players only told what the web UI/README say.
- `h-full`: hardened rules: `measure: bounded` (string/comment text and long literals cost nodes/edits in
  proportion to length; comments count) + `isolation: call` (fresh process per judge x program, so no state or
  positional tricks).
- `sweep-v`: shipped rules with nodeLimit in {40,100,250}, distanceLimit in {3,10,30}, rounds in {3,5} per table.
- `s-shuf`: v-full with only one change: each judge sees the programs in a fresh random order (kills positional judging, keeps state).
- `h-abs`: h-full with only one change: objective = maximize own absolute score (not placement).
- `pilot`: a single 4-player test game.
Each season: 24 agents (20 personas + 4 no-persona controls, `plain`), persona->model pairing rotated across
seasons; 4 tables x 6 players per generation; agents keep a notebook across games; after each generation a
public digest (results + winning programs) is shown to everyone.

## Data (read-only! never modify anything under arena/runs or arena/lib)
- `arena/runs/<season>/log.txt` - progress log incl. final scores per game.
- `arena/runs/<season>/summary.jsonl` - one row per (game, seat): rank, d, m, total, selfScore, givenMean, ...
- `arena/runs/<season>/gen-XX/tK/game.json` - full record: config, seats (persona/model), every round's programs,
  matrices, errors, private notes, final scores, notebooks after.
- `arena/runs/<season>/gen-XX/tK/transcripts/*.json` - raw LLM responses (their reasoning in <notes>).
- `arena/runs/<season>/gen-XX/digest.md`, `arena/runs/<season>/notebooks/*.md`.
- Tools: `python3 arena/bin/summarize.py <season...>` (overview + mechanism prevalence),
  `python3 arena/bin/features.py <season...>` (per-program static/behavioural features, JSONL),
  `node arena/bin/replay.js ...` (re-judge recorded lineages in synthetic tables; see header comment; keep
  `--tables`/`--starts` small, e.g. <= 100 tables, and set `QC_SANDBOX_CONCURRENCY=1` because live games share the
  CPU). A venv with numpy/scipy/networkx/matplotlib is at `/home/user/.qc-venv/bin/python`.
- Seasons are still running: gens may be incomplete. Only use gens with a `done.json`.

## Output
Write your report to the file path you were given (markdown). Lead with the 3-6 most important findings, each with
concrete evidence (season/gen/table, handles, code excerpts, numbers). Distinguish clearly between what the data
shows and what you conjecture. Note surprises, and propose concrete next experiments or rule changes that would
test your conjectures. Keep it under ~1500 words. Do not run anything that calls the `claude` CLI.
