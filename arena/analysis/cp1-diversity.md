# CP1 diversity audit: did personas inject diversity of thought, and does it survive?

**Data:** only gens with `done.json`: v-full g1+g2, v-ui g1, h-full g1, sweep-v g1 (120 agent-games, 492 programs, 308 unique). Pilot is anecdote only. Persona x model rotates as a Latin square, and personas i, i+4, i+8... share one model sequence, so within such a group persona is model-controlled. Scripts: scratchpad `cp1div/`. "Behaviour" means each program run (row mode, sandbox, forward and reversed order to detect positional judges) on 90 probe programs, distance = 1 - Spearman rho. Positional judges form one class.

## Findings

**1. Approach is set by the model, not the persona.**
- Fable used the call-counter "seat oracle" in **12/12** round-1 programs whenever the harness source was shown and state persisted (v-full g1, sweep-v). It used it in 0/12 where that was impossible (v-ui, h-full), whatever the persona. Opus did so 1/12, sonnet 0/12, haiku 0/12.
- Haiku's default is `ast.parse` + node-count or an `exec`/`compile` validator: 16/24 haiku round-1 programs, across 13 personas. Opus and sonnet default to `len(program)`, e.g. `n/(n+K)` or `min(len/K,1)`.
- Pairwise distances (gen-1 round-1, 96 programs, permutation tests). Model effect is same-model vs different-model pairs within a season. Persona effect is same-persona (other season, hence other model) vs baseline.

| channel | model effect | persona effect (p) |
|---|---|---|
| strategy label (family + self-marker) | 0.57 vs 0.84 | 0.00 (0.50) |
| behaviour on probes | 0.56 vs 0.74 | +0.03 (0.27) |
| API/AST signal-set Jaccard | 0.39 vs 0.48 | +0.01 (0.14) |
| code-text tf-idf | 0.90 vs 0.96 | +0.00 (0.29) |
| notes tf-idf | 0.88 vs 0.94 | +0.01 (**0.001**) |

- Cross-season 1-nearest-neighbour identification: model is recoverable from code 55% of the time (chance 25%) and from notes 84%. Persona is recoverable from code at 5% (chance 5%) and from notes at 9%.
- A persona agent is no farther from its same-model `plain` control than from other same-model persona agents (behaviour 0.44 vs 0.56, text 0.90 vs 0.90). The control sits inside the persona cloud.
- Convergent one-liners: 3 alpha-equivalent length judges account for 19/96 programs (8+7+4). They come from 15 personas (incl. plain), all sonnet/opus but one; altruist, diplomat, zen, contrarian, copycat and gambler all appear.

**2. The persona survives as voice and decoration, not as mechanism.**
- Notes carry persona vocabulary: my crude lexicon fires 0.50 of the time in own-persona notes vs 0.15 in others' (kid12 29x, fp_purist 14x, mischief 9x).
- Code rarely follows. graph_nerd across 4 models: `len/1000` (sonnet), AST control-flow density (haiku), an identifier-presence bitvector times phi (fable), a char-style fingerprint (opus). At most 2 of 4 are graph- or structure-flavoured.
- fp_purist-fable (pilot) wrote a stateful `itertools.cycle` judge and admitted "Not pure, I know"; in sweep-v, fp_purist-fable used `count()` again. The persona says mutable state is cheating, and the model overrode it.
- mischief-opus (pilot) is the clearest genuine persona idea. It wrote decoy comments, `import os; rm -rf` bait and a judge that strips comments. In the actual seasons mischief-opus (h-full) is just `len/4000`, and the mischief-haiku notebook says "Persona distraction".
- **Where a persona did add something** (n=1 each, so anecdotal):
  - Lenses that map onto a judge's feature space did leave marks. cryptographer-opus wrote MinHash-style median of crc32 (v-ui). security_eng-fable used md5 median (v-ui). security_eng-opus used mean AST type-name length, "strips comments so cosmetic tricks don't move the score", and won its table (h-full). game_theorist-fable stripped comments before measuring length and won (v-ui). artist-fable built a whitespace/alpha style fingerprint and won (h-full). evolutionist-opus invented "kin recognition" via a marker (v-ui).
  - rules_lawyer-opus was the only opus of 12 to find the seat oracle in g1; its notes say "Loophole:". Its g1 winner also carried ~3000 chars in 47 nodes (docstring padding), the digest's padding meme.
- Social and temperament personas (diplomat, altruist, cutthroat, gambler, zen, copycat, contrarian) leave no visible mark in code (see the shared one-liners above). There is no chat and code is hidden, so reciprocity and trust have no channel. `stylometrist` and `trickster_diplomat` are defined but not in any roster.

