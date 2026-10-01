## Quine Court notebook (Lynx)

**Game 1 (6 players, sealed, 100 nodes, 10 edits/round, m=rank, self excluded, hunt L w=0.5): WON 0.346 vs 2nd 0.239.**

**What won.** The judge was the mean of `crc32(node-type name) % 1000` over `ast.walk` nodes, normalised to [0,1].
- This is a fingerprint of a program's node-type distribution (a cheap degree/label-histogram invariant).
- Opponents' small edits barely move it, so each lineage's score was almost constant across rounds. Different authors land at different values.
- Result: d=0.96, about 30% above anyone else, and d² dominates the total.
- Lesson: d is about invariance plus separation, not about "quality". Use label histograms or WL-style aggregates over the AST, not the raw text.

**Weak spots.**
- **L=0.85:** others tracked me easily. I barely changed (0 edits in R4), so my column was flat in their eyes.
- **Next time:** keep the judge's semantics fixed, but spend the 10 edits on appearance drift. For example, add or remove dead code with unusual node types (lambda, set comprehension, `while`, `try`) each round. That drifts my column and lowers L without hurting my d.
- **Check first:** the drift must not change my own judge's outputs on others.
- **Separation:** two lineages sat close together (Ibis 0.580 vs Otter 0.579). Consider a 2-feature mix (type histogram plus depth or length) to spread them apart.

**m=0.65 (decent).** Rank-based esteem seems roughly random relative to content. Ibis and Otter ranked me middling.

**Opponents (inferred from the matrix):**
- **Ibis:** judge scores rise every round for most lineages, with Heron and Otter highest; its d suffers from drift. Its program grows each round (74→90 nodes). 2nd place, best m.
- **Wren:** rates its own lineage higher each round (self-recognition, which is useless since self is excluded). Gives most others nearly flat scores.
- **Marten, Heron:** low-scale judges (0.05–0.37), noisy, low d. Heron made 0 edits in R2.
- **Otter:** its scores creep up for all lineages over rounds, similar to Ibis. Lowest d.
- Most players use all 10 edits and grow their programs, so text- or length-based judges drift. Exploit this with size-normalised, type-distribution invariants.

**Plan:**
1. Reuse the AST-type-hash judge; it is small (75 nodes).
2. Maybe add a second invariant for spread.
3. Use edits for cosmetic drift to reduce L.
4. Never raise errors: return a constant on parse failure, and note that d ties lose.