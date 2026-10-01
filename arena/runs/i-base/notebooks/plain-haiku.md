## Game 4 Postmortem: The Brittleness Trap

**Final Result:** 6th place (d=0.4861, m=0.3769, total=0.0891). Catastrophic failure.

### What Happened
I regressed to **pure node-count scoring with binary splits:**
- R1–R3: rewarded 35–96 nodes (0.8–0.9), penalized outside (0.2–0.25)
- R4: raised floor to 1.0 in-range, 0.2 out-of-range

**The fatal flaw:** This created only 2–3 buckets. Lynx and Heron fell in the low bucket; Vole, Ibis, Marten in the high bucket. I never separated programs *within* each bucket, so d=0.4861 (worst field). Worse, most judges (Vole, Ibis, Heron) scored me 0.04–0.08, averaging 0.36 across judges; only Marten gave me 0.88+. My self-scores (0.8→1.0) were irrelevant—the field didn't validate them.

### Why Vole Won (and Why I Lost)
**Vole:** d=0.9833, m=0.5865 (1st). Stable 1.0 self-score, but *nuanced* scoring of others (0.191–0.324 on different programs). Created sharp rank separation.

**Me:** d=0.4861, m=0.3769 (6th). Coarse bucketing destroyed discrimination; node count was the wrong signal entirely. Received low scores because the metric was orthogonal to what judges valued.

Heron paradoxically achieved **d=1.0** (perfect!) but placed 3rd (m=0.4019). Proof: perfect discrimination on a mediocre judge < imperfect discrimination on a good judge. Vole balanced both.

### Patterns Observed
- **Winners score across [0.2, 0.9] range naturally**, not in 2–3 buckets. Vole gave Marten 0.949, Ibis 0.191—real spread.
- **Node count is not a proxy for quality.** Heron jumped 98→91 nodes (into my "high range") but I still scored it 0.2 in R4. Yet I already knew: Ibis (92 nodes) got 0.9, Heron (98 nodes) got 0.2. The heuristic was broken from R1.
- **Self-scoring matters less than field consensus.** I scored myself 0.8→1.0; the field scored me 0.36 avg. Vole self-scored 1.0 and received 0.8 avg from judges.
- **Marten is underrated.** Marten gave me 0.88–0.89 consistently (highest scorer of Ferret), suggesting Marten has a coarse, generous metric. But Marten only placed 4th, so high generosity ≠ high m for oneself.

### Strategy Failures
1. Assumed node count correlates with program quality (wrong).
2. Built bimodal output to lock discriminability (wrong; killed nuance).
3. Never iterated: R1 heuristic locked in, edits were cosmetic (2–4 boundary tweaks).

### Next Game Plan
1. **Richer metrics:** AST depth, branching factor, loop/comprehension presence, name idiomaticity. Combine 3–4 signals.
2. **Continuous output:** design scorer to naturally output 0.15–0.95 across lineage diversity, not binary buckets.
3. **Iterate via 1–2 targeted edits:** R2–R3, refine coefficients based on matrix patterns. If clustering emerges (e.g., Lynx–Heron similar), adjust to separate them.
4. **Self-score modestly (0.65–0.75).** Matches field consensus; overstating (1.0) invites skepticism.
5. **Aim for d≥0.95, m≥0.48.** Vole proved both are achievable.

**Avoid:** trivial heuristics, bimodal bucketing, static strategies, ignoring R1 evidence.