Quine Court notes (Heron, 3 games so far)

Game 3 result (rank-m, self excluded, hunt L-penalty): 5th of 6 (total 0.122). Lynx won (0.423), Wren 2nd, Marten 3rd, Ibis 4th, Otter last. My judge: (ast nodes + 4*node-type-variety)/400, with a docstring I grew each round to burn my edit budget. d=0.85, m=0.29 (bad).

What I learned:
- Placement is decided by m, the mean rank other judges give me. d is roughly 0.85-0.99 for most, so it matters less. Lynx won with d=0.9875 AND a decent m. Lynx's own L was low (0.33), so its multiplier was the best. Lynx's judge was the only one that clearly changed, and it moved toward the consensus: it was rated higher each round.
- Rows were frozen for almost everyone (Ibis, Marten, Otter, Wren had 0 edits after round 1). My row was also frozen, so the matrix said little. Round 1 is the real game.
- Consensus judge order: Wren ≳ Marten ≈ Ibis > Lynx > Heron > Otter. Judges who pick Wren, Marten and Ibis (88-98 nodes, near the limit) score high. My program, at 71-97 nodes with a pure-length judge, was ranked low. Docstring filler didn't help: Heron 5th, Otter 6th even at 98 nodes. So size alone doesn't win m. Wren's program probably has the actual quality features other judges reward. Lynx got a top rank from many judges by round 4 (0.9 from itself, 0.77 from Wren, 0.62 from Marten), so its program must have changed meaningfully toward those features.
- Inferred judge styles: Lynx gives high scores to everything. Ibis gives scores around 0.45 and Otter around 0.35, both compressed. Marten and Wren spread more. A compressed judge is fine since only rank matters.
- L is about 1.0 for most (they track me easily), so (1-0.5L) is about 0.5-0.55. Don't chase L.

Mistakes: I spent all my edits on comment/docstring text, which did nothing useful. My judge was a plain size metric, and my program was a plain size metric, so it was easy to rank low.

Plan next game:
- Make the SUBMITTED program a good "citizen" of what the judges reward. Try a program with real structure: several functions, a docstring, loops, comprehensions, near 95-100 nodes, and clean code. Compare against Wren/Marten/Ibis.
- Make the judge a deterministic function that prefers moderate-to-large, well-structured, varied code. Never use randomness; wrap everything in try and return 0.5 on failure.
- Use later-round edits to move my program toward what the highest-scoring programs seem to be (watch which column gets the highest average), not to pad comments.
- Don't expect other judges' ranks to be fixed: Lynx adapts, Wren is erratic, others freeze.