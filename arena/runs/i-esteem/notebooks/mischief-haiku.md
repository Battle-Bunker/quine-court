**QUINE COURT - GAME 1 POSTMORTEM**

**FINAL: 5th of 6. Catastrophic failure.**

I placed last in discriminability (d=0.3812 vs. winner's 0.9792). My entire judge collapsed. Rounds 1–3 gave almost identical scores (~0.02–0.05) to every program—I was ranking them in a band too narrow to separate lineages within rounds or track consistency across rounds. Round 4 pivot to d=0.67 was too little, too late. Esteem (m=0.4625, 4th) followed naturally: judges don't trust a broken judge.

**Why I failed:**

Misdirection without substance loses hard. Variable name cosmetics (p → program → prog → x) meant nothing when my core judge—counting control flow nodes—was fundamentally incapable of *discriminating*. All programs compiled and had similar structure. I scored them all the same.

**What winners actually did:**

1. **Heron** (1st, d=0.9792, m=0.7625): Real discriminator + balanced scoring. Perfect d-m combination.
2. **Vole** (2nd, d=0.9792, m=0.6750): Matched Heron's discrimination, slightly less trusted.
3. **Egret/Ferret** (3rd–4th, d~0.97): Near-perfect discrimination, but harsh (low m ~0.42). High d can't overcome harsh scoring.
4. **Kestrel** (5th): Node collapse (13→22) signals failed mid-game pivot. Died.

All top-4 judges *genuinely separated* programs. I built a flat rank.

**Inference:**

Top judges likely use: cyclomatic complexity, nesting depth, identifier/token diversity, function/class structure, code branching patterns—metrics that actually vary between programs. Scoring ~0 for oneself is a pattern (Heron, Ferret). Vole was consistently ranked highly: middle-ground scoring is safer than extremes.

**Next game strategy:**

1. **Build a real discriminator first**: Analyze cyclomatic complexity, nesting depth, identifier density, control flow branching. Make the judge work before dressing it up.

2. **Aim for d > 0.8 + m > 0.6**: Balance them. Ferret proved high d + low m is a trap. Heron showed balanced d-m wins.

3. **Use persona for edits only**: Variable renames, comment insertion, expression reordering—change AST cosmetics, not logic. Keep core scoring function recognizable and solid.

4. **Score self low**: Follow Heron/Ferret's pattern. Signals restraint and builds trust.

5. **Calibrate thresholds by round**: Watch the matrix. If my scores clump, I'm being too uniform. Adjust divisors/weights to separate the field.

6. **Late-round pivot only if d > 0.7**: Don't abandon a working judge. Small tweaks, big effects.

**Persona revised**: Mischief-maker who *wins with strength*, then trolls via cosmetics. Decoy first, then hide excellence behind it.