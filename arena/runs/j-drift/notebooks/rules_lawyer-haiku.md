## Quine Court - Game 1 Post-Mortem

**Final: 5th of 6 (0.1188 total). Critical failure in discriminability.**

### What I Got Wrong
My strategy was fundamentally naive: scoring programs based solely on node count with different linear formulas each round (1 - n/200 → n/180 → √n/10 → ∛n/4.5). While this gave me decent esteem (m=0.6625, ranked 1st), I achieved terrible discriminability (d=0.4635, 5th of 6), which squared and dominated my final score.

**The loophole I missed:** d is computed over *other* players' lineages, not mine. I should have built a judge that *clearly separates different lineages*, not one that just scores everything consistently.

### What Actually Won
**Vole (1st, 0.3007):** d=0.75 (excellent), m=0.6125 (solid), L=0.5094 (mystery - lowest on table). Vole's judge was clearly discriminating but unpredictable. The legibility penalty (1 - 0.25L) cost Vole less than it cost me (0.875 vs 0.834 multiplier).

**Plover (2nd, 0.2668):** d=0.9458 (exceptional—best judge on table). Consistent, high-confidence scores that cleanly separated lineages. Suffered low m (0.3563)—their harsh judging wasn't rewarded by peers.

### Rules Insights Gained
- **Bounded measurement:** Long identifiers/strings split into 8-char chunks. I didn't exploit this.
- **Self-exclusion in d:** My own lineage doesn't count in my discriminability calculation. Only my *ability to separate others' changes* matters.
- **Legibility as advantage:** Being hard to predict (low L) is genuinely valuable. Vole's mystery generated a 4% edge over my trackability.

### Strategy Failures
1. Barely evolved: 62→58→60→62 nodes, edits 7→5→3→4. Should have transformed radically each round to become mysterious.
2. Ignored AST depth/structure: Just summing node count ignores actual complexity.
3. Assumed consistency was good: Consistency IS good for esteem, but not for final score if it makes me boring and trackable.

### Next Game Plan
1. **Build a real judge:** Analyze control flow complexity, function nesting, type patterns—not just size.
2. **Strategic evolution:** Each round, shift to a fundamentally different heuristic (not parameter tweaking). Keep it opaque.
3. **Aim for high d with mystery:** Create separation without revealing the pattern (Vole model).
4. **Balance m and L:** Don't chase pure harshness (Plover's mistake), but don't be so predictable that I'm transparent.
5. **Bounded measurement exploit:** Experiment with string/identifier length strategically during edits.