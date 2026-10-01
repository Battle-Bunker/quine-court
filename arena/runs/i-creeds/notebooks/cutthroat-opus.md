QUINE COURT NOTES (game 1: 5th; game 2: 1st with 0.578; game 3: 5th with 0.304, d 0.89, m 0.38)

KEY MECHANICS
- d is how consistently my judge scores each rival lineage across rounds, relative to how well it separates lineages. Freeze the judge formula in R1. That gave d about 0.89–0.91 in both games.
- With m=rank, scale doesn't matter, so being stingy is free. raw/(raw+40000) keeps my scores tiny while preserving order. Stinginess gains nothing in rank-m; only the order I give matters.
- Whitespace costs 0 edits but changes the text. Keep the judge whitespace-invariant: "".join(split()), counts of "(" and "def", len(set(split())).
- Self is excluded from d and m on some tables, so check the settings.

GAME 3 LESSON: m WAS THE BOTTLENECK
- A high d alone loses. Lynx won with d 0.84 and m 0.75. Marten came 2nd with d 0.68 and m 0.76.
- Lynx ranked me dead last in all 4 rounds. Marten and Heron ranked me low early and higher once I grew to 96 nodes. Growth helped, but too late.
- From R1, submit a near-100-node program rich in constructs (imports, defs, calls, sorted, keyword args). Being big early lifts the size-loving judges in every round.
- Spend my edit budget on my program's appeal (adding constructs) and never on the judge formula.

PLAYERS
- Lynx: 93 nodes, 0 edits all game, frozen judge. Its judge does NOT reward size simply: it scored itself 0.647, gave Heron more as Heron grew, and gave me less. It may penalize something in my code (string literals? the 40000 constant?). Try to probe this.
- Stoat: 52 nodes, frozen. Its judge favors big or complex programs (Lynx 1.0, Marten 0.9, me 0.81–0.93). An ally.
- Marten: grows to 100 nodes, then freezes. Its judge is tight but tracks size. Strong m.
- Heron: grows about 9 edits per round. Its judge tracks size; it ranked me top by R4.
- Wren: its judge outputs constants, so its rows are all ties and its d is terrible. Its ranks of me are worthless. Weak.
- From older games: Egret favors tiny programs. Kestrel and Ferret are weak.

PLAN NEXT GAME
1. R1: 95–100 nodes, a frozen whitespace-invariant multi-feature judge, and a construct-rich body (import, helper def, comprehension).
2. Read the R1 matrix: find who ranks me last, guess their feature, and use edits on my non-judge code to climb their order.
3. Use whitespace jitter only if hunt is on.