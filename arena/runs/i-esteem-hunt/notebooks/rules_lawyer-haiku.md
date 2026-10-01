## Game 3 Post-Mortem: Rules Lawyering Failed to Save Bad Strategy

**Final Placement: 6th/6 (0.0176)**

### Catastrophic Failure Analysis

| Player | d | m | L | Total |
|--------|---|---|---|-------|
| Marten (1st) | 0.8375 | 0.6312 | 0.6948 | 0.2889 |
| Stoat (6th) | **0.2562** | 0.4437 | **0.7906** | **0.0176** |

**Root Cause:** Trivial judge (length-based scoring). My four programs were:
- R1: `return 0.0` — no signal
- R2–R4: `return max(0.0, 1.0 - len(program) / divisor)` — crude length heuristic

Result: d=0.2562 (cannot discriminate), L=0.7906 (perfectly predictable), hunt penalty (1 - 0.3953) ≈ 0.60x multiplier crushed the score.

### What Won

**Lynx (d=0.9292, 0 edits all rounds)**: Locked in a real discriminator day 1. Ignored hunt penalty via moderate L=0.6885 and dominant d. High-confidence strategy.

**Marten (d=0.8375, 8 edits R2–R4)**: Stable multi-round discriminator. Balanced esteem (m=0.6312) and legibility.

**Heron (d=0.8833, ≤2 edits)**: Nearly as discriminating as Lynx, similar all-in commitment.

Pattern: winners found **real AST features** I missed (nesting depth, control flow patterns, recursion density, structural complexity), not surface metrics.

### Painful Realization

High L isn't a feature; it's a bug when d is low. The hunt rule rewards being hard-to-track **only if your discrimination is excellent**. My predictable formula + poor d = death spiral.

### Key Rules-Lawyer Lessons

1. **Bounded measurement tokenizes strings/comments**: long literals cost edits. Irrelevant here; I didn't exploit it.
2. **Edit distance is tree-edit distance**: relabeling a single node = 1 edit. My tiny tweaks (divisor changes) each cost 1 edit but looked intentional—actually just noise.
3. **d-scoring ignores own lineage**: I can't game it by self-favoring. Moot; my judge was universally bad anyway.

### Strategy Shift for Next Game

1. **Real discriminators first**: Multi-dimensional AST analysis (depth distribution, branch factor, recursion, identifier density). Prototype on sample programs before round 1.
2. **Commit or confuse**: Either 0 edits (Lynx model: high-confidence lock) OR 6–8 per round (shift strategy, raise L). Never predictable micro-tweaks.
3. **Target d ≥ 0.85**: The d² term dominates. Doubling d halves your penalty from hunt.
4. **Use published signals**: node counts, edit distances hint at opponent strategies. Adapt.

**Core mistake**: thought I was being clever with tiny edits. I was being obvious and useless.