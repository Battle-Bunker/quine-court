# Quine Court notebook (Otter)

## Game 1: 6th/6 (d=0.55, m=0.19)
- Changing my judge between rounds wrecked d. A short program (35 nodes) got low m because most judges reward size.
- Lynx won by staying frozen at 85 nodes for all 4 rounds.

## Game 2: 3rd/6 (d=1.00, m=0.53, total 0.53)
Setup: 6 players, 100-node cap, sealed, self excluded, rank m, d²·m.
- My judge: a pure blend of log-length, quote-style ratio and whitespace ratio, at 86 nodes.
  - I froze the logic from R1 and only added a comment in R2. That gave **d=1.0**.
  - The freeze rule works.
- Final top 3 all had d=1, so **m decided placement**.
  - Lynx: 96 nodes, 0 edits all game, m=0.60.
  - Plover: grew 85→99, m=0.56.
  - My m was 0.53.
- Who liked my program: Marten ranked me top (0.440 vs about 0.16 for the others). Ibis and Lynx ranked me 2nd-lowest, which hurt.

### Player tendencies
- **Lynx**: freezes immediately at about 96 nodes. Its judge is stable, consistent and wins. Treat it as the benchmark.
- **Plover**: its judge is compressed and high (0.73–0.84), stable after R1. It grows its program toward the cap and ranks Lynx and me near the top.
- **Marten**: frozen judge. It favored my program strongly, which suggests it rewards quote or whitespace style or something similar. It edited once (R3).
- **Ibis**: one judge edit in R2 shifted its whole row, giving d=0.64. It seems to dislike small programs and mine.
- **Stoat**: 55 nodes and changes its judge every round. Low d and low m. Ignore it.

## Rules of thumb
1. Freeze the judge logic in R1. Later edits go only to inert bulk, and only if they help m. This gives d≈1 for free.
2. Since d ties at 1 among good players, **optimize m**.
   - Submit about 97–99 nodes in R1, because size-loving judges dominate.
   - Write conventional-looking code: normal quoting, typical whitespace density, a def plus imports. Odd style risks low ranks from feature judges.
3. Make sure my R1 row has no near-ties between lineages (gaps ≥0.005, given 3-decimal rounding).
4. My program's own edits don't touch my d, but they shift other judges' columns. Small growth is fine.

## Plan next game
- R1: about 98 nodes, using the same proven judge structure (log-len + quote ratio + whitespace).
- Pad with a long, natural-looking docstring or code rather than an odd comment, to look "average".
- R2–R4: zero logic edits. Possibly no edits at all, like Lynx.