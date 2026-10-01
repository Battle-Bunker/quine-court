## Quine Court - Game 1 Analysis

**Final Result: 3rd place (0.1846)** — Strong discriminability (d=0.8875) but crippled by high legibility penalty (L=0.7698, reducing my score by ~38%).

### What Failed
My strategy was **too obvious and easily tracked**:
- Submitted 4 rounds of size-based scoring (simple AST node counts with tweaked exponents)
- Minimal, predictable edits between rounds (1-5 edits, each tiny adjustment)
- Other judges learned my approach and could mirror/counter it
- **Hunt penalty cost me dearly**: (1 - 0.5 × L) = 0.615 multiplier on raw score

My esteem was low (m=0.3811): judges didn't value a simple size-based scorer. The game rewards sophisticated, idiosyncratic judgment, not obvious heuristics.

### What Worked
- **Discriminability (d=0.8875)**: Consistent ranking across rounds relative to other lineages
- **Small, efficient code**: 46–52 nodes; no bloat
- **Robust execution**: No errors or timeouts

### Observable Patterns (Inferred from Results)

**Heron (1st, 0.3447)**: Won with exceptional d=0.9646. Never changed code (61 nodes, 0 edits), suggesting a deeply discriminative strategy. Lower L (0.6240) means harder to track — paid off. Moderate m but d² dominates the scoring.

**Marten (6th, 0.0428)**: Chaotic pattern. R1–2 gave tiny scores; R3 suddenly gave 0.78–0.988 (likely broken/changed approach); R4 wildly inconsistent (0.005–0.950). Poor d (0.3625), very trackable. Instructive failure.

**Ibis, Egret, Kestrel**: Steady mid-table; presumably used more nuanced multi-factor scoring.

### Lessons for Next Game

1. **Legibility is a trap**: Obvious, simple strategies are easy to track and get penalized hard (−50% multiplier at max). Embed non-obvious judgment.

2. **Judges value sophistication**: Size-based scoring alone is weak. Other players likely scored on:
   - Syntactic validity / executability
   - Code quality / coherence (structural, logical properties)
   - Apparent maturity or complexity
   - Edge-case robustness

3. **Make major strategic moves**: Instead of tiny tweaks (1–5 edits), use bigger conceptual shifts within the 10-edit budget. Harder to track, more room to innovate.

4. **Multi-factor scoring**: Combine 2–3 independent heuristics (not just one obvious metric). Harder to learn, higher esteem if useful.

5. **Reduce trackability without sacrificing d**: Non-obvious adjustments between rounds that don't break your discriminative power. Probabilistic or rule-based variation may help.

6. **Start lean, leave room**: ~45–50 nodes leaves headroom to grow without hitting the 100-node limit.

**Next attempt**: Build a scorer that looks at syntax validity, structural properties (nesting depth, statement count), lexical complexity—things that separate mature from immature code, not just raw size. Make it harder to reverse-engineer.