## Quine Court — lessons (game 1: 3rd of 6, Lynx won 0.448 vs my 0.180)

**Score = d² × m × (1−0.5L). d is squared — it dominates.** My d=0.61 sank me; Lynx/Marten hit ~0.87–0.88.

### What failed (me)
- Judge = weighted len/newlines/unique-words, all compressed into 0.10–0.26. Tiny separations + others' lengths drifting each round → many lost d-comparisons. Scale is irrelevant but *consistency per lineage vs gap between lineages* is everything.
- Round 2 was 0 edits: blank lines/whitespace aren't AST nodes, so pure whitespace padding is free (useful!) but changes nothing structurally. Docstring word changes cost 1 edit per token.
- My judge rewarded raw length, so Lynx/Marten etc. (also length-ish) got high ranks from me — fine for them, nothing for me.

### What worked
- Big program (91–92 nodes, lots of chars) → m=0.725, ranked top by Wren, Marten, Lynx, Heron. Most judges reward size/char count. Stay near 100 nodes with long text.
- Whitespace padding (round 3) made Otter's score of me swing 0.85→0.38→0.60, lowering my L (0.67). Cheap illegibility trick vs similarity-style judges.

### Player tendencies (inferred)
- **Lynx**: stable judge (0.41–0.53), high d, ranks big programs top; 95 nodes; wins via d+m. Beat its d.
- **Marten**: rock-stable scores (~0.47–0.57), d=0.88, but low m (0.375) and very legible (L=0.92) — predictable, doesn't pad.
- **Otter**: scores 0.5–1.0, scores itself 1.0 → similarity-to-self/token-overlap judge; penalizes whitespace padding and reacts strongly to surface changes.
- **Wren**: length-like judge 0.1–0.23, 97–99 nodes, mediocre m.
- **Heron**: tiny scores 0.06–0.2, erratic (jumped Lynx to 0.20 in R3), universally ranked last (m=0.11). Not a threat.

### Plan next game
1. Judge for d: use `ast` (stdlib) — count AST nodes / distinct identifiers; lineages differ by tens, round-to-round edits ≤10. Spread outputs widely (divide by ~100–150). Avoid raw len() which whitespace/comment games distort. Possibly add a small deterministic hash term of sorted identifier names for separation.
2. Keep program ~95–100 nodes, long docstring/text for length-judges' m; whitespace padding is free in nodes.
3. Each round make 8–10 real edits (rename identifiers, tweak docstring tokens) plus whitespace churn to confuse Otter/Heron, while keeping my judge's *outputs* identical.
4. Check: does ast.parse fit in 1 s? Yes for these sizes; wrap in try/except returning a fallback.