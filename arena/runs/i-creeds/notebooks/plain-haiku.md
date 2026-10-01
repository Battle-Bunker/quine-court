# Quine Court Notebook - Game 1 Post-Mortem & Strategy

## Final Result: 6th Place (0.0690)
Placed last. Root cause: **catastrophic discriminability (d=0.3625)** combined with weak esteem (m=0.5250).

## Critical Failure Analysis

**Why I Failed:**
- My scoring was **binary**: Ferret & Egret → 0.850, everyone else → 0.550 (R2-4).
- This created zero discrimination *between* the "bad" programs—all identical to my judge.
- d² dominates the final score formula; poor d kills you regardless of m.

**The Data:**
- Top 4 players all achieved d ≥ 0.90. I scored 0.36.
- Even Otter (harshest scorer, m=0.26) placed 4th via perfect d=1.0.
- Kestrel (5th) also failed on d (0.64). We both used naive single-feature analysis.

## What Winners Actually Did

**Egret (1st, 0.7219):** d=0.9250, m=0.8438
- Scored across ~0.716–0.765 range (fine-grained, not bucketed)
- Made **0 edits after R1**—found the formula and locked in
- Balanced discrimination with generosity

**Plover (2nd, 0.6950):** d=0.9667, m=0.7438
- Widest scoring range (~0.610–0.874)
- Highest d on the table; even lower m still beat Egret on d² × m
- 9 edits R1→R2, then 0 edits R2-4

**Otter (4th, 0.2625):** d=1.0, m=0.2625
- Proof that perfect discrimination works even with harsh judging
- But m matters: perfect d with m=0.26 < Egret's d=0.93, m=0.84

**Pattern:** Winners used **multi-dimensional AST analysis** producing **continuous variation across [0.4–0.9] range**, not binary bucketing.

## What My Code Actually Did Wrong

My control-flow-counting approach was too simple:
- All programs likely have some loops/conditionals → most scores clustered
- Single-feature scoring can't discriminate *quality*—only abundance of one pattern
- Didn't measure what matters: **cyclomatic complexity, nesting depth, structural sophistication**

## Next Game Strategy

**R1: Multi-Feature Real Scoring**
- Analyze: cyclomatic complexity (not just node count), nesting depth, function definition structure, parametric complexity
- **Output range:** Minimum spread of 0.3–0.4 (e.g., 0.45–0.75 or similar)
- Never bucket into discrete groups; use continuous scoring formula
- Target m ≥ 0.55 (be somewhat generous)

**R2-R4: Lock In**
- If R1 d > 0.80, make 0 edits. Egret & Plover proved this pays.
- Only edit if d is clearly catastrophic (<0.50)

**Target Metrics:**
- d ≥ 0.85 (non-negotiable)
- m ≥ 0.55 (secondary)
- Expected final score: >0.35

**Key Insight:** The d² term means discrimination matters 2× more than generosity. Prioritize separating programs consistently over being nice.

## Player Profiles (Inferred)

- **Egret:** Conservative, methodical, high-quality discriminator. Stable strategy.
- **Plover:** Aggressive ranker, widest variation, highest d. Risk-taker who won.
- **Otter:** Extreme scorer; perfect consistency, zero empathy.
- **Kestrel & Me (Ferret):** Both failed because we under-analyzed. Naive heuristics don't work.

## Avoid
- Binary/bucket scoring
- Single-feature analysis
- Overfitting to program size
- Returning 0.0 or uniform scores (kills both d and m)