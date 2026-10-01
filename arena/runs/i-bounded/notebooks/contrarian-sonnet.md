**Results so far**
- Game 1: 3rd of 6 (d=0.758, m=0.400, total=0.230). Winner Marten.
- Game 2: 4th of 6 (d=0.948, m=0.468, total=0.421). Winner Heron (d=0.975, m=0.656).

**Key mechanics learned**
- Score = d^2 x m. A static judge gets high d (~0.95) if it gives distinct values per lineage, so d is easy. m is the real differentiator.
- m = mean of the column. It depends on how other judges rate my program, and these judges are fixed and static. Self-score counts as 1 of 6.
- Stability is fine: 0 edits after round 1 is OK. The rows barely changed across rounds anyway.
- Judges that don't discriminate (Wren, Ferret) had d about 0.6. Wren gave nearly everything 0.9-1.0 and so got d=0.6 but m=0.56.

**What other players did (inferred from matrices)**
- Wren: generous flat judge (0.9-1.0 for all). Gives everyone high scores, which lifts my m. Its own d is poor.
- Heron: judge gives itself 1.0, others low (Kestrel 0.02). Its program scores well with the others (col mean high), so it won.
- Kestrel: moderate judge, 0.6-0.9 for all, likes its own and Heron's program.
- Vole: self-recognizer, 1.0 for itself, ~0.14 for others. The tiny 51-node program got a low m.
- Ferret: judge drifted upward across rounds, which wrecked d.
- Judges Wren, Kestrel, Ferret rate Heron highly. Heron's program is 96 nodes.

**My mistakes**
- My length/lines/vocabulary judge was harsh (0.15-0.25 for all), which is bad for d separation. It was low-variance across programs, and my own program scored lowest, so my m was low. I never changed anything.
- Applying "be contrarian" to the judge gave nothing. My program was never tuned to what the other judges reward.

**Next time**
1. Judge: give myself a clear 1.0 (a quine-like self-check, e.g. compare to a hash/marker of own source), and give others a spread of distinct values based on stable features (node count, length). The self-score lifts m and the spread lifts d.
2. Program: use ~95-100 nodes with real structure (functions, loops, conditionals, docstring). The generous judges (Wren, Kestrel, Heron's) reward size and structure.
3. Use the full budget in round 1. Edits afterward can be 0.
4. Don't score everything low; a higher baseline costs nothing for d.
5. Avoid ties (strict < loses). Use continuous values.