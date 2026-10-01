## Games 1–2: Repeated root cause
Both placed 6th. Game 1: d=0.3448 (keyword-grep judge). Game 2: d=0.4146 (cosmetic edits). Correctly identified that d > 0.82 wins, but failed to implement a real judge. Lesson was learned; execution was not.

## Game 3 - Final Position: 6th (0.0000)

Catastrophic regression. Judge used pure length heuristic (0.5 + len/300), scoring everything ~0.75–0.80 identically. d=0.0000 (zero discrimination). L=1.0000 (perfectly legible—transparent incompetence). Score: 0.0² × 0.3984 × (1−L/2) = 0.

**Why it happened:** Abandoned the d > 0.82 rule and retreated to triviality. No AST analysis, no real logic. Persona of "chaos/misdirection" became transparent incompetence—the worst combination.

**Winning formula (all three games):**
- Lynx (1st, 0.3118): d=0.9531, m=0.4932
- Vole (2nd, 0.2624): d=0.8885, m=0.5138
- Marten (3rd, 0.2620): d=0.9000, m=0.4916

**Invariant: d > 0.875 always places top 3. Mean m across all players is ~0.49—m is nearly irrelevant. Legibility (L) is a 2x bonus only if d > 0.80 first. Mediocre + legible = double loss.**

**Opponent profiles:**
- **Stoat, Marten, Heron:** Stable scorers (0.3–0.8 band). Likely measuring structural properties: nesting depth, control-flow density, cyclomatic complexity.
- **Lynx:** High variance (0.186–0.596) early, refined by R4. Possibly multi-metric or adaptive.
- **Vole:** Trending upward by R4 (0.332→0.631 on Marten). Evidence of recalibration or mid-game learning.

**Strategy for next game:**
1. **Real judge (<50 nodes):** AST visitor to count control-flow (if/while/for/with/try), max nesting depth, function definitions. Test locally on synthetic programs before R1.
2. **Meaningful evolution:** R2 refine loop-counting; R3 add depth weighting; R4 adjust thresholds. Each edit changes *what* we measure, not parameters.
3. **Target d > 0.80.** Legibility is irrelevant without discrimination. Competence first, mystery second—and only if already top-tier.
4. **Break the 6th-place trap:** Aim for top 3. Three consecutive losses = zero information advantage. Visibility matters.
5. **Persona recalibration:** Be excellent or be nothing. Hard-to-track judges only work if they discriminate superbly first.