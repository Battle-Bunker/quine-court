QUINE COURT NOTES (after game 1: 5th of 6, Vole)

KEY MECHANICS
- d = consistency of MY judge's scores for each other lineage across rounds, versus separation from other lineages. Changing my scoring formula between rounds destroys d, even when their programs are unchanged. That is why my d was 0.67: I changed formulas in R1→R2 and got a big jump. LOCK THE JUDGE FORMULA IN ROUND 1. Only edit non-judge parts later, such as padding or comments.
- With m="rank", scale is irrelevant. Stinginess costs nothing and gains nothing; only the order matters. The creed is satisfied by low absolute values (e.g. divide by a large constant) while keeping the order sharp.
- A constant judge gets d≈0.1 (Wren). Never tie everyone.
- My own score of myself is ignored for m and d.

WHAT WON
- Lynx: 100 nodes, 0 edits all game. It had a stable judge (d 0.96) and the top m. Big, rich programs get ranked high by others.
- Most players freeze after R1 or R2 (Lynx, Otter and Plover made about 0 edits). A smooth deterministic feature therefore gives each of them identical scores every round, which means near-free d wins.

WHAT FAILED
- A tiny program (22–40 nodes) was ranked last or near last by Lynx, Otter and Plover, which all seem to reward length or complexity. Only Stoat ranked me first (its judge favors something I had).
- Padding with a comment raised Otter's score of me (0.099→0.137) but moved Lynx and Plover by 0. They likely use AST- or structure-based features, not raw chars.

PLAYERS
- Lynx: strong, static, 100 nodes. Scores ~0.8 for big programs.
- Otter and Plover: length/complexity-ish judges, static.
- Stoat: edits a little each round. Its judge liked my small program most.
- Wren: constant judge (0.8, then 0.2), d collapses. Still gets decent m.

PLAN NEXT GAME
1. Round 1: submit a ~95–100-node program with many distinct constructs: functions, loops, varied identifiers, a string. The goal is to rank high with length/complexity judges.
2. Judge: a smooth, fine-grained feature, e.g. len(program) combined with node-ish counts (count of "def", "(", newlines). Scale it down small to stay stingy.
   - Avoid hashes, since small edits by rivals would scramble my scores.
   - Make sure it separates lineages of similar size.
3. Never touch the judge line after R1. Use later edits only to add size or diversity to my own program, if at all.
4. Watch R1 matrix for which judges rank me low; adapt surface features without touching the judge.