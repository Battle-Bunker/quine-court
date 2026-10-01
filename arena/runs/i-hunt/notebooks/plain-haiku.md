## Quine Court: Game 2 Post-Mortem

**Final Standing:** 6th/6 (d=0.3937, m=0.4921, L=0.8365, total=0.0444)

### Fatal Failures

1. **Round 1 Sabotage:** Submitted `return 0.0` for all programs. This destroyed my discriminability baseline before the game began. My d never recovered. Never submit a non-functional judge, even if uncertain.

2. **Discriminability Collapse:** My d=0.3937 vs. winner Ibis d=0.8333 is a 5× gap in d². Using `len(program) / k` compressed all scores into narrow bands (~0.06–0.63), making it impossible to separate lineages consistently. Winners (Ibis, Egret, Kestrel) spread scores [0.02–0.87], clearly ranking different players distinctly.

3. **Instability:** Jumping from `/1000` (R2-3) to `/500` (R4) shifted my output distribution wildly, breaking round-to-round consistency and worsening d.

### What Winners Did Right

**Ibis** (1st, d=0.833): Scored different players' lineages at vastly different levels (Plover ~0.03, Kestrel ~0.43, Otter ~0.27, Ibis ~0.27) and *held these rankings stable across all rounds*. Errors on Ferret didn't hurt—Ibis still discriminated everyone else consistently.

**Egret, Kestrel** (2nd-3rd, d=0.95, 0.90): Stayed essentially unchanged (0–7 edits total), submitting stable, well-calibrated judges that consistently separated the field.

**Pattern:** Winners prioritized *consistency within lineages* and *clear separation between lineages* over "accuracy." The judge that produces [0.1, 0.3, 0.5, 0.7] predictably is worth more than one that produces [0.3, 0.35, 0.4, 0.45].

### Opponent Inferences

- **Kestrel, Egret, Plover:** Submitted working judges R1; trusted their designs; made minimal edits. Suggests strong R1 calibration.
- **Ibis:** Adapted aggressively (6–8 edits R2-4), yet maintained d~0.83. Responsive iteration without abandoning core strategy.
- **Otter:** Stable judge with high variance between programs; stayed ~99 nodes, suggesting size-efficient but sophisticated logic.

### Next Game Plan

1. **Start functional:** Any reasonable judge beats zero. Draft complexity metrics (AST depth, function/class count, control-flow branching) for R1.
2. **Maximize d first:** Design scoring to spread [0, 1] meaningfully across the player pool. Use feature variance, not compressed heuristics.
3. **Lock-in consistency:** Once scoring spread is good, freeze the judge or iterate within ±2 edits to maintain round-to-round lineage separation.
4. **Target L reduction:** High L (0.84) means I'm easy to track—paradoxically bad. Ibis's L=0.70 shows winners stay slightly hard to model. Add lightweight randomization or secondary features to diversify evaluation without sacrificing d.
5. **Size program properly:** Competitors used 76–99 nodes; mine was 13–18. Richer logic requires more nodes. Stay under 100 but don't leave room unused.

**Core principle:** d² dominates the score. Perfect m and low L can't salvage d<0.5. Build a discriminator first; everything else follows.