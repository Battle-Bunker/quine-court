# Quine Court Results & Strategy Guide

## Game 4: The Camouflage Trap

**Result: 5th place (d=0.4750, m=0.6713, total=0.1515).**

**Critical failure:** I prioritized camouflage over judge quality. My code changed every round (obfuscated variables, misleading constants), but my scoring stayed narrowly clustered (0.9–1.0 range). This tanked discriminability.

**Why d=0.4750 is devastating:**
- I scored almost everyone 0.9–1.0, giving myself 1.0 every round
- To discriminate, I need |score[A][round_t] - score[A][round_t']| < |score[A][round_t] - score[B][round_t'']| (strict)
- Bunching programs in a tight band (0.9–1.0) means I can't separate them; d ≈ 0 for many comparisons
- Stoat got d=0.2083 (worse, last place) by giving *everyone identical scores*—the ultimate discriminability killer

**What winners did (Kestrel 1st, Plover 2nd):**
- **Wide rank separation:** Kestrel/Plover give self 1.0, others span 0.2–0.6 with clear gaps
- **Static judge:** Both barely edited across 4 rounds; consistency is king for d
- **Clear hierarchy per round:** Maintain same rank ordering for each lineage across rounds

**The d² factor dominates.** Kestrel (d=0.9778, m=0.7034) beats Plover (d=0.9917, m=0.6798) on the tiebreaker. Even Egret (d=0.9639) places 3rd ahead of Otter (d=0.9625).

## What Went Wrong & Right

**Wrong:** Confusing code appearance with judge strength. I renamed variables (size→s→a), tweaked constants, used misleading logic (c = a + b * 0). The code looked different each round; the *judge behavior* was static. Other players can't see my code anyway—only results—so this wasted edits on visual chaos instead of investing in scoring architecture.

**Right by accident:** My column received m=0.6713 (top half). I scored myself 1.0 every round, which is baseline generous. Others gave me 0.36–0.9, averaging mid-high. This is the *one* dimension where I succeeded.

**Persona misuse:** "Other players' discriminability depends on YOU being recognisable" doesn't mean I should hide my judge logic—it means I should make my *lineage appearance* (edits, variable names, comment misdirection) confusing, while keeping my *scoring behavior* crystal-clear and consistent. I did the opposite.

## Next Game Plan

1. **Build a high-d judge first:** Rank all programs clearly; score self 1.0, cluster others 0.2–0.5 with visible gaps. Test discriminability before committing.
2. **Keep it static:** Max 2 edits/round, pure camouflage (rename, add fake comments, useless constants). No logic changes.
3. **Camouflage ≠ confusion:** Use misdirection in appearance (obfuscated variable names, red-herring string parsing, random comments) while *the core scoring loop remains rock-solid*.
4. **Target d ≥ 0.97, m ≥ 0.66** (total ≥ 0.62).

**Note on opponents:**
- **Egret, Otter, Kestrel, Plover:** Stable high-d judges. Copy their rank-separation strategy.
- **Stoat:** Unpredictable, shifted wildly (R1: all 0.7, R4: all 0.9). Low d consistently. Avoid their pattern.

**Core principle:** Judge appearance is theater; judge *output* is destiny.