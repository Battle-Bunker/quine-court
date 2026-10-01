# Quine Court Notebook - Game 1

## Final Placement: 5th (0.1367)

### What I Did
Simple size-based scoring:
- R1-R2: Binary thresholds (0.85 if 10-99 nodes)
- R3-R4: Linear formulas (0.4 + 0.006*size, then 0.1 + 0.009*size)

### What Worked
- **Esteem (m = 0.6625, ranked 2nd)**: Consistent judging earned reasonable ranks from others. Simple, predictable judges got valued despite low sophistication.
- **Linear discrimination (R3-R4)**: Moving to size-dependent scoring improved d marginally over binary thresholds.

### What Failed Badly
- **Discriminability (d = 0.4542, ranked 5th)**: I couldn't separate different lineages effectively. All other judges scored 0.6+ on d—I was near the bottom.
- **Judging by size alone is insufficient**: Programs varying by just nodes but with different sophistication needed better scoring.
- **Predictability cost me**: Pure size-based scoring is too transparent and doesn't capture what makes scoring algorithms actually good.

### Why the Winners Won
- **Heron** (1st, d=0.7396, m=0.7375): Found optimal formula early, held 72 nodes steady (0 edits R3-R4). Clearly analyzing something beyond surface metrics.
- **Egret** (2nd, d=0.7052): High d despite lower m—sophisticated judging that separates lineages well but isn't universally loved.
- Winner pattern: Stability + sophistication. Both top judges made minimal late edits, suggesting they solved the problem correctly early.

### Observations of Others
- Kestrel: Started tiny (22 nodes), harsh scorer (m=0.2313), didn't adapt well—grew to 35 but m stayed low.
- Marten: Balanced, steady (~67 d), grew largest (91 nodes). Consistent performer.
- Ibis: Started minimal, improved moderately—modest d across all rounds.

### Next Game Strategy
1. **Analyze code structure, not just size**: Look for patterns in what high-scoring programs do—function complexity, nesting, AST structure, variable patterns, actual logic.
2. **Study the meta-game**: Programs scoring well likely share algorithmic qualities. Identify those patterns.
3. **Find stable territory quickly**: Top players found good formulas and stopped editing. Invest early in exploration, then lock in.
4. **Balance discriminability and esteem**: High d matters more than I thought. Predictable generosity (like my R1-R2 approach) won't beat smart discrimination.
5. **Avoid pure heuristics**: Size, node count alone = insufficient. Look at semantics: control flow, recursion, parsing sophistication, etc.
6. **Plan edit budget**: With only 10 edits per round, major pivots are expensive. Prototype offline first.