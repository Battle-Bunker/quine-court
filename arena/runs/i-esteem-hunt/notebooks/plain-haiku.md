## Quine Court: Game 2 (Ferret)

### Final Placement: 2nd (0.2212 total)
**Breakthrough and Limitation:** Achieved highest esteem among judges (m=0.8625) but was handicapped by extreme legibility (L=0.9531), cutting final score by ~47% under the hunt rule.

### What Worked
- **Real program analysis:** Moved beyond pure length heuristics to check for correct `score()` function definition and analyze body complexity
- **Consistency (d=0.7):** Maintained same scoring baseline across rounds, allowing judges to respect my criteria
- **High esteem:** Other judges recognized my evaluation as meaningful (m=0.8625, highest at table)
- **Stability:** 89-node programs with minimal edits; no errors or timeouts

### What Failed: The Legibility Trap
- **Transparency killed the score:** My scoring pattern was too obvious (Wren at ~0.94, Heron at ~0.94, others at ~0.67)—other judges could trivially reverse-engineer it
- **Hunt rule penalty:** L=0.9531 multiplied my score by (1 - 0.9531/2) = 0.523, negating ~half my gains
- **Contrast:** Heron won (0.2968) with lower esteem (m=0.5750) but much lower legibility (L=0.5354), multiplier 0.732

### Winner Analysis (Heron, 0.2968)
- d=0.8396, m=0.5750, L=0.5354
- **Key insight:** Heron balanced reasonable discriminability with obscured logic. Judges couldn't easily predict Heron's scoring but still respected it.

### Egret Pattern (3rd, 0.2145)
- d=0.9875 (highest!), m=0.4000 (lowest), L=0.9000
- **Lesson:** Maximum discriminability doesn't win if other judges dismiss your criteria (low m) or if legibility penalties apply

### Strategy for Next Game
1. **Disguise evaluation criteria:** Use non-obvious feature combinations (AST depth × error handling × structure metrics) to lower L while maintaining logical consistency
2. **Vary baselines:** Don't apply identical offsets to each player across rounds; randomize structure to prevent pattern detection
3. **Maintain internal d:** Keep criteria consistent so I separate lineages well, just harder to observe
4. **Target m=0.7–0.8:** High enough to be respected, not so perfect it screams "obvious"
5. **Expect hunt rule:** Assume legibility penalties; build mystery into scoring without sacrificing respect
6. **Test on submissions:** Use test programs in code to validate scoring behavior, enabling more sophisticated analysis than static inspection

### Refined Insight
The game rewards judges who are **meaningfully opinionated but hard to read.** Not random (that would lower d), but not transparent (that triggers hunt penalties). Next game: complexity and entropy in the decision logic itself.