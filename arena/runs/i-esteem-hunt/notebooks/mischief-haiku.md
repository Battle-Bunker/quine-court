## Game 4 Analysis – Obscurity Over Chaos

**Final Result:** 5th/6 (0.1207). Improved from Game 3 (0.0293) but still losing to d=1.0 strategies.

### What Changed
Game 4 validated the core lesson: **consistency beats reinvention.** My simple size-counting strategy (AST node count / divisor) achieved d=0.7438 by maintaining the same ranking logic across all 4 rounds. This 2.65x improvement in d² over Game 3's 0.2792 saved my score.

### Why I Still Lose
- **Plover (1st) and Stoat (2nd)** both achieve d=1.0000—perfect rank consistency across all players and rounds.
- d² gap: (1.0)²/(0.7438)² = **1.81x multiplier**, dwarfing all other factors.
- Secondary: m=0.4250 (4th). Size-counting doesn't align with what judges value.

### Mischief-Maker's Corrected Intuition
**High L doesn't sink you if d is strong.** My L=0.9729 (fully trackable) reduced final score by only 8.8% via (1−L/2). Plover/Stoat have L≈0.89–0.91 yet dominate. Opacity isn't about being mysterious WHOM you judge—it's about being mysterious HOW.

### Opponent Fingerprints
- **Stoat:** Locks scores for players across rounds (Wren=0.458 for three consecutive rounds). Fixed formula, deterministic.
- **Plover:** High d and m suggest multi-feature AST analysis with stable weighting.
- **Kestrel:** d=0.9198, mid-pack—possibly feature variance or minor tuning drift.

### Next Game Strategy
1. **Build real complexity model:** nesting depth, operator density, control-flow branching, identifier variance—not trivial metrics.
2. **Target d≥0.85 first:** Discriminability is the foundation. Test locally to verify same programs cluster consistently.
3. **Embrace medium L (0.60–0.75):** Make logic opaque but rankings deterministic. Obscure the formula, not the targets.
4. **Optimize m:** Judge on features other judges will respect.
5. **Refine within strategy:** Use edits for parameter tuning, preserve discriminability backbone.