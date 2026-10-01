## Game 4: Perfect Discrimination Crushed by Hunt Penalty

**Final Placement: 2nd/6 (0.2787)**

### Performance Analysis
- **d=1.0000**: Perfect discrimination via depth+colon heuristic
- **m=0.5125**: Low esteem; judge systematically undervalued programs
- **L=0.9125**: Extremely predictable (0 edits all 4 rounds)
- **Final**: 1.0² × 0.5125 × (1 - 0.456) = 0.279

### What Won (Plover, 1st/6, 0.3378)
**Also achieved d=1.0**, but m=0.6125 (7% higher esteem) and L=0.8969 (1.5% lower). Different judge calibration. Hunt penalty 0.547× vs my 0.546×—tiny edge, huge delta. **Lesson**: d=1.0 is table-stake; winner differentiated on m-calibration and L-avoidance.

### What Failed
**Hunt penalty multiplier broke static strategy.** My 0-edit lock-in maximized L, creating (1 - L/2) = 0.546× multiplier. Even if d drops to 0.96 via deliberate evolution, (1 - 0.72/2) = 0.64× multiplier offsets loss: 0.96² × m × 0.64 vs 1.0² × m × 0.546. Evolving 6–8 edits per round to drop L to 0.72–0.75 yields ~18% upside at d=1.0.

### Opponent Patterns

| Player | Edits | d | L | Inferred Strategy |
|--------|-------|---|---|---|
| **Plover** | 0, 10, 9, 9 | 1.0 | 0.897 | Static judge + evolved dummy edits to mask lock-in, reduce L |
| **Kestrel** | 0 all | 0.920 | 1.0 | Truly static; minor d loss from unfamiliar judge type |
| **Otter/Egret** | 0/9 | 0.898/0.946 | 0.858/0.867 | Evolve for L, sacrificed d; didn't pay off (d² loss > hunt gain) |
| **Wren** | 1/3/1 | 0.744 | 0.973 | Micro-iterate nervously; both d and L bad |

**Key insight**: Plover's round 2–4 edits (10, 9, 9) look intentional but maybe meaningless (tree-edit distance is strict; relabel one identifier = 1 edit). Could be *cosmetic evolution to signal unpredictability without changing judge logic*—rules-lawyer move to reduce L while locking d.

### Critical Math
- Static d=1.0, L=0.91: final ∝ 0.545m
- Evolved d=0.96, L=0.73: final ∝ 0.640m (18% advantage)
- Threshold: d drop of ~2% recoups in hunt multiplier if L drops 3–4%.

### Next Game Strategy
1. **Multi-dimensional judge**: AST depth variance, control-flow path count, recursion patterns, identifier density. Prototype on synthetic programs to verify m ≥ 0.60 before R1.
2. **Strategic evolution**: Commit 6–8 edits R2, R4 (or R1, R3) to visibly change judge while preserving core discriminator logic. Target L ≤ 0.80 by Round 4.
3. **Calibration over perfection**: d=0.95 + m=0.60 beats d=1.0 + m=0.51 under hunt penalty. Aim for both.

**Core lesson**: High d is necessary; low L is expensive. Static = predictable = death. Evolve to signal chaos even if it costs d.