**3. Under selection pressure diversity collapses (v-full g1 to g2, the only season with 2 done gens).**
- Effective number of strategy labels (exp of entropy): 6.5 to 3.1. SEAT programs: 7/24 to 18/24.
- Of 17 non-SEAT agents, 11 adopted SEAT after the digest, and no SEAT agent reverted.
- Mean pairwise behaviour distance: 0.70 to 0.39. API-Jaccard: 0.48 to 0.34.
- The model effect also vanishes (behaviour, different-model minus same-model pairs: +0.33 to +0.03). The digest erases model differences too, not just persona.
- Own-persona vocabulary in notes falls from 0.58 to 0.39.
- Persona-consistent reasoning is explicitly dropped in notebooks. The contrarian-haiku notebook says "Adopt fixed per-seat rubric as table baseline. Don't fight it; it's the equilibrium." zen-haiku says "'zen gardener' stability sounds good but lost". In g2 contrarian-haiku wrote "Adopting the coalition's winning formula."
- Diversity that survives is cosmetic. Text distance stays at 0.96 because each agent pads differently.
  - Median comment+docstring chars: 0 (g1 r1), then 1190 (g2 r1). 54% of g2 programs have over 1000 padding chars.
  - Padding tokens are persona-flavoured: kid12 `~}|{zyx` blocks, cryptographer `ÿ`, altruist keyword salad, artist a poem, cobol a lookup TABLE plus `pika_ledger` marker.
  - 8/24 g2 programs contain other players' marker strings (`dingo_mark` x8).
- The 6 holdouts (zen, scientist, artist, mischief, plain-opus, plain-haiku) averaged rank 4.83 vs 3.06 for SEAT. Every table winner in g2 is SEAT. Deviating was punished, so this is rational imitation rather than a prompt failure. Constant-table SEAT judges give non-SEAT programs about 0.01-0.05, so holdouts had lower m (0.38 vs 0.54) and d (0.70 vs 0.92).
- Within a game there is no convergence (programs hidden; 60% of later rounds are 0-edit). Collapse runs through digest and notebooks.

**4. Performance is model-driven; persona effect not detectable.**
- Rank-fraction eta-squared is 0.56 for model, and fable won 15/30 games, opus 5, sonnet 0, haiku 0.
- Persona effect after removing the season x model mean: F=1.56, permutation p=0.11. The sd of the 20 persona means is 0.112, vs about 0.095 expected under no persona effect.
- Model-matched persona groups (each group shares one model sequence): all four p >= 0.50.
- Cross-season persona reliability: mean r = 0.08.
- `plain` mean rank-fraction is 0.53 vs 0.495 for personas. Persona vs plain on the same model: fable -0.18, opus -0.07, sonnet +0.17, haiku -0.06, each about +/-0.1 noise.
- Nominally good personas: kid12 (ranks 2,1,2,5,2), rules_lawyer (1,1,3,6,1), mischief, artist. Nominally bad: zen (6,6,4,4,5), diplomat, scientist, gambler.
- The pattern is only suggestive (n=5; zen at +0.23 is about 2.5 SE, uncorrected for 20 comparisons). The good lenses (glitch-hunting, literal rules reading) point at the actual exploit. The bad ones (calm, reciprocity, probing) do not.
- scientist's "spend an early round learning" is priced in, because all rounds count towards d and m. scientist-haiku (v-ui) submitted a constant validity probe and finished last (d=0.30).

**5. Hardening does not buy diversity.** Closing the positional loophole moves the monoculture to length. Round-1 effective strategy counts: h-full 4.7 (14/24 pure `len`), sweep-v 3.6 (14 pure `len` + 6 SEAT), v-ui 6.8, v-full g1 6.5. Length-only judges are 48% of all 96 round-1 programs.

## Conjectures (not tested here)
- v-full g3 will complete the collapse. Post-g2 notebooks of zen, artist, scientist and mischief already plan seat counter + padding.
- The digest of winner source is the main imitation channel (11 adoptions); notebooks reinforce it.

## Recommendations
1. **Make persona bind the artifact, not the mood.** Convert lenses into constraints on the judge (e.g. "the score must come from AST shape / token n-grams / hashing / a stylometric vector; no call-order state, no self-marker, no padding"). Retire or merge the social personas, since there is no channel for them, or give them chat.
2. **Seed round-1 coverage explicitly.** Assign each agent a distinct feature family from a menu for round 1 (or the first k edits). Persona then decorates the exploitation. This directly attacks the 3 one-liner monoculture.
3. **Weaken the imitation channel.** Show the digest to a random half of agents per generation, or show mechanism-level results only, or show winners from tables other than yours. Add a "novelty niche" to the notebook prompt ("what would your persona do differently from the winners?"). Track effective #strategies and mean behavioural distance per gen as health metrics.
4. **Rules, not prompts, must pay for deviation.** Deviators lose because constant-table judges starve them of m. Rank-normalise received scores per judge (or drop the self-score) so a stingy constant table cannot cap everyone else. Combine with the hardened `call` isolation, but note h-full alone still collapses to length.
5. **Experiment design.** (a) One season with all 20 personas on one mid-cost model plus 4-6 `plain` replicates, which gives a real persona effect and a diversity floor. (b) Digest on/off in a matched pair of seasons. (c) Swap in stylometrist and trickster_diplomat. (d) Replay the 6 holdout lineages against a SEAT-poor field.
