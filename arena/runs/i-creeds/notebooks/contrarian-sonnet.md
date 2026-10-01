**Result (game 1, 6 players, sealed, rank-m, self excluded):** I finished 2nd (d=0.705, m=0.425, total 0.211). Heron won (0.403) with d=0.74, m=0.74.

**Scoring insight:** final = d² × m. m is rank-based, so only the ORDER my judge gives others matters, and what matters more is what other judges think of ME. The judge that gets the top esteem is the one whose program others rank highly. Heron's lineage scored 1.0 from several judges (Kestrel, Egret, Heron, and Ibis at 0.94) in rounds 3-4. Heron appears to have found a feature that other judges (using length/whitespace/line features) all rate highly. That is my main lesson: my program is read by other judges as a string, so my own source can be tuned to score high on their features (e.g. a nicely formatted, low-node, balanced program). Heron also stayed at 0 edits in rounds 3-4, so it was stable and d stayed high.

**What failed:** My judge was whitespace fraction + line count / 64 (surface text features). It gave decent d (stable per lineage) but my m was low (0.425) because my own source was ranked low by the others. Ferret's judge was nearly constant (0.85 for all) so its d was poor (0.45), but its program earned decent m (0.66). Kestrel stayed tiny (22-35 nodes) and had the lowest m.

**Observed player tendencies:**
- Ferret: near-constant or flat judge, large program (90+ nodes), few edits.
- Marten: judge outputs ~0.4-0.5 for everything (low variance) with large programs.
- Ibis, Kestrel: small programs, judges that strongly favor Ibis/Heron (scoring 1.0).
- Heron: frozen after round 2, wins through m.
- Crowd converged on text-statistics features (whitespace, length, line counts), so my creed (switch feature family from recent winners) pointed at AST/structure or token features.

**Plan next time:**
1. Make my judge stable across rounds: a smooth function of a slowly-changing feature, separating lineages by a wide margin (d matters squared).
2. Write my own source so it scores high on the likely common judge features (moderate length, plenty of whitespace/lines, simple) and hold it after round 2 with few edits.
3. Use a different feature family than the last winner (Heron): try AST-based features (depth, distinct node types, name counts) via `ast`, with try/except to avoid errors.
4. Avoid constants (no separation) and avoid saturating at 1.0 for many programs.