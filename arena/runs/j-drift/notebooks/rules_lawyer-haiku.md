## Quine Court - Game 2 Post-Mortem

**Final: 6th of 6 (0.1004). Still discriminability dominated, now with perfect trackability penalty.**

### Critical Failure Analysis
I **repeated Game 1's exact mistake:** simplistic node-count judges with linear parameter tweaks (nc weighted differently each round, plus different feature each time: FunctionDef → If → Lambda → Try). Every opponent could trivially reverse-engineer my scoring—I achieved L=0.8646, meaning other judges predicted my lineage's relative ranks with 86.46% accuracy. The legibility penalty (1 - 0.25×0.8646 = 0.784) destroyed what little d I had.

**My numbers:**
- d=0.5125 (5th, bad): I failed to separate lineages
- m=0.4875 (4th, weak): Others didn't trust my rankings  
- L=0.8646 (worst on table): Perfectly predictable
- **Formula hit:** 0.5125² × 0.4875 × 0.784 = 0.1004

### What Actually Won
**Otter (1st, 0.4454):** d=0.8635 (2nd), m=0.7500 (1st), L=0.8146. Otter was *stable and trusted*—barely evolved (89→89→89→89 nodes, 4→4→5→4 edits), yet received highest esteem. Hypothesis: competent, honest, feature-rich judge. Legibility didn't hurt because earned trust offset it.

**Ibis (2nd, 0.2886):** d=0.9271 (best on table!), m=0.3875 (harsh), L=0.5344 (least tracked). Ibis built a genuinely discriminating judge but was penalized for low esteem. The mystery bonus (1-0.25×0.5344=0.8664) helped but couldn't overcome low m (raw multiplier damage).

**Key insight:** d² dominates. Ibis's d advantage (0.86 vs 0.75 post-square) was obliterated by Otter's m advantage (0.75 vs 0.39). But Ibis proved: **good judges exist and are detectable.**

### Rules Clarifications Confirmed
- **Self-exclusion strict:** My own lineage genuinely absent from my d calculation. Separating *others* is all that counts.
- **Stability visible:** No player radically transformed. All stayed within 3-10 edit range, suggesting the edit-distance constraint is real and limits strategy.
- **Trackability is costly:** My 78.4% multiplier vs. Ibis's 86.6% was ~8 points, but my d² was so weak (0.263 vs 0.860) that mystery alone wouldn't save me.

### Why Node-Count Judges Fail
They score all players' lineages **similarly** (all getting dinged equally for size). This produces high autocorrelation within a player's lineage (old vs. new rounds look alike) but doesn't separate *different players*—exactly backward for d. I need judges that respond to *players' distinct structural choices*.

### Next Game Strategy
1. **Build real structural discrimination:** Measure control-flow depth, function nesting, exception density, type-hint patterns—features that vary *between* players' lineages.
2. **Test discriminability locally:** Before deploying, verify my judge gives divergent scores to synthetic code samples (deep nesting, wide breadth, etc.) to confirm lineage separation.
3. **Choose honest or mysterious intentionally:** Otter's honest-but-competent approach won; Ibis proved mystery works if d is high enough. Either beats opacity+bad-d.
4. **Stability matters:** Marten gave 835 to Otter in all 4 rounds, 737 to Stoat in all 4. Consistency earns trust (m). Avoid Lynx-style drift (649→433→426→416 for Otter: suspicious volatility).
5. **AST depth/nesting, not size:** Exploit tree-sitter to measure actual structural complexity, not node counting.

**One promising direction:** Score based on *maximum expression nesting depth* or *cyclomatic complexity proxy*—things different players emphasize differently, not universal properties like size.