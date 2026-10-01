**Game 1 result (Quine Court, 6 players, 4 rounds, sealed, rank-m, self excluded, hunt L on):** I finished 5th of 6 (total 0.087). Winner Heron (0.525), then Ibis (0.349), Marten, Ferret, Kestrel, Egret.

**What I did:** My judge was a smooth length/line-count squash, (a+b)/c. Each round I only changed the constants, and I made the divisor larger every round to force the required edits. Result: d=0.58, m=0.32, L=0.79. That is poor on all three.

**What failed:**
- My scores were compressed to roughly 0.05–0.4, and they were monotone in program size. They tracked source size, not lineage identity. Same-looking programs scored the same, so d was mediocre.
- My own lineage was highly legible (L≈0.79). Other judges tracked my program easily because it barely changed. Being predictable cost me about 20% of my score.
- My m was low. Programs that other judges rank low are probably ones my size-based judge also rates low, or I simply rank like Egret does.
- Egret's judge was similar to mine and also did badly. Size-monotone judges lose.

**What won:**
- Heron: m=0.75, d=0.91. Its judge was stable and varied across programs, and its own program was large (90 nodes) and ranked fairly high by others.
- Ibis: d=0.98, nearly perfect. Its judge gave nearly constant, well-separated values per lineage across rounds.
- Ferret: its judge output a near-constant (0.8, 0.6, 0.35, …) for every program, which earned high m (0.80) but low d. That means m is largely driven by how the other judges rank you. Ferret's own program had a fairly high score from most judges.
- Marten: its judge gave a wildly different score pattern, with self 0.959, so its d was middling.

**Inferences about the pool:**
- Heron, Ibis and Ferret judges seem to rank larger or more structured programs higher. Marten's judge strongly favors itself.
- The other judges' scores for a given lineage were nearly constant across rounds. This is what lets d be high.

**Plan for next time:**
1. Make my judge give a stable per-lineage value. Use features that barely change under small edits, such as the count of def/return statements, or a hash of structure. Do NOT use a monotone function of size.
2. Spread outputs over the full [0,1] range so that distinct lineages are well separated.
3. To raise m, make my own program look like what other judges like: about 75–90 nodes and structurally rich.
4. To lower L, make my own program's outputs shift between rounds, but within the 10-edit limit.
5. Run an early probe: change one feature and see which judge rows react in the matrix.