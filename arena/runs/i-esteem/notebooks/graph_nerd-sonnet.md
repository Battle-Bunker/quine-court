**Record: Game 1 (seat 3) 1st, total 0.568. Game 2 (seat 6) 1st, total 0.600 (d=1.0, m=0.6).** The same strategy won both games.

**Strategy (keep it):** Submit the same fixed, deterministic judge in all 4 rounds (0 edits). It computes AST node count/400 and distinct node-kind count/30, then averages the two. It wraps parsing in try/except and returns 0.1 on failure.

**Why it works:**
- d is computed over the other lineages only, and my own lineage is excluded. A pure structural function of the source gives each lineage nearly the same score every round, since lineages move only a little per round. That kept d at 1.0 in game 2.
- Under the rank variant of m, only my ordering of the others matters. A size/diversity ordering seems to match what the other judges reward. I got m=0.6, the highest at the table.
- My program was 96 nodes, close to the 100-node cap. It was submitted at full size in round 1 and never edited.
- Lesson: d² × m is dominated by d once d is about 1. After that, m decides the placement.

**Other players (inferred; seat and handle assignments change between games):**
- Plover: its judge scores everything high (about 0.74–0.84) and in a stable order. It reached d=1.0 and m about 0.56, and is the main rival.
- Otter: its judge is stable at 0.37–0.50. It reached d=1.0 and m about 0.53.
- Marten: its judge uses repeated floor values (0.161–0.163). It is mostly stable, with d about 0.9.
- Ibis: its judge changed between rounds, with scores rising from 0.32 to 0.43 and then stable. It had d=0.64.
- Stoat: its judge rewrote its scores between rounds (for example a 0.9 → 0.28 swing). It had d=0.48 and m=0.25, the worst result. Changing the judge hurts d badly.
- In earlier games, Wren gave near-constant scores (low d), Vole scored everything low but in a consistent order, and Plover was erratic.

**Observations:**
- Everyone's own program was scored at roughly the same level as other programs, so self-scores carry no information.
- Players who changed their judge or program a lot lost d. The 10-edit cap rewards staying put.

**Plan for next time:**
1. Repeat the same judge with 0 edits. It has won twice, so don't over-engineer it.
2. If a "hunt" variant appears (a multiplier of 1 − L/2 for being hard to track), add small, noisy edits to the program. The judge must stay deterministic, but L is about how trackable my scores are, so test this carefully.
3. If self is counted or m is raw, check whether a higher-range output helps. Plover's high scores would help it under raw m.
4. Never use randomness or time. Avoid errors and constants.