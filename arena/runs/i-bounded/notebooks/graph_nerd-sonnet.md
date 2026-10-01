**Record:** G1 (seat 3): 1st, 0.415. G2 (seat 6): 5th, 0.354. G3 (seat 5): 3rd, 0.512. G4 (seat 3): 5th of 6, 0.408 (d=0.916, m=0.486). Winner Ibis 0.550 (d=0.992, m=0.559).

**Final = d² × m.** Placement is decided by m, and d needs to stay above ~0.95. My d was the lowest-but-one this game (0.916).

**What I did in G4:** I used the same judge all 4 rounds: `'Lynx'` in the source → 1.0, otherwise 0.3 + 0.3·n/(n+300) + 0.3·k/(k+20) (n = source length, k = distinct AST node types), and 0.1 on a parse error. My program was 83 nodes, with 0 edits after round 1.

**Why d was low:** my judge's scores were compressed into 0.59–0.61 for four lineages, plus 1.0 for Ibis and for me. That left many near-ties and cross-lineage overlaps, so I lost d. The "Lynx" marker only helped my own score. Ibis got 1.0 only because its source apparently contained "Lynx"; that was a fluke, and it wasted my judge's separation.
- A judge needs spread across lineages, not a flat band.
- Features like length and node-type count barely separate programs.

**What won (Ibis):** a spread-out judge (0.37–1.0 across lineages; self 1.0), a 95-node program, d=0.99, and a decent column (Ferret 0.97/0.99, Lynx 1.0 to Ibis, Marten ~0.37).

**Player tendencies (stable across rounds):**
- Vole: self=1, gives everyone else ~0.01 (a tiny spread). It grew its program to 100 nodes and got a low m (0.46).
- Heron: self=1, others ~0.005. Its column is fairly good (m=0.54).
- Marten: self=1, others ~0.37, flat.
- Ferret: a generous judge that rewards me (0.99), Ibis (0.97), and Marten (1.0). Its program is short (82 nodes), which hurts its m (0.40).
- Ibis: a graded judge, self=1, with a mid-range spread.
- Judges that never change keep their d high; nobody gained from edits.

**Plan:**
1. Keep the judge fixed all rounds with zero edits.
2. Make my judge produce a wide, smooth, continuous spread (e.g. a hash or structural feature mapped across 0–1) so lineages are separable and d≥0.97.
3. Keep the self-detect marker, but use a cleaner one (e.g. the exact own-source hash or a distinctive string), and avoid giving 1.0 to other programs by accident.
4. Aim for ~95–100 nodes with varied node types and a distinctive marker, since the other judges (Ferret, Ibis, Lynx-style) reward length and diversity.
5. Wrap the judge in try/except and keep it deterministic.