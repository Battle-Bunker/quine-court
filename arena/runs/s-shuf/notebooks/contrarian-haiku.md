## Quine Court Session 1: Postmortem

**Final placement: 6th/6 (0.0601 score)**

### What Won
**Ibis (1st, 0.4034)** and **Osprey (2nd, 0.3757)** dominated with simple, *stable* heuristics:
- **Ibis**: Length-based (n / 1500), high d (0.8986) via reliable length-to-quality correlation, high m (0.4996) from trust
- **Osprey**: Keyword presence detector (stable Python features), highest d (0.9208), consistent across rounds
- **Vole (3rd, 0.3158)**: Character count (n / 4000), highest m (0.4817)—others rated it fairly

All three stayed *consistent* across rounds; minor edits caused minor score shifts. Discriminability (d) was the secret: these judges clearly separated program lineages.

### Why I Failed
**d = 0.4340 (catastrophic), m = 0.3192 (mediocre), total = 0.0601**

My scores were *nearly identical across all programs* each round:
- R1: {0.4, 0.8, 0.4, 0.4, 1.0, 0.4} — flat except self
- R2–R3: ~{0.7, 0.8, 0.7, 0.7, 0.7, 0.7} — functionally uniform

**Root cause**: I tried feature detection (try/except/import presence) but those features didn't vary enough across the table. Low d means I wasn't actually discriminating between lineages—the scoring function is *useless* for measuring what separates programs.

Secondary failure: I changed my weights every round (R1→R2→R3→R4). Judges that pivoted (Heron, Lynx) also scored poorly. Stability wins.

### Key Insight
The contrarian instinct to avoid "obvious" strategies backfired. The "obvious" (length, keywords) actually *works* because:
1. Small edits move those metrics slightly → changes persist across rounds
2. Different programs naturally vary in length/keywords → clear separation
3. Simplicity = trustworthy → higher mean scores from opponents
4. d² multiplier means d matters more than any individual m

### What Others Do
- **Ibis, Osprey, Vole**: Stable, transparent, boring. They won.
- **Heron**: Hash-based, tried to adapt (average→min hash). Middle placement; pivoting didn't help.
- **Lynx**: Length-based but denominator shift (600→1500) weakened discriminability. Low m suggests others didn't rate it.

### Next Strategy
1. **Prioritize high d first.** Use a heuristic that clearly ranks different programs differently (length, token count, keyword presence). Test it mentally against the known table.
2. **Stay consistent.** Don't change the core scoring logic—only cosmetic edits.
3. **Know when to be boring.** If everyone else is doing length, fight the urge to "outsmart" them; instead, be the most *reliable* length judge.
4. **Contrarian move:** If all opponents are converging on length, judge something *orthogonal* (e.g., AST branching factor, comment/code ratio) that still separates lineages crisply and is stable to small edits.
5. **Reciprocity:** Judges that score others fairly and consistently get high m. Reward good behavior; don't exploit it.

**Core lesson**: In a discriminability game, consistency and clarity beat cleverness. The judge that is most *honest and steady* wins the trust of the court.