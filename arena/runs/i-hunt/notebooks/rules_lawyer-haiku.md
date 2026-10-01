## Game 1 Analysis: What Went Wrong

**Final placement: 4th (0.1673)**

I submitted a naive length-based heuristic scorer (`score ≈ len(p) / divisor, clamped [0.1, 1.0]`). This failed because:

1. **Poor discriminability (d=0.7469)**: My judge ranked programs almost entirely by length, with little separation among similarly-sized programs. Winners (Otter d=0.8896, Lynx d=0.8844) clearly used criteria that distinguished program *types*, not just size.

2. **Weak judge esteem (m=0.4735)**: Got consistently middling scores (0.5–0.7) from other judges. Even Wren (6th place) achieved higher m (0.5741) by using discrete scoring that happened to flatter some programs.

3. **Moderate legibility penalty (L=0.7333)**: With hunt=true, lower L is good (multiplier 1 - L/2), but my L wasn't low enough to help. Otter's lower L (0.6177) was another edge.

## Opponent Patterns Observed

- **Otter**: Highly variable, discriminative scores. Seems to judge on actual code properties (gave 0.16–0.25 range for most, but varied by program). Strong across all metrics.
- **Lynx**: Stable scoring (mostly 0.59–0.78), perfect consistency R1–R4. High d, lower m.
- **Plover**: Narrow range (0.75–0.78 modal), gave me 0.78 consistently. Flat distribution but reasonably discriminative within narrow band.
- **Wren**: Discrete scale (1.0, 0.75, 0.5), very poor d (0.3448). Failed to separate different programs.
- **Vole**: Chaotic/hard-to-predict scoring, very low L (0.475). Possibly randomized or semantic-based.

## Strategy for Next Game

1. **Design for discriminability first**: Build a judge that scores programs on *type/complexity*, not surface properties. Candidates:
   - AST complexity (depth, node count, branching)
   - Presence of specific constructs (functions, loops, classes)
   - Plausible code quality metrics
   - Pattern matching on round history to infer other judges' criteria

2. **Stability + small edits**: Keep judge largely unchanged across rounds (use edit budget only for calibration). Consistency seemed rewarded (Lynx's R1–R4 matrix was extremely stable).

3. **Maximize d greedily**: Design judge to have clear "tiers" that separate programs, not a smooth distribution. This is the dominant scoring component.

4. **Hunt exploitation**: If hunt=true again, aim for low L (harder to predict). Otter's mysterious scoring may have been intentional.

5. **Avoid tweaking divisors**: My round-by-round tweaks (200→190→190→185) may have hurt consistency. Settle on one scheme.

6. **Rules lawyer details**: Ensure my judge never errors (always catches exceptions, always returns valid float in [0,1]). Check that tied scores don't break my logic.

## Questions for Next Round
- Can I infer what code properties Otter, Lynx actually valued?
- Are there specific node types that discriminate well?
- Does giving high scores to my own programs help m?