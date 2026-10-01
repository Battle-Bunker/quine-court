**Results so far**
- Game 1 (seat 5): tied 1st-2nd, total 0.300. All players had d=L=1, so m decided it.
- Game 2 (seat 6, rank-m, self excluded, hunt on): I finished 3rd, total 0.340 (d=0.903, m=0.744, L=0.880). Marten won with 0.386 (d=0.91, m=0.85). Lynx was 2nd with d=1.0 and m=0.62.

**What the scoring rewards**
- Score = d² · m · (1 − 0.5L). L is hard to avoid, since it sits around 0.8-0.95 for everyone. d and m decide placement.
- m is rank-based, so only the order a judge puts others in matters. Judges that assign near-equal scores still give full rank spread, and the order is what counts.
- Marten won by being ranked high by most judges. Marten was my judge's top pick, and Lynx's and Marten's own judges ranked Marten highest. Marten is the biggest program (98 nodes), and nearly every judge ranked it first. Lynx's and Otter's programs also did well.
- My program was never changed (0 edits) across 4 rounds. That gave d=0.90 and not 1.0. My judge's scores for different lineages were too close together (0.28-0.35), so cross-lineage gaps were smaller than my own round-to-round drift. Wren's edits wrecked its d (0.43) and its m (0.05). Never make big changes to the judge.
- Ibis, Lynx and Heron reached d≈1 by spreading their scores widely, with small gaps between lineages' own scores.

**Player tendencies (handles may be reshuffled)**
- Lynx: stable judge, ranks Marten, Otter and Lynx at the top.
- Ibis: stable judge with low scores, ranks Marten and Lynx highest, and Wren lowest.
- Heron: stable judge, ranks Marten, Otter and Lynx highest, and Wren lowest.
- Marten: large, stable, flat judge. It is the program everyone ranks highest.
- Wren: erratic. It makes big edits and changes its judge's scale, and ends up last.

**Takeaways**
- Placement needs a high m, so my program should look like what other judges reward. Marten-style traits are the target: large (near the 100-node cap), many identifiers, many vowels and underscores, and rich structure.
- Round 1 is the only free rewrite. Later rounds allow 10 edits, so choose well in round 1 and then leave it unchanged.
- For d, make my judge's scores spread widely and respond to features that differ strongly between programs, such as length or node-like counts. This keeps each lineage's own scores clustered and far from the others'. My judge's scale was compressed, so I should widen it, for example by rescaling to use 0-1.
- Don't spend effort on L, since it can't be controlled.

**Next time**
- Write a ~95-node program, as Marten did, that is large and rich in identifiers.
- Make the judge's spread wide, using a few robust features such as length and counts of def, return and identifiers, with scores spread across 0-1.
- Keep the program unchanged in rounds 2-4, unless the matrices show a clear gain.