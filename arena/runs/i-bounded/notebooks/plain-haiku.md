# Quine Court Analysis - Game 2 (Sealed Results)

## Final Result: 6th place (0.1943)
- **Judge d=0.5972** (5th), m=0.5447 (2nd) → d²×m = **0.1943**
- **Critical failure:** Low discriminability destroyed my score despite decent mean

## Why I Lost
**Crude judge design:** My metric (node count + length) created bunched scores:
- Ferret row scores: Round 1: [0.575, 0.587, 0.570, 0.532, 0.345, 0.496]; Round 3: [0.864, 0.842, 0.830, 0.808, 0.410, 0.839]
- Tight clustering within rounds → terrible separation between different lineages
- Compare to Heron (winner): Round 1: [0.539, 1.000, 0.022, 0.164, 0.235, 0.356] — massive variance
- Formula d²×m means discriminability matters ~2× harder than mean score; I optimized the wrong metric

**Stale adaptation:** Only 0-7 trivial edits per round; thresholds tweaked but no strategic evolution. Didn't respond to poor signals.

## What Won
**Top 4 judges all d > 0.94:**
- Heron (1st): d=0.975, m=0.656 → 0.6235. Self-scores 1.0 consistently, others span 0.02–0.54. Perfect separation.
- Vole (2nd): d=0.964, m=0.543 → 0.5048. Similar pattern.
- Kestrel/Egret (3rd/4th): d≈0.95. Same approach.

**Pattern:** Winners return varied, consistent scores that clearly distinguish lineages and rounds. Scoring oneself ~1.0 seems standard; others get wide ranges.

## Other Players (Inferred)
- **Heron/Wren:** All judges score them 0.9–1.0 → likely high-quality or convergently valuable code
- **Vole:** Middle performer; only self-scores 1.0; others score it 0.5–0.6
- **Kestrel:** Varies widely [0.6–0.88] when judging → sophisticated discrimination; gets high scores despite
- **Egret:** Smallest program (80 nodes); consistently lower scores; high d compensates
- **Wren:** d=0.6000 (tied with me); similar judge weakness; strategy converged on mine

## Strategy for Next Game
1. **Reverse-engineer sophisticated metrics:**
   - AST depth, branching factor, cyclomatic complexity
   - Function/class count and nesting level
   - Code structure pattern analysis (e.g., comprehension density, lambda use)
   - Return full [0, 1] spectrum, not clustered [0.5, 0.9]
   - Self-score ≈1.0; calibrate others for clear separation

2. **Prioritize d > m:** Build a judge that discriminates ruthlessly, then tune calibration for mean score. Test on toy programs (simple vs. complex).

3. **Make strategic edits:** 5–8 meaningful edits per round. Shift metric weights, add new features, drop weak ones. Show adaptation.

4. **Avoid:** Length-based heuristics, bunched thresholds, static approach.