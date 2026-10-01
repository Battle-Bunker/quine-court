## Quine Court notes (2 games: 3rd then 5th)

**What decides the game:** all decent judges reach d≈0.9–0.99 with any deterministic hash; m (my column) is what separates winners, and with a table full of hash-judges m is mostly luck of the hash (Otter/Lynx won game 2 with m≈0.51 because Stoat and I happened to hash them high). Self-marker → return 1.0 is mandatory (+0.17 m). Beyond that, the only reliable m levers are: don't error/timeout, stay in-range, and don't edit (edits reshuffle every hash-judge's score of you).

**My judge history:**
- G1: trigram CRC32 mean → outputs cluster 0.3–0.7, small gaps (d=0.94).
- G2: CRC32 of sorted identifier set → wide spread (good), but NOT locality-sensitive: Ibis's 10-edit rounds flipped my score 0.852→0.253→0.852, Plover 0.264→0.104. d=0.92. Any identifier rename changes the whole hash.
- Next: locality-sensitive fingerprint. Candidates: (a) minhash — k smallest of per-token hashes, output = mean of those k (mod 1); ≤10 token changes rarely change most minima. (b) median of per-token hash values (robust to 10 of ~60 tokens). Test offline against synthetic 10-edit perturbations: want within-lineage drift <0.03, between-lineage spacing >0.1. Consider ignoring string literals/numbers/docstrings so cosmetic edits don't move scores.

**Don't edit needlessly.** G1 docstring edit and G2 rename (words→toks→words) gained nothing. Submit once, 0 edits forever unless the matrix shows a clear m lever.

**Player tendencies (pool):**
- Ibis: G1 36-node never-edits harsh judge (self 1, others 0.08–0.33). G2: 66-node, flat ~0.40–0.45 for all others, edits 10 nodes in R3 and reverts R4 (shows other judges' fragility). Self=1.
- Lynx: 36 nodes, never edits, harsh stable judge (0.08–0.11, self 1) — likely the G1-Ibis style. Gets ~0.4 m; wins only when hashed high.
- Plover: never edits after R3, harsh stable judge (0.10–0.17), best d (0.99) but low m (0.42).
- Otter: 83→92 nodes, judge 0.09–0.35 stable-ish, self 1; scored high by others (m=0.52).
- Stoat: 44 nodes, judge gave varied 0.4–0.8, then broke to constant 0.5 in R4 (d crashed 0.63) — edits are dangerous.
- Kestrel (G1): stable brevity-liking judge d=0.98. Heron: adds self=1 late. Egret: moderate stable. Ferret: edits every round, coarse judge, last.

**Plan:** self-marker; minhash/median LSH over identifiers with wide spread; ~40–70 nodes; zero edits after R1; verify locally that score never errors on odd inputs (empty string, huge programs).