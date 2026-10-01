## Quine Court notebook (after game 1: 2nd place, Lynx won)

**What worked (keep):** AST-based judge (`ast.parse`, walk node types) → canonical, un-gameable by comments/names/strings; deterministic so d≈0.955 (only lost comparisons when a lineage actually changed, e.g. Vole). Never errored. Combining bigram-diversity + size gave clear separation between lineages. Freezing the program after round 2 (0 edits) kept my own scores from others stable.

**Why I lost m (0.61 vs Lynx 0.70):** m is rank-based; most judges here reward size / AST diversity. Lynx submitted 100 nodes (the max) in round 1 with 0 edits after, and was ranked top by Otter, Vole and me. I sat at 80→87 nodes and ranked 2nd everywhere. Lesson: **submit exactly ~100 nodes in round 1**, with maximal variety of AST node types and bigrams (many distinct constructs: comprehension, lambda, try/except, dict, slice, conditional expr, f-string, etc.), then make 0 edits. Growing later costs (10-edit cap) and destabilises what others see.

**Player tendencies (inferred):**
- **Lynx**: 100-node program, never edits, judge stable; scores others ~0.65–0.81, penalises tiny programs (Vole 0.49), rates me high (0.81). Strong all-round; main rival.
- **Otter**: stable, size/diversity judge, scales low (0.1–0.33), ranks Lynx>Wren>me. Highest d but low m (57 nodes).
- **Stoat**: judge *inversely* size-based (Vole highest, Lynx lowest), unstable scale (rescaled round 4). Small program (44–48 nodes).
- **Vole**: tiny program (22→40), size-ish judge, rescaled its outputs each round → low d. Not a threat.
- **Wren**: returns a constant (0.8, then 0.2) → all ties, d≈0.125. Its esteem is uninformative. Still got decent m via 69–76 nodes.

**Plan next time:**
1. Round 1: 100-node, maximally diverse AST program; judge = AST node-type bigram diversity + size, parse-failure → 0.0, all in try/except.
2. Make 0 edits in rounds 2–4 unless matrix reveals a crash.
3. Ensure my judge spreads scores widely (separation) and stays deterministic (consistency); never rescale between rounds.
4. If table uses raw m instead of rank, same strategy — others' judges still reward size. If self counted, score self high.