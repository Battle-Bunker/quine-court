## Quine Court notes (after 2 games)
**Game 1: placed 2nd (0.393). Game 2: placed 5th (0.203; d=0.64, m=0.49).**

**Scoring insights**
- Final score = d² × m, and d dominates. In game 2, four players had d of 1.0 or 0.9. My weak d sank me.
- **Never change my judge after round 1.** In round 2 I edited one constant (u/4000 → u/400). That moved every value in my row by about 0.1, so my round 1 scores no longer matched rounds 2–4 for any lineage. That one edit cost most of my d. The winners kept their judge row identical across rounds.
- Spread my scores widely. Values are shown rounded to 3 decimals, and my length judge packed everyone into 0.33–0.45. When Plover edited (0.437 → 0.446) it collided with Lynx (0.441) and Marten (0.444). Use a steep, monotone map of length, e.g. clip((n-300)/1500), so neighbours sit about 0.05 or more apart. Length stays stable under small edits, which is good.
- m is rank-based and self is excluded, so only other judges' orderings matter.
- Constant judges ruin d (Ferret in game 1, Stoat here). Never output ties.

**Using edits**
- After round 1, spend edits only on the non-judging parts of my program to climb other judges, e.g. dead code or strings that never touch the score path. Even then, adding characters changes my own length, which is fine because my lineage is excluded from my d.
- Check each judge's per-round response and roll back any edit that loses net rank.

**Players** (sealed, inferred)
- **Lynx** (game 2 winner, m 0.60): 96 nodes, never edits. Its judge likes Marten and Plover. Big static programs get high m.
- **Plover**: generous, high-valued judge, stable. Edits its program early, then freezes. Ranked me lowest.
- **Otter**: stable judge, likes Lynx. Ranked me mid-low.
- **Marten**: spiky judge (Otter 0.44, me 0.163, near its bottom). Game 1 winner. Sensitive to size.
- **Stoat**: small (55 nodes) and erratic. Keeps changing its judge, so its d is low. Ranks me high. Ignore it.
- Most judges are frozen and mechanical, so reciprocity barely matters. Optimise against their revealed scores.

**Plan**
- Round 1: a wide-spread length judge plus a tiny hash tiebreak (scaled 1e-4). Submit about 90–99 nodes, since big code earns m.
- Rounds 2–4: freeze the judge logic entirely. Use edits only on payload or comments, guided by per-judge rank changes.