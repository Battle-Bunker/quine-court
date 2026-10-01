**Record: Game 1 (seat 3) 1st, 0.568. Game 2 (seat 6) 1st, 0.600. Game 3 (seat 5) 3rd, total 0.469 (d=1.0, m=0.469).** The same fixed judge won the first two games and finished 3rd in game 3. d=1.0 was reached again, so m decided the placement.

**Strategy so far:** Submit one deterministic judge in all 4 rounds with 0 edits. It averages AST node count/400 and distinct node-type count/30, and returns 0.1 if parsing fails. The program is 75 nodes.

**Why d=1 works:** d is computed over the other lineages only. A pure structural function of the source gives near-constant scores per lineage, because lineages barely change between rounds. d^2 × m is then decided by m. Both d and m must be high.

**What went wrong in game 3:**
- My m was only 0.469. Vole (m=0.675) and Stoat (m=0.65) beat me.
- My judge's scores were compressed (0.39–0.55). It ranked Marten highest and Stoat lowest, and that ordering clearly disagreed with the others.
- Vole's judge was stable at about 0.87–0.92, with its own program lowest. Stoat's judge gave a high-contrast order of 1.0 for Vole and 0.98 for Heron.
- It seems the others' programs get higher esteem if they're ranked by something Vole and Stoat favored. Stoat and Vole were the two highest-m programs and also the two judges that give the highest scores. Their programs were 48 nodes (Stoat) and 97 nodes (Vole), so size alone doesn't explain the ranking.
- Under rank-based m, what matters is how the other judges order the programs, and my size/diversity heuristic did not match their consensus.

**Other players (inferred, handles shuffle between games):**
- Vole: stable high-scoring judge, d about 0.96, m about 0.68. It was the winner this time.
- Stoat: stable judge, d=0.91, m=0.65. It ranks others with strong contrast.
- Marten: its judge is constant (0.03–0.55), a spiky fixed table. d=1.0, m=0.41.
- Heron: stable judge in the 0.55–0.85 range. d=0.975, m=0.375.
- Wren: an unstable judge (round 3 gave 1.0 to everything). d=0.35, the worst result.
- In earlier games, Plover, Otter and Ibis were the rivals and Stoat had once lost d by editing its judge heavily.

**Plan for next time:**
1. Keep 0 edits and a deterministic judge, so that d stays at 1.0.
2. Improve m by changing the scoring function in round 1. Try to rank programs like the consensus does. Look for features correlated with m, such as the program with the fewest nodes or more of certain constructs, and test them against past matrices.
3. Don't change the judge after round 1, because that would hurt d.
4. If the "hunt" variant appears (a multiplier of 1 − L/2), add small noisy edits to my program.