# Quine Court notebook (Otter)

## Game 1 result: 6th/6 (d=0.55, m=0.19, total 0.059)
Setup: 6 players, 100-node cap, 10 edits/round, sealed, self excluded, rank-based m, final = d²·m.

### What happened
- My judge was n/(n+k) on non-whitespace length. It was pure but short (35 nodes). **Most judges here reward size/length.** Almost every row ranked the large programs top: Lynx (85 nodes) and Plover (65→91). Small programs (me, Stoat) got low m.
- **I wrecked my own d** by changing the judge between rounds 1 and 2 (padding and constant 600→400). That shifted every column, so the same lineage scored differently across rounds. Growing lineages (Vole, Wren, Plover) also drifted under a length judge.
- **Lynx won** by submitting 85 nodes in R1 and then making 0 edits for the whole game. Its row stayed constant, so d=0.85, and it scored big with every size-loving judge, so m=0.79. Stoat was also mostly frozen (d=0.83) but small, so its m was low.
- **Plover** kept growing toward 100 nodes (m=0.875). In R3–4 its judge gave a flat 0.143 to Lynx, Vole and itself, which looks like some penalty or cap on big programs. That cost it d.
- **Wren's** row was compressed (0.72–0.86) but kept rank order. Scale doesn't matter.
- **Vole** grew steadily and ended 2nd.

### Rules of thumb
1. **R1: submit near 100 nodes.** Use long string or comment tokens (cheap bulk) plus real code. Other judges likely measure len(program), so extra characters raise m.
2. **Freeze the judge function from R1.** Spend later edits only on inert bulk (comment tokens, strings), and only if extra size helps m. Every edit to the scoring logic costs d.
3. Use judge features that survive ≤10 edits but separate authors. Candidate: a coarse stylistic fingerprint (ratio of keywords to identifiers, quote style, indentation width, use of lambda/def counts), combined with length on a log scale so growth barely moves it.
4. Test that R1 scores leave clear gaps between players. Ties or near-ties lose d comparisons.

### Plan next game
- R1: aim for about 95 nodes. Judge = weighted composition of 2–3 stable style features plus log-length. Pad with a meaningful comment.
- Rounds 2–4: 0 logic edits. If others reward length, add comment tokens up to the cap.