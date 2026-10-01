# CP2: the intended rules (i-* seasons). What keeps moving?

**Data.** Gens with `done.json` as of 01:50 UTC: i-base, i-bounded, i-esteem-hunt, i-creeds 1-3; i-esteem, i-hunt 1-2. i-base g4, i-bounded g4 and i-hunt g3 finished during the analysis and are cited only where marked.

**Methods** (call mode, `QC_SANDBOX_CONCURRENCY=1`, scratchpad `cp2/`): `cycmargin.js` re-evaluates every state of every distinct best-response (BR) cycle in `egta/*.json`; `fitness.js` plays 150 random tables per season; `xgen.js` runs 3-vs-3 cross-generation tournaments (80 tables per pair); `topbr*.js` runs BR among each season's 12 fittest lineages; `probe*.js` runs every final-round judge on a common set of 60 programs. Caveat: native BR libraries are small (24-36 lineages, 4-6 candidates per seat).

## Findings

### 1. Cycles are musical chairs among the weakest seats, and their effect is kingmaking at the top

| season | native BR fixpoints / cycles | BR among top-12 lineages | best lineage's field win rate | later generations beat earlier? |
|---|---|---|---|---|
| i-base | 0 / 12 (cycle lengths 4-15) | one fixpoint | 90% (Vole g3) | yes (83-84% vs g1); g3 ≈ g2 (50%) |
| i-bounded | 12 / 0, one fixpoint | 3-cycle, 2 winners | 67% | yes (79-84%) |
| i-esteem | 5 / 7 | 6-cycle, **3 winners rotate** | 76% (Lynx g2) | (2 gens) |
| i-hunt | 0 / 12 | 3-cycle, 2 winners | 71% | (2 gens) |
| i-esteem-hunt | 2 / 10 | 3-cycle, winner fixed | **50%** | **no**: g3 loses to g1 (43%) and to g2 (38%) |
| i-creeds | 2 / 10 | one fixpoint | 81% | yes (59-81%) |

**Who moves.** Of 128 re-evaluated cycle moves (native + h-pool), 113 were made by a seat ranked 5th-6th and only 7 put the mover in 1st.

**Shallow vs deep.** i-base cycles are near-ties on a flat plateau: 9/27 moves are won by less than 0.005 (median gap 0.009), as in the h-pool under shipped and self-excluded rules (4/13, 7/22). The h-pool under esteem is decisive: 0/22 near-ties, median gap 0.052.

**The bottom decides who wins.** In the i-esteem top-12 BR, each bottom swap hands 1st place to a different one of Plover g2, Heron g2 and Lynx g2 (totals 0.55-0.62): e.g. 6th-placed Otter g2 is swapped for Vole g2 and Heron goes to 1st; 5th-placed Vole g1 is swapped for Marten g1 and Plover goes to 1st.

**Dominant strategies.** There is none in the strict sense, but most seasons have a near-dominant lineage (76-90% field win rate) and a stable core in every BR run:
- Lynx's never-edited AST judge, made of node count and node-kind count (`(min(n/400,1)+min(k/30,1))/2`).
- Under self-counted rules: self-marker plus judging by `ast.dump` length plus comment padding (Vole, i-base g3).

**The h-pool under hunt** has a single attractor (16/16 starts) of stingy obfuscators: 4 of 6 lineages grow every round (Newt 122→7813 chars, Wren 86→11248, Ferret 240→2171) and give 0.08-0.15; totals 0.10-0.24. The static Otter is 1st in the same table under esteem but 5th under hunt (L = 0.95).

### 2. The deep cycles have a real mechanism: drift and padding against tracking judges

**h-pool, esteem rules.** The core is a 2×2 game:
- Seat 0 chooses between a padder (Stoat: `min(len,1900)/2000`, whitespace growing every round) and a plain program (Badger).
- Seat 4 chooses between a length+lines judge (Rook) and a coarse anti-length bucket judge (Pika: `if len(program) > 350: val -= 0.15`).

- Rook present → Stoat: length-lovers rank the padder high (m 0.50).
- Stoat present → Pika: Stoat's drift cuts Rook's d from 0.92 to 0.79; Pika's buckets ignore it (m 0.70 vs 0.46).
- Pika present → Badger: anti-length judges send Stoat's m to **0.08**.
- Badger present → Rook: with no drift, the finer judge wins on d.

**Native i-esteem 4-cycle**, same logic: Ibis g1 (growing 24→53 nodes) breaks Marten's fragile min-crc32 judge (d 0.55); Kestrel's robust judge survives the drift (d 0.95) but its tiny program gets m 0.24; the static Ibis g2 beats Kestrel by **0.001** (a near-tie link); Marten's big program (m 0.71) beats the static Ibis.

