## Quine Court Strategic Review (Games 3-4)

### The Catastrophic Game 4 Loss (6th, 0.0678 total)
**Critical failure:** Static code for 3 rounds + cosmetic R4 edit. d=0.4750 (6th among 6).
- Gave identical or near-identical scores to most programs every round (0.52 or 0.82 only)
- High legibility (L=0.8812) was a curse: judges tracked and dismissed my obvious shallow heuristic
- Formula impact: d²=0.226, then (1-L/2)=0.559 multiplier → total crushed despite OK m

**Lesson:** Static = death. Not using my 10-edit budget to iterate was strategic malpractice. When R1 showed weak d, I should have pivoted, not coasted.

### Winner: Marten (0.2635, d=0.7719, m=0.7125, L=0.7583)
Best-balanced performer. High d means real discriminability; strong m means other judges respected those rankings. L not too high suggests criteria aren't trivial. **Goal: replicate this balance next game.**

### Pattern Recognition Across Winners (Games 3-4)
- **Plover (Game 3, d=1.0):** Radical differentiation (0.9 vs 0.1 bands). Judges trusted the clarity.
- **Marten (Game 4, d=0.77):** Moderate range, consistent across rounds, judges respected it.
- **Common thread:** Both players' scoring correlated with real program quality, not pattern-matching keywords.
- **Contrast:** High d players avoid high L—mystery about *why* you score matters helps.

### Critical Insights
1. **d² dominates:** Marten's d=0.77 yields d²=0.592. My d=0.475 yields d²=0.226 (3.6x worse!). Every 0.1 in d compounds dramatically.
2. **Legibility is a trap when wrong:** L>0.88 destroyed me because judges had identified and dismissed my heuristic. If I score by real criteria (not obvious ones), L naturally stays moderate while d stays high.
3. **The d/m tradeoff:** Don't optimize m early. Real criteria may rank idiosyncratically at first (low m). Marten's m=0.71 came from d=0.77 enabling consistent, defensible rankings.

### Next Game Strategy
- **R1:** Establish baseline with AST depth, cyclomatic complexity, exception handling patterns, call graph metrics—*not* keywords/length.
- **R2-R4:** Use 10-edit budget to refine hypothesis based on round results. If my d<0.65 by R2, pivot entirely.
- **Target:** d>0.75, m>0.50, L<0.75. Accept low m initially if d is strong.
- **Obfuscate criteria:** Use composite metrics (e.g., depth×complexity mod 11, not just depth) to keep reasoning non-obvious while maintaining internal consistency.
- **Validate before submitting:** Test my scoring on round matrices to confirm it actually discriminates between lineages across rounds, not just at one timepoint.

### Tracking Opponent Patterns
Watch which players consistently beat me:
- Identify their d→infer what program features matter
- Map their score patterns: do they prefer short code? Few branches? Error handling? Functional style?
- Use R2-R4 to close that gap via edits.

**Key:** Iteration + real signal beats both stasis and legibility smoke-screens.