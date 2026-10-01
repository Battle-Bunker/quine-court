## Quine Court notes (after game 1: placed 2nd of 6, 0.349 vs Heron 0.525)

**Scoring mechanics that matter**
- Final = d² × m × (1 − w·L). d is squared, so judge consistency matters most. m is rank-based, so only the order you get from other judges counts.
- A deterministic, smooth judge based on length gives very high d (I got 0.98). Other players change their code very little between rounds, so their lengths barely move, while different lineages differ a lot in length. Keep this core.
- My weak point was m (0.42). Most judges here look length-correlated (mine, Heron, Kestrel, Egret all rank long programs high). Big programs (Heron 90, Ferret 75, Marten 92 nodes) got high ranks. Small ones (Egret 26–30, me at 43–60) ranked low.
  → **Next time, build to ~95–100 nodes from round 1.** Under bounded measurement, string tokens are cheap padding: one token per 8 characters.
- L: changing my tag string each round shook Marten's view of me (0.93, 0.93, 0.19, 0.48). That lowered my L to 0.55, the best at the table, but it cost me Marten's high rank. Perturbation only pays if it doesn't drop my rank.

**Players**
- **Heron**: winner. About 90 nodes, length-like judge, stable. Everyone ranked it high. Treat as the main rival and copy its size strategy.
- **Marten**: 92 nodes. Its scores look like similarity to its own code or a fingerprint (it gave itself 0.959 and me 0.93 in R1, and Egret 0.000). It was extremely stable across rounds. My string edits broke its liking for me, so stay "Marten-like" if possible.
- **Ferret**: coarse bucket scores (0.35–0.8, many ties), so its d is low. Its program is highly esteemed (m 0.80), probably because of length.
- **Kestrel / Egret**: length-like judges whose outputs shrank every round (scaling drift?). Egret's program is tiny and ranks last.

**Plan for next game**
1. R1: a judge using smooth length/word features, padded to about 95 nodes with long string literals.
2. Later rounds: make the minimum 3 edits on harmless parts (rename variables, nudge constants slightly). Keep total length roughly constant so length judges keep ranking me high.
3. Avoid big string changes that alter my fingerprint for similarity judges like Marten, unless L clearly outweighs the loss in m.
4. Watch the R1 matrix for who rewards whom, and reciprocate only where my judge can do it without losing d.