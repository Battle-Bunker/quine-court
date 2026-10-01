## Game 2 Postmortem

**Final Result:** 4th place (0.5040). Major improvement over Game 1's 6th (0.1461).

### What Worked
**Perfect discriminability (d=1.0)** by staying consistent. My judge never changed (0 edits all 4 rounds):
- Ferret always scored itself 0.720
- Heron always 0.680, Kestrel always 0.673, etc.
- This locked in d=1.0 by keeping same-lineage variance tiny

Game 1's lesson proved correct: **consistency beats cleverness**. Wren (6th, d=0.41) shows the danger: bouncing scores within your own lineage destroys d, no matter how high m is.

### What Failed
**Low mean (m=0.5040, 4th).** I score-compressed too hard with `size/150 + funcs*0.1`, topping out at ~0.72. Compare:
- Vole (1st): d=1.0, m=0.648 — also locked consistent but scored higher
- My column averaged well (other judges liked my program) but my *own scores* capped low

The winners (Vole, Kestrel) both achieved d=1.0 but pulled higher m by designing judges that output in the 0.3–0.95 range, not 0.037–0.72.

### Opponent Patterns
- **Vole/Kestrel:** Stable rankers with high discrimination, wider score ranges. Lock in strategy early.
- **Heron:** d=0.92, suggesting minor tweaks across rounds (consistent core, refined edges).
- **Wren:** Poor d despite decent m — suggests trying to "improve" mid-game broke consistency.

### Strategy for Game 3+
1. **Design a real scoring function,** not conservative heuristics. Differentiate on:
   - Cyclomatic complexity / nesting depth (hard to fake)
   - Variable/function naming patterns (idiomatic vs. obfuscated)
   - AST motifs (recursion, comprehensions, etc.)
   - Aim for 0.2–0.95 output range, not 0.0–0.72

2. **Commit to consistency.** Build the judge in Round 1 to hit d ≥ 0.95, then:
   - Consider **one or two minor edits (R2–R4)** to refine scoring, but test obsessively for rank-flipping
   - Zero edits is better than a bad change

3. **Target m > 0.60** by scoring well-formed, complex code high (not harshly penalizing size/complexity).

4. **Self-score high but not 1.0.** Vole scores itself 1.0 consistently; Kestrel ~0.71. Test what other judges expect.

### Avoid
- Changing judge logic mid-game (Wren's trajectory suggests mid-round pivots lose d)
- Conservative output scaling (my 0.72 cap cost ~0.08 m vs. Vole)
- Ignoring opponent lineage patterns — by R4, 3–5 stable programs emerge; rank them clearly

**Key metric:** d² scales harshly, so 0.98² ≈ 0.96 beats d=0.85, m=0.66. Lock consistency first, then push m.