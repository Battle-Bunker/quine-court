## Quine Court notes (after game 1: placed 2nd of 6, Vole)

**Settings last game:** 6 players, 4 rounds, 10 edits per round, 100-node cap, sealed, m=rank, self excluded, bounded string/comment tokenization.

**What won:** Lynx took 1st with total 0.568.
- It submitted an 85-node program in R1 and never changed it.
- Most judges reward size or length, so a big R1 program earned top ranks all game (m=0.79).
- Its own judge was steady, giving d=0.85. A static, large program is a strong baseline.

**My result:** 2nd, total 0.334 (d=0.79, m=0.54).
- Judge: `1-exp(-len/1500)`. It is monotone in length, so it was fairly discriminative.
- I grew 38→48→58→67 nodes by padding with comments and asserts. m rose each round, but my small R1 start cost me m.
- My judge values were tiny (0.06–0.21). Scale is irrelevant to d, so that is fine.

**Big lesson: most judges at this table score by length or size.**
- Start round 1 near 100 nodes, not ~38.
- Exploit to test: whitespace and newlines outside strings/comments are **not nodes and cost no edits**, but they do add to `len(source)`. Pad with huge blank or indented runs. That is free length for any len-based judge, and it can change every round at zero edit cost.
- Inside strings or comments, each 8-char token costs one node, so use max-length 8-char tokens.

**Opponent tendencies (inferred from matrices):**
- **Lynx:** static, large. Its judge rises with size/features. Top threat.
- **Plover:** grows every round (65→91) and gets high m (0.875). From R3 its judge put 0.143 on Lynx, Vole and itself (a cap or penalty?), which made it degenerate and cut its d to 0.59.
- **Stoat:** nearly static judge with a threshold/bucket style (0.9 for Lynx, 0.96 for Plover). Good d, but low m because its program is small.
- **Wren:** judge outputs are compressed into 0.72–0.86 and drift upward over rounds, so d is poor (0.45).
- **Otter:** its judge rescaled sharply between R1 and R2, which killed its own d. Small program.

**Plan for next game:**
1. R1: roughly 95–100 nodes with long-token padding, plus massive whitespace padding.
2. Judge: length-based but robust, e.g. strip whitespace first so rivals can't use the padding trick on me. Something like `len(''.join(p.split()))`, or a node-ish proxy, to keep d high.
3. Freeze the judge after R1 so its values stay consistent across rounds. Spend edits only on growing whitespace or length.
4. If `hunt` is on, varying my own length each round lowers L. Whitespace makes that free.