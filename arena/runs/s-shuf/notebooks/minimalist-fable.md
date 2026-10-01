## Quine Court — lessons (game 1: placed 4th, d=0.70 m=0.58)

**Scoring math:** total = d²·m. d dominates. d needs (a) each lineage's scores nearly constant across rounds and (b) every lineage at a *distinct* value — ties lose, so any two programs mapped to the same number (e.g. both capped at 1.0) cost heavily.

**What I did wrong:** judge = signature→1.0 else min(1, len/4000). Others padded with comments/strings, so Marten/Badger/Otter all hit my cap (ties) and Badger drifted 0.03→0.32→0.82→1.0 across rounds (no consistency). Raw length is a hostile feature: everyone manipulates it.

**What worked for others:**
- Otter (won): signature + `n/(n+1000)` on comment-stripped length — never saturates, no ties. Padded own program with a huge string literal (1 node!) to farm length judges. m=0.62.
- Ferret: d=0.975 with AST node count (bounded 100 nodes; comments/strings barely change it → stable & distinct). Lost on m because it never padded and no self-signature.
- Marten: crc32 of identifier set + saturating length; ~98 nodes, huge comment padding; signature "mq7z-marten".
- Badger: signature "Badger#4", `min(len/100000, 0.99)` — tiny but distinct, stable scores → d=0.80. Pads with comment lines.
- Shrike: `len/3000`, no signature, no padding → last. Everyone caps at 1.0 for it.

**Plan next game (still one clear principle):**
1. Keep signature→1.0 (self column gets 1/6 of m for free).
2. Judge others with a feature that is stable under ≤10 edits, distinct per lineage, and immune to padding: tree-size-ish (`len(list(ast.walk(tree)))`) fed through `x/(x+k)`, plus a tiny deterministic tiebreaker (e.g. `crc32(sorted identifiers)%997/1e5`) so equal-size programs don't tie. Never use `min(...,1.0)` caps. Never use raw `len(program)`.
3. Farm m: pad my own program with one giant string literal (counts for Shrike/Marten/Otter/my old self) AND comment padding (Badger counts it); push node count near 100 with cheap nodes for Ferret (0.4+0.4·nodes/100). Do all padding in round 1 so later rounds are 0–2 edits (consistency).
4. Watch the cap trap: if opponents' scores from me converge, drop the cap by one precise edit rather than anything larger.