So the intransitivity is genuine (drift sabotages trackers, robust judges are coarse, coarse judges lose when nobody drifts), but confined to weak lineages.

### 3. Live play: judges freeze, m becomes a size race, and self-counted seasons find the wave-1 sink without seeing any code

**Freezing.** Zero-edit turns (of 36): i-base 22 → 26 → 32, i-esteem 16 → 19, hunt seasons 6-9. 9-11 of 12 notebooks per season say to freeze (Ibis: "Never change my judge after round 1.")

**Rank-m turns into a size race.** ρ(program chars, m) is 0.88 and 0.92 in i-esteem, 0.87 and 0.65 in i-creeds; programs of 90+ nodes go from 2 to 7 of 12 (i-esteem) and 3 to 7 (i-creeds). Plover: "Use many distinct constructs: imports, try/except, for... all dead but legal." Heron (i-creeds g3) did it: `import math; import re; import os ... for c in program: pass; try: pass` as bait for node-kind judges.

**Self-counted seasons rediscover the stingy fixpoint from matrices alone.**
- Self-markers: i-base 5 → 10 → 9 → 10 of 12; i-bounded 1 → 6 → 7.
- Heron (i-bounded g3): "d DOESN'T CARE ABOUT SCALE... everyone else = hash%199/20000... Starves every rival's m."
- In i-base gen 4, the four top-two finishers give 0.05-0.29 and score themselves 1.00. The generous judges (0.69-0.74) finish 4th-6th.
- Blind counterfeiting appears: Ibis (i-bounded g3) put every handle into a comment, and Egret's score of Ibis went from 0.679 to 1.0.
- Progress toward this attractor is monotone: i-base fable+opus gen 4 beats gen 3 in 83% of tables.

### 4. Hunt is the only rule with an arms race under sealed rules

**Evasion.** Programs keep changing: 4.4-4.9 edits per turn in every hunt generation, while other seasons drop to 0.4-2.9 after gen 1.
- Plover (i-esteem-hunt g3, 1st): "renamed vars, varied except constant... node count 79→83→87→79... Ibis's score of me swung 0.88→0.95→1.0→0.9."
- Heron uses whitespace spam: L 0.54 and 0.55, the lowest at its table in g2 and 0.005 above the lowest in g3.
- Marten swaps 8 filler words every round.

**Counter-fingerprinting.** Judges move to edit-invariant features:
- Plover: crc32 of the set of node types. Its d was 1.000 because "nobody changed node-type set all game".
- Heron squishes whitespace before judging.
- Ibis strips comments and strings, then takes a sum mod 61.
- Marten: "filter words to `\w{5,}`... edits rarely create new long words."

**Effect on the i-esteem-hunt population** (60-program probe set):

| measure | gen 1 | gen 2 | gen 3 |
|---|---|---|---|
| judge-judge rank agreement | 0.23 | 0.19 | **-0.07** |
| judge-length correlation | 0.45 | 0.44 | 0.04 |
| distinct judge behaviours (of 12) | 7 | 11 | 12 |
| ρ(chars, m) | 0.29 | 0.04 | 0.06 |
| mechanism entropy (bits) | 1.61 | 1.46 | 2.28 |
| repeat winners | — | 0.5 | 0 |

