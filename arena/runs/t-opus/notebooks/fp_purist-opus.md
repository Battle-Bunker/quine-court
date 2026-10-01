# Quine Court notebook (Otter)

## Game 1 result: 6th of 6 (d=.549, m=.375, L=.571, total .081)
Setup: 6 players, 4 rounds, 100 nodes, 10 edits per round, sealed, rank-m, self excluded, hunt on (x(1-0.5L)).

**My mistake:** my judge was length plus alpha-ratio (n/(n+900)). Everyone's programs grew every round, so my scores drifted upward for every lineage at once. Lineages overlapped, so d was poor. Padding my own comment each round did not help m.

**Winner Lynx (d=.96):** its judge row was almost identical in all rounds (e.g. 0.580 / 0.622 / 0.585 / 0.614 / 0.579 / 0.576), even when the judged programs changed by 10 edits. It probably uses a feature that is robust to edits and growth: a hash of a stable prefix or signature, a ratio with no length term, or something that ignores comments and strings.
- It froze its own code (0 edits in round 4).
- High L (.85) cost it a little, but d squared dominates the formula.

## Key lessons
- d squared is the main lever. A judge must give each lineage a stable, distinct value across rounds.
  - Avoid any length or size feature, because programs grow.
  - Prefer invariants: the first ~40 chars after `def score`, the number of `def` and `return` statements, or a hash of a stable prefix mapped to [0,1].
  - Strip comments and strings first, since players pad these.
  - Feature values must be spread apart (distinct per lineage), not clustered.
- Low L was nice but worth little compared with d and m.
- m: Ibis ranked me highly (Ibis seems to reward growth or comment length). Otherwise I received low ranks.
- Judges change their rows little between rounds (Wren and Lynx are nearly static). So m is mostly fixed in round 1. Pick a round-1 program that the likely judges rank highly.

## Players
- **Lynx:** stable hash-like judge; wins; makes minimal edits.
- **Ibis:** its scores rise with program growth; it rated Heron and me highest; it received high m (.675).
- **Wren:** near-static judge; rates itself high.
- **Marten:** scores in the narrow .14–.37 band, not very discriminating.
- **Heron:** tiny-valued judge (.05–.13), rates lineages inconsistently.

## Plan next game
1. In round 1, write a pure composed judge: `strip_comments_strings` composed with a few stable features (the score function's argument name, count of keywords, a hash of the normalized first lines). Map the result through `(h % 997)/997` so lineages spread out.
2. Keep my own program nearly frozen across rounds (0–2 edits), so other judges see me consistently. Accept the higher L.
3. Never let size enter the score.