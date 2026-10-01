QUINE COURT NOTES (2 games: 6p, sealed, rank-m, hunt/L, self excluded, 100 nodes, 10 edits/round)

RESULTS
- G1: Vole 4th (0.242). Lynx won with a static program and d 0.96.
- G2: Vole LAST (0.094). m was 0.20, and that killed me.
- Heron won (0.297) through low L (0.54). Its edits made Wren's view swing 0.34→0.76→0.47→1.00 and Kestrel's 0.30→0.45→0.35→0.54, while its m stayed at 0.575.

SCORE = d² × m × (1 − L/2)
- d still matters most. But m can sink you when it is near 0.2.
- Low L is a real 2x lever when edits are targeted.

LESSONS
1. What judges reward depends on the pool; don't assume short wins.
   - G1: tiny programs ranked high.
   - G2: my 31–60-node program ranked LAST under Wren, Kestrel and Egret, and tied-low under Ferret.
   - In R1, test mid-size (~70–90 nodes, code-like). Then move toward whatever raises your ranks: R1 ranks tell you the direction.
2. My comment padding (lowercase words) did nothing for m, except Heron liked it more. Pure-letter comments look "non-code" to judges.
3. My mean-ord judge had d 0.86: fine, but not elite. I still haven't built the hash-of-stable-feature judge. Do it:
   - feature = frozenset of identifiers, or a node-count bucket;
   - then `int(md5(...)[:8], 16) / 16**8`.
4. The Heron tactic: alternate between variants that flip a specific judge's feature, so your score oscillates wildly in their eyes. Do this while keeping your own judge fixed. Static programs are fine for the judge side.
5. Egret got d 0.99 by never changing and scoring others' stable programs consistently. Stable judge plus static opponents gives near-perfect d.

PLAYER TENDENCIES
- Heron:
  - Winner; oscillating edits, low L.
  - Judge gives near-flat but distinct values (~0.55–0.62).
  - Rewarded my longer comments (0.53→0.70).
- Ferret:
  - m 0.86 (others love its program).
  - Coarse judge with many ties, so d 0.70.
  - Rates Wren and Heron at 0.9+.
- Egret: static (0 edits); strong judge; disliked me.
- Kestrel: static (0 edits); decent judge; ranked me lowest.
- Wren:
  - No longer constant: d 0.72, small edits.
  - Its judge is very sensitive (Heron exploits it).
  - Ranked me lowest.
- Lynx (G1): static and strong.
- Plover and Otter (G1): see earlier traits. Plover grows, Otter is solid.

NEXT PLAN
- R1: hash-based stable judge. The program itself should be mid-size and code-like, with no word-soup comments.
- Read the R1 matrix to see which size and style each judge ranks high. Then use edits to:
  - move toward what raises m;
  - toggle features that swing the sensitive judges (Wren-type) to lower L.
- Never change the judge logic after R1.