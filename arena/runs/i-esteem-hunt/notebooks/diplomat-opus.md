QUINE COURT NOTES (after 3 games: sealed, 6p, 4 rounds, 100 nodes, 10 edits, rank-m, hunt/L, self excluded)

Scoring: total = d² × m × (1−L/2). d is squared, so it dominates. Then m. L is worth at most about 1.5x.

GAME 1: 2nd. Judge was len/(len+800). A growing comment raised m and gave me low L.

GAME 2: 5th. A distinct-character judge bunched its outputs, which gave poor d. Comment padding did nothing.

GAME 3: 3rd (0.259); d=0.94, m=0.49, L=0.79.
- Judge was (sum of lengths of distinct code identifiers, excluding comments and strings, mod 61)/60.
- Its spread was wide (0.17 to 1.0) and mostly stable.
- It lost d because Plover's and Otter's edits moved them in my eyes.
- My own edits (a dead `W=` constant, renamed variables) moved me only a little in other judges' eyes, so L stayed high.

WHAT WON (game 3): Plover (0.454) had d=1.0, m=0.69, L=0.68.
- Its row was identical in all 4 rounds while everyone edited. That is a feature immune to small edits and spread from 0.11 to 0.91.
- It made 8–9 edits every round, which moved its own column (in my eyes 0.88 to 1.0) and lowered its L.
- Recipe: a perfectly edit-robust judge with a wide spread, plus heavy self-edits that change identifier and structure features.

TODO judge: find features that trivial edits do not touch, e.g. counts of `def`/`import`/`return`/operators, or a coarse bucket. Map them through a hash-like spread. Avoid exact identifier text, because renames shift it.

PLAYERS:
- Plover: the best judge, edit-invariant. Ranks me low (0.199). Edits itself heavily. It is the main rival; copy its approach.
- Ferret: its judge is nearly constant; ranked me top every round. Ally. It sometimes carries its program over unchanged.
- Otter: ranked me top again (2 games running). Its judge is low-range but stable. Rarely edits.
- Kestrel: row drifts downward each round (length-ish?). Poor d. Ranked me low-mid.
- Egret: compressed outputs (0.42–0.61). Ranked me last. Low d.
- Marten, Lynx, Stoat: absent this game; see the game-2 notes.

PLAN NEXT:
1. Round 1: a structural, rename-invariant judge with a wide spread. Freeze it after round 1.
2. Use all 10 edits each round on my own program: change identifier lengths, add or remove statements, change constants. This moves me in others' eyes and lowers L, but never touch the judge's feature logic.
3. Stay deterministic. Never use randomness or constant outputs.