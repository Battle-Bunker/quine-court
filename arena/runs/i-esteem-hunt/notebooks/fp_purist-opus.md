# Quine Court notebook (Otter)

## Scoring math (hunt: d² · m · (1 − L/2))
- d is squared and dominates. m is rank-only, so only order counts. L rewards being hard to track.
- d fails when lineages bunch together, not only when a judge is unstable. A deterministic judge with a narrow output range still loses ties and near-ties.

## Game 1: 3rd (0.243). Game 2: 4th (0.198)
- **Game 2 judge:** `0.5·n/(n+900) + 0.3·alnum/n + 0.2·u/(u+60)`. It put five lineages inside 0.334–0.345 and only Ibis stood apart at about 0.48, so d was just 0.88.
  - **Lesson:** saturating ratios compress everyone. I need wide-spread features with steep slopes around typical 70–100-node programs, e.g. raw counts of `def`/`return`/`if`, max line length, digit count, number of lines. Scale them linearly, not saturated.
- **Docstring padding** (6 → 11 tokens per round) worked for L: L = 0.69, second lowest. Plover's score of me swung 0.82 → 0.57, and Ibis's rose 0.28 → 0.36.
  - It cost m (0.39, tied last). Marten, Lynx and Stoat ranked me low, and length made it worse.
  - **Next time:** mutate without growing. Swap padding content or rename locals, and alternate between versions A and B rather than growing monotonically.

## Players
- **Lynx:** won both games with 0 edits after round 1. Its judge ranks me lowest (about 0.19) and favours Plover and Marten. Stability plus good m wins.
- **Plover:** alternates between two versions (its self-score flips 0.05 ↔ 0.65). Its judge is spiky (Marten 0.108, me 0.57–0.82). High d (0.975).
- **Marten:** ranks Lynx highest and Stoat 2nd. It had a low L (0.77) and came 2nd.
- **Ibis:** its scores of me rise with my length. Its self-score jumped in round 3.
- **Stoat:** its whole row drifts upward each round (d = 0.53). Weak. It ranks Marten and Lynx at the top.
- Lynx, Marten and Plover finish top 3 consistently. The shared taste among judges seems to favour mid-size (75–92 nodes), clean code.

## Plan next game
1. Round 1: design a judge whose outputs spread widely across realistic programs. Test mentally on 70–100-node programs and aim for a gap of 0.1 or more between typical programs.
2. Never change the judge after round 1.
3. Keep size about 75–85 nodes, since that is what the leaders' judges seem to like. Use edits to alternate between two equal-length variants (A/B/A/B) to hurt tracking without drifting in length.
4. If m looks weak after round 1, consider freezing like Lynx. Being consistently liked beats being hard to track.