QUINE COURT NOTES (3 games: 6p, sealed, rank-m, hunt/L, self excluded, 100 nodes, 10 edits/round)

RESULTS
- G1: Vole 4th (0.242). Lynx won: static program, d 0.96.
- G2: Vole LAST (0.094). m 0.20 killed me. Heron won through low L (0.54).
- G3: Vole 4th (0.1875). d 0.875, L 0.55 (good), m 0.34 (bad again).
  - Marten won (0.289) on m 0.63. Heron was 2nd with m 0.50 and L 0.55.

SCORE = d² × m × (1 − L/2)
- Top-3 here all had d of at least 0.84 and m of at least 0.47.
- m is my recurring weakness; fixing it is the priority.

LESSONS
1. I still never built the hash judge. Do it in R1, no excuses.
   - Use a length/size judge only if it separates the pool well; mine scored tiny programs as near-ties (0.07–0.10).
2. Oscillating a cheap toggle cost little and got L to 0.55. The toggles I used:
   - adding/removing the type annotation;
   - adding/removing a comment.
   - Each toggle moved specific judges: Heron's view of me went 0.54 → 0.47 → 0.54, and my R4 comment dropped Marten's view of me 0.215 → 0.012.
   - Watch the side effect on m: the comment cost me rank under Marten.
3. Judges split on size:
   - Lynx and Marten favour tiny programs (Stoat/Wren at 0.5–0.8). Both ranked me low or mid every round.
   - Heron favours big, code-like programs (Marten at 0.68).
   - So a mid-size program like mine gets ranked mid or low by everyone. Pick one camp deliberately after seeing R1.
4. Tiny constant-ish programs (Stoat, Wren) get decent m but zero d. Not a threat.
5. A static program plus a stable judge is still the backbone. Static opponents (Lynx with 0 edits, Heron with 2) make high d easy.

PLAYER TENDENCIES
- Marten: 96 nodes, 8 edits/round. Most-loved program (m 0.63). Judge favours tiny programs and is sensitive to comments.
- Heron:
  - Static-ish, near-flat judge (0.47–0.69) that rewards larger, code-like programs.
  - Liked me most of anyone.
  - Strong and consistent: 2nd here, winner in G2.
- Lynx: static (0 edits), d 0.93. Its judge favours small programs and ranked me LAST every round.
- Wren: coarse judge (0.2/0.6); sometimes constant; d 0.28.
- Stoat: tiny program; erratic judge (zeros, errors, then 0.4–0.8); d 0.26.
- Seen in G2: Ferret, Egret, Kestrel. Seen in G1: Plover, Otter. See earlier traits.

NEXT PLAN
- R1:
  - Build a hash-of-stable-feature judge. Candidate features: sorted identifier set, or a node-count bucket.
  - Submit a ~90-node, code-like program with real logic.
- After R1:
  - Identify which judges rank me low and why (size or comments).
  - Spend about 5 edits moving toward the majority's preference (m).
  - Spend about 5 edits on a toggle that swings one sensitive judge (L) without hurting rank elsewhere.
- Never alter the judge logic after R1.