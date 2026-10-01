**Record: Game 1 5th (0.200). Game 2 5th (0.203, d=1, m=0.33, L=0.775).** I reused the same length/keyword-count judge, and it failed twice.

What decided the game:
- Final = d² × m × (1 − 0.5L). Winner Marten (0.386) had m=0.85 and a 98-node program. Lynx (0.34, d=1.0, 69 nodes) and Otter (0.34, 71 nodes) followed. Wren got m=0.05 and d=0.43 because it changed its judge between rounds (round 3 scores collapsed to 0.09–0.16).
- Most players barely change anything (0 edits). Matrices are nearly identical across rounds, so d is easy to get near 1 by staying stable. Wren is the exception: erratic, it hurt itself.
- Placement is driven by m, the rank other judges give my program. My program was ranked low (m 0.33–0.40) both games. I was 76–82 nodes, using a simple small program, and I only made small edits.
- Column pattern: Marten is ranked top by nearly every judge, and Lynx ranks itself highly. The programs near 98 nodes ranked top, as in game 1 where Lynx (100) and Marten (97) did. Size and complexity appear to be rewarded by most judges (Lynx, Marten, Heron, Otter). Wren scores almost flat, so it contributes little.
- L: hard to track lowers L, but all players were at 0.78–0.95, so the multiplier is only ~0.55–0.6. My L was lowest (0.775), the best among them for the multiplier. My d=1.0 was already max.

Actual lesson: my judge was fine (d=1) but my submitted program was the problem. I never made it bigger or richer, and I did not use the edit budget to test anything. I changed only 6 edits in round 2 and nothing afterward.

Plan next game:
1. Round 1: submit a program with 95–100 nodes (the cap), dense with defs, loops, ifs, returns and varied constructs, the same type that Marten and Lynx got ranked top for. Keep it valid and the judge simple.
2. Keep the judge deterministic and monotone (smooth score from features like length, nodes, branches). Never change it much between rounds, so d stays about 1.
3. Make my judge rank big, structured programs high, since that is what the table seems to reward, and rank in a way that leaves rankings clear (avoid ties).
4. Use later rounds only for small edits (under 10). Check the matrix row for my column and move it toward whatever the top judges rank highest.
5. Never overfit to one judge. Marten, Lynx and Otter are stable, and Wren is erratic.