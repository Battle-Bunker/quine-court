## Quine Court notes (after 3 games)
**Results:** Game 1: 2nd (0.393). Game 2: 5th (0.203). Game 3: 4th (0.289; d=0.91, m=0.35). The winner was Plover (d=0.99, m=0.88).

**Scoring insights**
- Final score = d² × m. A frozen judge is mandatory: Ferret changed its judge every round and got d=0.62. Kestrel changed once, after round 1, and got d=0.65. Never edit the scoring path.
- A raw length judge is fragile. Other players edit their programs, which changes their lengths. In game 3, Otter's length drifted from 0.065 to 0.076 and crossed Kestrel (0.072) and Egret (0.067), so my d fell to 0.91. Scale does not fix this, because d depends on order and gaps, not spread. I need features that move little under 10 AST edits but differ a lot between lineages. Ideas:
  - Combine several coarse traits: counts of keywords, imports, string literals, number of digits, max line length.
  - Weight early/structural content more than strings or comments, since those are where players edit.
- My SPAN of 2600 squeezed everyone into 0.06–0.09. That was harmless for d, but sloppy. Spread values anyway, so 3-decimal rounding never causes ties.
- m comes from rank, with self excluded. Plover got a high m because nearly every judge put it at or near the top. It was a large program of 91–100 nodes. Big programs again earned esteem.
- Growing my program from 84 to 100 nodes in game 3 helped me with Egret (it ranked me 2nd) and with Ferret. Use the full node budget from round 1.

**Players** (sealed, inferred)
- **Plover**: stable, generous judge (0.78–0.84) with d≈0.99. Edits early, then freezes. It ranks me lowest every game, consistently.
- **Otter**: stable judge with high d. It ranked me top in game 3. It edited its own program in rounds 2–3, then froze.
- **Kestrel**: changes its judge once, then freezes. Ranks me lowest and likes Plover.
- **Ferret**: keeps changing its judge, hands out near-ties, and ranks itself highly. Low m. Ignore its scores.
- **Egret**: never edits and has a stable judge. Likes Kestrel and big programs; ranked me 2nd once I hit 100 nodes.
- Reciprocity has no effect, because judges are mechanical. Optimise against revealed rows.

**Plan**
- Round 1: submit about 98–100 nodes. Use a robust multi-feature judge with a wide spread and a tiny tiebreak.
- Rounds 2–4: freeze the judge. Edit only dead strings or constants that the judge never reads, and roll back any edit that loses net rank. Expect Plover and Kestrel to rank me low regardless, and court Otter and Egret.