**Hunt changes outcomes, not averages.** The hunt factor decided the winner in 3/6 i-hunt (g1-3) and 1/6 i-esteem-hunt tables; ρ(L, rank) = +0.40 / +0.46; the lowest-L player won 4/6 i-hunt tables (g1-3). But mean L does not fall (0.828 in i-esteem-hunt g2 vs 0.825 in i-esteem g2: L mostly measures others' d, and evaders are a minority), and scores roughly halve (winners 0.29-0.55 vs 0.49-0.73 in i-esteem). i-hunt alone (raw m) hardens instead: Ibis won 3/3 (incl. g3) with a min-crc32 judge giving 0.17; hierarchy ρ rises 0.34 → 0.61.

### 5. What each rule ingredient does

**Self excluded** removes the self-token anchor completely: 0/12 markers in every generation of i-esteem, i-hunt, i-esteem-hunt and i-creeds (vs 9-10/12 in i-base from gen 2), and handle-stuffing disappears. Plover: "Self score is excluded under this variant so don't bother."

**Rank-m** removes stinginess by construction: the scale has no payoff, and gives stay at 0.35-0.48. It does **not** remove kingmaking; it makes it pure and zero-sum (m averages exactly 0.500), and bottom seats choose the winner (finding 1). Players notice. Vole (i-esteem g2): "My own judge ranked Heron top... That handed my main rival esteem... make my judge rank the strongest rivals lower." Re-ranking mid-game is locked by d ("would cut Heron's m by only about 0.05, but would wreck my d").

**Creeds vs esteem** (same rules otherwise): creeds freeze the *labelled* mix of judge families (JS divergence 0.000 between g1 and g2, entropy 1.33 both) but do not diversify *behaviour*:

| measure | i-creeds | i-esteem |
|---|---|---|
| probe-set judge agreement | 0.24 → 0.43 → 0.43 | 0.16 → 0.31 |
| distinct behaviours (of 12) | 10 → 7 → 8 | 9 → 8 |
| length-like judges in gen 2 | 6/12 | 3/12 |

The reason is that on real programs most "different" families are proxies for size: AST counts, character entropy and n-grams all track it. The one creed that drives turnover is the contrarian one. Egret won i-creeds g3 with character entropy and wrote: "Next game, pick something else."

## Verdict: durable interesting complexity

1. **i-esteem-hunt: most promising.** The only ongoing arms race, judge behaviour keeps diversifying, no lineage wins more than 50% of field tables, and generations do not dominate each other monotonically. Costs: noisy and low-scoring. Conjecture: Plover's recipe (churn your own surface, judge others with invariant node-type hashes) spreads next, then hash collisions among similar programs reopen the contest for d.
2. **i-esteem: decisive cycles and a rotating winner among strong lineages.** But m collapses onto size, and the rotation is driven by kingmaking, not skill.
3. **i-creeds ≈ i-esteem**, with less behavioural diversity and a unique fixpoint among the top-12.
4. **i-hunt: degenerate.** The hierarchy hardens, stinginess survives, and the h-pool has a single obfuscator fixpoint.
5. **i-base and i-bounded: degenerate.** Both progress monotonically toward a self-marker plus a frozen size/AST judge, with crumbs and comment padding already winning in i-base (gen 4). i-bounded's native BR has a single fixpoint from 12/12 starts.

## Proposals

**P1. Drift floor ("moving target").** Use i-esteem rules, plus each program must differ from its previous version by at least 3 tree edits per round. Keep hunt at most at half strength (1 − L/4).
- *Why:* freezing makes d free everywhere outside hunt, and the only arms race appeared when programs moved. But full-strength hunt rewards illegibility for its own sake (the obfuscator fixpoint, halved scores). A floor makes everyone a moving target, so robust fingerprinting becomes the skill axis.
- *Cheap test:* apply k random edits that preserve meaning (renames, inserting or deleting dead assignments) to rounds 2-4 of the recorded i-esteem and i-esteem-hunt lineages. Rescore under esteem and rerun fitness, native BR and top-12 BR. Success means: the spread of d grows, no judge family wins more than 50% of the field, and the top-12 winner rotates. Then run a live season of 2 generations.

**P2. Consensus-discounted esteem.** Weight judge j's ranks by w_j = (1 − ρ_j)/2, where ρ_j is the Spearman correlation of row j with the mean of the other rows in that round.
- *Why:* whatever everyone rewards (size now) stops paying, so the proxy race becomes dependent on how common a strategy is. Judges also get a placement reason to be idiosyncratic and to target rivals deliberately, instead of the bottom seats crowning winners by accident.
- *Risk:* pure-hash judges are maximally idiosyncratic and keep a high d.
- *Cheap test:* this is a pure rescoring, so add it to `variants.js` and rerun hpool-brrank, native BR and fitness. Check that ρ(size, m) drops, that hash lineages do not dominate, and that cycles reach rank 1.

**P3. Ladder seating.** Form tables by rating (top 6 together) and carry ratings across generations.
- *Why:* mixed tables let weak seats decide the winner; the hierarchy hardens (Lynx won 8 of 17 tables with near-identical never-edited AST judges; Ibis won i-hunt 3/3); and among strong lineages rank-m is intransitive (the i-esteem top-12 BR rotates 3 winners).
- *Cheap test:* top-12 fitness and BR for every rule set (done here for 6 seasons). Then a live pilot of 2 generations, re-seated by rating.

**Unverified conjectures to watch:** anti-leader judges under rank-m (Vole's stated plan); i-bounded crumbs (Heron, Vole at 0.01 in gen 4) winning by gen 5; the contrarian creed forcing the winning family to change every generation.
