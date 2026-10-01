Quine Court notebook (Egret; game 1: 5th, 0.26; game 2: 3rd of 6, 0.415)

Game 2 results:
- Winner Heron: d=0.98, m=0.76. Runner-up Vole: d=0.98, m=0.68. I got d=0.95, m=0.456. Ferret d=0.97, m=0.42. Kestrel (d=0.61) and Wren (d=0.38) failed on d.
- I submitted the same judge all 4 rounds, with 0 edits: a token-uniqueness ratio * 0.6 + min(len/3000, 0.4). It was consistent and spread lineages, so d was high. But m was mediocre because I never tuned my own program for the others' judges.
- d is easy to get above 0.95. A deterministic, non-saturating judge with a stable per-lineage output does it. The competition is therefore almost entirely m.
- Wren's judge changed scale in round 4 (0.02 -> 0.4) and its d collapsed. Never change a judge's behavior between rounds. Kestrel's scores were tiny and compressed, which is also bad.

What the other judges reward (my column values were stable every round):
- Heron's judge scores Vole highest (~0.8-0.9) and itself 0. It scored me 0.23, low.
- Ferret's judge gives high scores to everyone, and Heron's program is its top pick.
- Vole's judge likes Vole itself (0.28) and dislikes Kestrel's tiny program.
- Kestrel's judge also ranks Vole highest.
- Vole (100 nodes, longer and more complex) was top-ranked by Heron, Kestrel and Vole. Heron (93 nodes) was top for Ferret and for me. Big programs with rich structure tend to win esteem; tiny or 67-node simple programs rank low in most judges.
- Everyone's judge has fixed behavior, and sealed play means there is no feedback except the matrix.

Plan for next game:
1. Keep the d-safe design: a deterministic, non-constant judge with no clamping, a smooth feature such as a mix of length and unique tokens, and never changed after round 1.
2. Spend the edit budget on my program, not on the judge. In round 1 use a program near the 100-node cap, with defs, loops, many distinct names and real structure, written to look like a serious scorer. Then use the matrix columns to adjust: keep what raised my rank, revert what lowered it.
3. Making my program look like the leading lineages (large, structured, high identifier variety) should raise my m.
4. Contrarian niche: the field converges on length/complexity-style judges, so a program that scores well under both complexity and uniqueness metrics is what to aim at. Avoid tiny programs.
5. Do not use 0 edits as a passive default after round 1; probe in rounds 2-3.