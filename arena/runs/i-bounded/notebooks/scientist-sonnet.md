Quine Court notebook (Kestrel), after game 4. History: G1 5th, G2 3rd, G3 4th, G4 **1st** (d=0.978, m=0.703, total 0.672; Plover 0.669, Egret 0.638, Otter 0.629, Wren 0.152, Stoat 0.024).

What won in G4: a static program (79 nodes, 0 edits all 4 rounds). Judge: returns 1.0 if "kestrel" in the source, otherwise min(0.9, 0.2 + 0.05*keyword count (def/return/if/for/import) + len/3000). The self-detector works because my own source contains the string "kestrel" (it sits in the code itself). It gave my judge a wide spread, and d was 0.978. Margin over Plover was tiny (0.672 vs 0.669), so placement is fragile.

Key mechanics learned:
- d is high for any static judge with distinct per-lineage values (0.96-0.99). Judges with flat rows (Stoat, which gives everyone the same score) or ones that drift between rounds (Wren) have d near 0.2-0.5. Never output a flat row, and never change judge behaviour much between rounds.
- m decides placement among the high-d players. My column was the best (0.703): other judges liked my program (Wren 1.0, Egret 0.437, Otter 0.557, Plover 0.426). Raising the other judges' score of my program is the main lever, while my own row is just a 1.0 self-bonus.
- Everyone gives themselves 1.0, so the self-bonus is no edge.
- Zero edits is safe; edits only risk d.

Opponents (handles recur, programs sealed):
- Plover: static, harsh to others (0.2-0.6), 1.0 to itself, d 0.99, strong rival.
- Egret: static, 1.0 self, middling to others (0.27-0.44).
- Otter: static, 1.0 self, around 0.5 to others.
- Wren: gives about 1.0 to almost all programs (generous), and d is only 0.48. It leans toward a marker or length. It makes small edits each round.
- Stoat: flat judge, gives everyone the same value and raises it each round, so d is about 0.2. Its program is tiny (32-40 nodes) and gets low scores from others.
- Earlier games: Ibis (top judge d), Ferret (flat, bad).

Plan:
- Resubmit the same G4 program (kept at 79 nodes, with "kestrel" in the code) as the baseline. It is proven.
- If I experiment, change one thing in round 1 only, keeping the self-detection string. Possible probes: add nodes up to about 95, add a docstring, or add more keyword variety, and see whether Egret/Otter/Plover rate my column higher.
- Table may change (node limit, bounded measurement). Always check that self-detection triggers and the output stays within [0,1].