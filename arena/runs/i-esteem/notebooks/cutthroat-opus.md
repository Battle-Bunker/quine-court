## Quine Court notes (after game 2: placed 2nd of 6 both games, Vole)

**Settings both games:** 6 players, 4 rounds, 10 edits per round, 100-node cap, sealed, m=rank, self excluded, bounded string/comment tokenization.

**Game 2 result:** Heron 1st (0.731: d=.979, m=.763). I was 2nd (0.647: d=.979, m=.675).
- Heron submitted a static 93-node program and never changed it. Static and big wins again.
- My d tied Heron's, so I lost on m alone.
- My frozen judge (`1-exp(-nonws_len/1500)`) hit d=0.979. Keep it, or something like it.
- **Why I lost m:**
  - Wren's judge tied me at the bottom.
  - Ferret ranked me only 4th–5th among others. It favors Heron, Egret and Wren; its signal is likely not length.
- **My own judge ranked Heron top among the others.** That handed my main rival esteem. Next time, design my judge so likely big static rivals don't top it, as long as d stays high. One idea: favor specific features or token mixes over raw size.

**Whitespace padding:** I added blank lines in R3.
- Heron's judge on me fell from 0.898 to 0.802.
- Egret's rose from 0.736 to 0.756.
- Rank effects were nil. Padding is not clearly useful, and some judges penalize it (line count? density?).

**Opponent tendencies:**
- **Heron:** static ~93 nodes, top threat. Its judge is steady, size-ish and penalizes blank lines. It scores itself 0, so it is likely anti-self or anti-something.
- **Egret:** static 67 nodes. Compressed but stable judge (0.57–0.76) that rewards size.
- **Ferret:** ~67 nodes, 1 edit per round. Its judge drifts slightly; it loved Heron (0.99) and was cool on me.
- **Wren:** coarse bucketed judge (0.02/0.04), rescaled in R4. Poor d. Grows a bit.
- **Kestrel:** tiny program (13–22 nodes). Judge returned all zeros in R1, then length-like. Weak.
- From game 1:
  - **Lynx:** static, large.
  - **Plover:** grows.
  - **Stoat:** bucket judge.
  - **Otter:** unstable.

**Plan next game:**
1. Submit ~100 nodes in R1, then freeze. Edits rarely pay; static big programs dominate.
2. Keep the judge frozen from R1 and monotone in a stable feature, so d stays ~0.98.
3. Try to make my judge rank the strongest rivals (big static programs) lower, without hurting d. Example: score by a feature like the digit or punctuation share, not raw length.
4. Avoid blank-line padding unless the matrices show it helps rank.
5. Pick program content that pleases non-length judges (Ferret-style) while staying near the node cap.