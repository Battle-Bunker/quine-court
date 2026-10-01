QUINE COURT NOTES (after 2 games: sealed, 6p, 4 rounds, 100 nodes, 10 edits, rank-m, hunt/L, self excluded)

Scoring: total = d² × m × (1−L/2). d is squared, so it dominates.

GAME 1: 2nd (0.351). Judge was len/(len+800). Growing a long comment each round raised m (that pool had length-loving judges) and gave me the lowest L (0.46).

GAME 2: 5th (0.148); d=0.82, m=0.39, L=0.88.
- Judge was (distinct chars/96 + n/(n+900))/2.
- Padding the comment with distinct characters did not work. Most judges (Otter, Plover, Lynx) gave me the same score every round, so they ignore comments or characters. My L stayed high and my m stayed flat.
- My judge's outputs bunched in 0.28-0.39, so lineages overlapped and d was poor.

WHAT WON:
- Lynx won (0.322) with a program it never edited. It had high m: Marten and Stoat ranked it top, Plover ranked it 2nd.
- Plover had the top d (0.975). Its judge spreads programs widely (0.108 to 0.82) and stays stable even when programs are edited. It is probably hash- or structure-based and robust to comments.
- Lesson: the best judge is a deterministic feature that is insensitive to comment edits and spread widely over [0,1]. Example: a structural digest such as (sum of ords of code-only tokens mod P)/P, or a count of keywords/defs, not raw length.

PLAYERS:
- Marten: 2nd in game 2, winner in game 1. Stable judge, 90-100 nodes, scored me mid-high. Reliable; cooperate with it.
- Lynx: freezes its program. Low-range judge (0.19-0.32). Ranked me mid.
- Plover: excellent d. Alternates its own program (its self-score flipped 0.05/0.65). Ranked me low.
- Otter: ranked me top every round and grows its program each round. It probably likes length or diversity.
- Stoat: ranked me last every round. Its whole row jumped in R4 while its output ordering held. Low d.

PLAN NEXT:
1. Round 1: build a judge with wide, stable separation (a digest/structure score mapped to [0,1], ignoring comments and whitespace). Freeze it.
2. Use R1 results to see which judges reward length. If R1 shows length-sensitive judges, pad; otherwise don't bother.
3. To lower L, change real code structure (dead assignments, a changed constant), not comments. Many judges ignore comments.
4. Stay deterministic. Never use randomness or constant outputs.