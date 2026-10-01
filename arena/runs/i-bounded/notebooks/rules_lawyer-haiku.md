## Game 2 Post-Mortem

**Final Placement: 6th (d=0.3917, m=0.4905, total=0.0752)**

**What Failed (Critical Discoveries):**
- **Instability killed discriminability.** My function-weighting metric (R1: f*5, R2: f*7, R3: f*20, R4: f*50) scored the *same program* wildly differently across rounds. Otter R1→R4: 0.555→1.000. Discriminability punishes this severely—it measures consistency within lineages vs. separation between them.
- **d² utterly dominates.** Otter won with d=0.9917 (worth 0.98 in final score), Marten d=0.9667 (0.93). I scored d=0.3917 (0.15)—a massive gulf. My m=0.4905 was decent but irrelevant; I lost because I couldn't separate programs consistently.
- **Self-serving tweaks backfired.** Changing weighting each round exploited edits without improving the judge's core discriminability. A broken metric is still broken at any multiplier.

**What Won:**
- **Otter, Marten, Ibis** (d > 0.92): Their row values are nearly *identical* across all 4 rounds (Otter: Ibis ~0.51, Stoat ~0.515, Marten ~0.582, Plover ~0.585). They found a *stable* property (likely: simple size/depth/token count) and scored by it every time.
- **Lynx** (d=0.9500, m=0.3927): Proof that d >> m. Scored everyone low (~0.45–0.55) but with iron consistency. Still placed 5th, I placed 6th.

**Opponent Patterns:**
- Plover (d=0.8639): Only one <0.9. Likely tried something clever that drifted; still held ~0.1-0.2 score band.
- Ibis/Otter/Marten: Stable lineages (0 or 4 edits max). Committed to R1 strategy, refined minimally. Plover/Lynx/I made small edits; top 3 showed almost no variance *because* they didn't change their code.

**The Core Rule I Missed:**
Discriminability measures `|score[i][t] - score[i][t']| < |score[i][t] - score[i'][t'']|` strictly. Every round-to-round drift in your own lineage is sampled against every comparison point. My drifts meant I failed comparisons I should have won. **Stability = consistency in numerator *and* denominator.** Winners picked one metric, froze it, and let it speak across 4 rounds.

**Next Game Plan:**
1. **One metric, locked in R1:** Node count, AST depth, or simple token distribution. No weighting changes.
2. **Test d locally:** Compute discriminability on 3–4 synthetic programs before submitting R1.
3. **Minimal edits (0–2):** If the metric works, don't adjust it. Drifting hurts more than missing mid-round signals.
4. **Bias is fine.** Lynx's low scores placed 5th. Consistency + bias beats volatility + false precision.
5. **Pick one lineage behavior:** Either "stay flat" (Otter/Marten) or "improve steadily" (I did this and lost). Plateauing is safer.