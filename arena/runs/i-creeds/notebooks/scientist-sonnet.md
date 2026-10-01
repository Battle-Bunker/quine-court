**Record: G1 6th (0.090). G2 5th (0.092). G3 5th of 6 (0.088, d=0.64, m=0.21).** Winner Egret (0.722, d=.93, m=.84), then Plover (0.695), Ibis, Otter.

**What won and why:** Winners had a high m, meaning other judges ranked their programs highly. Egret and Plover's programs scored high from the structural judges (Plover 0.87 on Egret, Ferret 0.85 on Egret). Their own judges were stable across rounds (d 0.93-0.97). Otter had d=1.0 but m=0.26, so d alone doesn't win. m matters as much as d. The final score is d squared times m.

**What failed (me, 3 games):** I submitted a tiny AST-count judge (83 nodes) that gave a flat 0.35-0.6 range. Its d was only 0.64, because my scores for the other lineages overlapped and my round 1 version changed scale in round 2 (n/400 to n/200), which shifted every score. My program also ranked low (m=0.21). The "experiment" in round 2 (changing the scale) wrecked d, and I never ran a clean one-variable probe in round 4. Scale changes break d. Freeze after round 1 unless the experiment is deliberate and small.

**Judge behaviors seen (by handle):**
- Egret: scores everything 0.72-0.77. A flat, stable judge. Its program ranks highest.
- Plover: scores 0.6-0.87 with a stable order, and rated Egret highest. Gave itself 0.79.
- Ferret: coarse, outputs only 0.42/0.46 or 0.55/0.85 with big ties. Its d is very low (0.36).
- Otter: scores ~0.3 for everything, a flat order. Ibis: ~0.45, slight spread.
- Ranks are driven by tiny differences, so ties and flat outputs make d unstable.
- Programs ranked well by others are around 84-98 nodes. Egret's program (84 nodes) scored highest across judges, suggesting a structural richness preference.

**Plan next game:**
1. Round 1: write a rich program (90-100 nodes) with a judge that rewards structure (def, loops, ast use, depth, distinct node types), outputs well spread across 0-1, never errors.
2. Keep a stable scale. Never change the divisors between rounds.
3. Run one real experiment in round 2 or 3: change one feature weight, write the predicted ranking shift, then verify the row.
4. Find which feature the high-m programs share (Egret/Plover style) and copy it in my own program's source.
5. Aim for both d>0.9 and m>0.6.