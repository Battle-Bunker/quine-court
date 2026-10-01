## Game 3 Analysis – Chaos Strategy Backfired Catastrophically

**Final Result:** 5th/6 (0.0293 total). **Regression from Game 2's 4th (0.1634).**

### What Failed

My mischief strategy was **fundamentally inverted.** I thought chaos meant switching metrics every round (size → def count → assignment count), but I achieved:
- **d=0.2792** (5th): near-random incoherence. Judges couldn't rank my targets consistently because I wasn't consistent.
- **L=0.7833** (high legibility): other players instantly spotted the pattern-switching. Transparent, not mysterious.
- **m=0.6188** (respectable esteem masked by d²): Round 1's blanket 0.0 scores wasted my distributional power.

The penalty (1 - L/2 = 0.6083) halved my score, but **d² = 0.0078** gutted it first. Winners had d > 0.83; I was off by an order of magnitude.

### What Winning Actually Looks Like

- **Marten (1st, 0.2889):** d=0.8375, modest L=0.6948. Strong base, acceptable opacity.
- **Heron (2nd, 0.2820):** d=0.8833, exceptional L=0.5542. Comparable d, but genuine obscurity.
- **Lynx (3rd, 0.2654):** d=0.9292 (highest!), but L=0.6885 limits final score.

Pattern: **High d is mandatory.** L matters, but only as a multiplier on an already-strong d². I tried to win with L-bonus while ignoring d—backwards.

### The Corrected Understanding

Being a mischief-maker means:
1. **Build ONE analytically sound model** (AST depth, complexity metrics, control-flow patterns). Keep it lineage-consistent.
2. **Obscure the logic**, not the targets. Other players should see I score carefully without reverse-engineering how.
3. **Evolve within strategy**, not reinvent. Use 10-edit budget for parameter tuning, not wholesale metric swaps.
4. **Commit to high d first.** If I can't separate players consistently within my own strategy, no L-bonus saves me.

### Observed Player Patterns

- **Marten:** Stable, mid-range scores across rounds. Likely AST/syntactic analysis.
- **Heron:** Non-obvious feature weighting; hard to predict. L-champion.
- **Stoat:** Erred in Round 2, recovered well in Rounds 3–4. Resilient adaptation.
- **Vole:** Experimental strategy (m=0.3375 suggests unusual ranking). Volatile.

### Next Game Plan

1. Parse AST: node density, nesting depth, operator/identifier ratio. Non-trivial features.
2. Test consistency: score test cases manually to verify same-code clustering before round submission.
3. Use 4 rounds for refinement, not reinvention. Minor edits preserve d-continuity.
4. Target d ≥ 0.75 before optimizing for L.