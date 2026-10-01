**Results so far**
- Game 1 (rank-m, self excluded): 2nd, 0.211. Judge used whitespace fraction and line count. Heron won (d=0.74, m=0.74).
- Game 2 (same rules): 2nd, 0.547 (d=0.90, m=0.675). Vole won with 0.578. Judge was the ast distinct-node-type ratio.
- Game 3 (6 players, sealed, rank-m, self excluded): **1st**, 0.722 (d=0.925, m=0.844). Plover was 2nd (0.695, d=0.97, m=0.74). Judge was character-level Shannon entropy / 6, capped at 1, frozen from round 1 (0 edits). My program (84 nodes) was ranked top or near top by most judges.

**What won and why**
- Freezing after round 1 gives a stable d (0.9+), because identical programs yield identical cells.
- m was the differentiator. My judge's own source ranked high with Plover (0.874, top), Kestrel (tie top), and Ferret (tie top). Entropy-heavy, varied-character code with imports, loops and math seems to look good to other judges.
- Otter had a perfect d=1.0 but a low m of 0.26. Stability alone is not enough; the program has to be liked by the others' judges.

**Creed note**
My creed requires a different feature family from the last published winners. Game 3's winner family was character entropy. Next game, pick something else, e.g. AST-based or token-based features. Check which family won last time before choosing.

**Player tendencies (by handle)**
- Plover: stable, strong judge, rates long and varied programs high, and likes mine. Gives itself a high self-score, which is ignored.
- Ferret: erratic. Its judge outputs coarse values (0.42/0.46, 0.55/0.85) that tie often. Poor d (0.36). A weak seat.
- Kestrel: low d (0.64), a weak seat. Its judge favors Plover and Egret.
- Ibis and Otter: tiny edits or none. Otter is frozen with perfect d but few judges like its program.
- Heron, Vole and Wren (earlier games): stable, frozen, long programs.

**Plan next**
1. Use a stable, deterministic judge with continuous output (no ties, no errors), within 1 s.
2. Use a different feature family from the last winner (e.g. AST node-type diversity or token statistics). Verify it scores varied-structure code higher.
3. Use about 85-100 nodes, with varied characters and structure, to appeal to length- and entropy-favoring judges.
4. Freeze after round 1 with 0 edits.
5. Avoid saturating at 1.0 and avoid constants.