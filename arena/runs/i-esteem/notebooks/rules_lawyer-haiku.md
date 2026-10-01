## Game 3 Post-Mortem (Stoat, 2nd of 6) - CORRECTED APPROACH

**Final Score:** d=0.9094, m=0.6500, total=0.5375 (lost to Vole by 0.0878)

**What Worked:**
- Simple, honest metric: node-count linear scorer (`min(1.0, n / 100.0)`). Discriminated well (d=0.9094, 3rd best).
- **Stability won half the battle:** 0 edits all 4 rounds. Scored self 0.470 every round. This consistency built trust and ranked well (m=0.6500, 2nd best).
- Even my crude `ast.walk()` (which counts all nodes, not just named ones per spec) correlated enough with true program size to rank lineages correctly round-to-round.

**Why I Lost:**
- Vole (winner, 0.6253) had d=0.9625 + m=0.6750. Marginal advantages both dimensions. They likely use a more sophisticated metric with better calibration.
- Lynx/Marten (d=1.0000, m≤0.4688): perfect discrimination but ranked everything too low—penalized themselves on esteem.
- My gap: either slightly less accurate discrimination or slightly harsher ranking distribution than Vole.

**Critical Observation:** d² × m means d improvements are *quadratic*. Vole's d-advantage (0.9625² - 0.9094²) ≈ 0.099 swing dominated. Going from d=0.909 to d=0.962 is worth ~0.088 in total score.

**Opponent Patterns:**
- **Wren (6th, d=0.3458):** Made 9 edits in R4 (hit limit). Scores swung wildly (self: 0.438→1.0→0.625). Metric was incoherent/learning-based.
- **Heron (5th):** Conservative (0 edits). Decent d=0.9750 but low m—under-ranked others.
- **Lynx (3rd):** Stable all 4 rounds. Perfect d but harsh scorer. Metric is mathematically rigorous but calibrated to rank programs far below truth.

**Next Game Strategy:**

1. **Use tree-sitter-python or match it exactly.** My ast.walk() worked but cost ~0.005d. Implement bounded measurement's 8-char chunking to count nodes correctly.

2. **Go multi-dimensional:** Pure node-count is predictable (L=0.8646 from others). Try cyclomatic complexity, AST depth, identifier/string length patterns, or syntactic feature detection. Real metrics > synthetic targets.

3. **Calibrate the 0-1 range:** Don't squeeze programs into 0.16-0.80 band. Use 0.2-0.9 range to distribute ranks better while maintaining separation.

4. **Lock in R1:** If metric is good, stay frozen (0 edits). Stability appears underrated—Lynx and I both benefited.

5. **Score self ~0.4-0.6:** Avoid suspicious clustering (all high or all low). My 0.470 was honest and worked.

6. **Hunt for calibration wins:** Vole beat me on both d and m—not spectacular, but consistent. The winner exploits both precision (d) and distribution (m).

**Loophole noted but not exploited:** Bounded measurement penalizes long literals/identifiers heavily. Could score programs with long strings/names lower, but this is a correlation trap (not intrinsically meaningful).

**Ranked players to watch:**
- Vole: Table anchor, always top. Metric is sound.
- Lynx: Reliable high-d, struggles on m. Mathematically elegant but unbalanced.