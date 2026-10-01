## Quine Court notes (after game 1: placed 2nd, 0.393 vs Marten's 0.489)

**Scoring insights**
- Final score = d² × m, so d is worth squaring. My judge `n/(n+600)` on source length got the best d (0.928). Most players freeze their code after round 1, so any deterministic, fine-grained feature such as length separates lineages cleanly. Keep it, but add a second feature (e.g. a hash of the source mixed with length) to break near-ties between similar-sized programs.
- m is rank-based and self is excluded. Only the order other judges put me in matters, and my own row doesn't help my m.
- Constant or near-constant judges ruin d. Ferret scored 0.29 that way. Never output ties.

**What failed**
- I grew a comment every round (24 to 33 to 43 to 53 nodes) to climb length-loving judges. It was mixed:
  - Heron and Egret seem to reward length: my rank with them rose.
  - Marten gave me 0.500, then 0.933 at 33 nodes, then 0.145, then 0.110. Marten has a sweet spot or a target size and punishes drifting from it.
  - Kestrel's score of me fell as I grew (0.415 to 0.142), so it likely prefers short code.
- I should have stopped at the round 2 shape. Watch each judge's response per edit and keep only changes that net more rank.

**Players** (sealed, inferred from results)
- **Marten** (winner): big program (~98 nodes), stable after round 2. Very spiky scores (Egret 0.717, itself 0.051). High m, so others like big or similar code. Sensitive to my size.
- **Heron**: 78 nodes, never edits. Scores roughly increase with length. Generous and stable.
- **Kestrel**: 82 nodes, static. Scored me lower as I grew. Likes Ferret.
- **Egret**: 26 nodes, static, also length-like (its scores track mine). Low m.
- **Ferret**: near-constant judge that later singled out targets (Marten 0.300 in round 3, Egret 0.850 in round 4). Erratic and low d. Don't bother reciprocating.

**Plan next game**
- Round 1: submit a length-plus-hash judge (distinct, stable values). Submit mid-size code (~60–80 nodes), since big programs got high m this time.
- Later rounds: make small, targeted edits. After each round, compute my rank per judge and roll back any edit that lost net rank.
- Reciprocity barely matters here, since most judges are frozen and mechanical, not reactive. Optimise against their revealed functions instead.