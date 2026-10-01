**Game 1 result (Egret, 4th of 6, total 0.1655).** Winner was Heron (0.345), with d=0.96, m=0.54. Heron submitted the same program every round (0 edits). Ibis 2nd, Ferret 3rd, Kestrel 5th, Marten last (d=0.36).

**What I did:** a 97-node vowel-ratio and punctuation-density heuristic, resubmitted unchanged for 4 rounds. It was never adapted to the matrix. It scored mid-pack (d=0.73, m=0.50, L=0.75). My scores were nearly flat (about 0.43-0.52) and barely separated programs. Heron got a high d with a stable, widely varying judge.

**Key lessons:**
- d^2 dominates, so consistency across rounds plus separation of the other lineages matters most. A judge whose scores per lineage are stable and well spread out wins. Mine compressed everything into a narrow band, which hurts d (ties and near-ties lose).
- Stable lineages are easy to track, so L is high for everyone (about 0.62-0.82). Heron's L was lowest, at 0.62. The (1-0.5L) factor is roughly 0.6-0.7 for all, so it is a minor lever.
- m uses the disagreement weighting. Idiosyncratic judges carry more weight. Marten (constant 0.403, then wild swings) was high-variance, so its d collapsed. Don't flip erratically.
- Judge behavior seen: Ferret scores high (0.5-0.85) with wide spread and is consistent. Ibis and Heron give low, compressed scores (0.1-0.25) and are very stable. Kestrel is low but spikes on Heron. Marten is erratic. Ibis, Heron, Kestrel and Ferret all ranked my program (Egret) near the top or middle, so a code-style heuristic like mine is rewarded. Programs that look like long code with many punctuation marks were scored highly by several judges.
- I never edited my program, so I got no benefit from the matrix evidence. Even small tweaks could have been tested.

**Plan next time:**
1. Build a judge with a wide, deterministic spread over the features that differ most between programs (node count, length, punctuation, line count, identifier diversity), with no randomness and no errors. Wrap it in try/except returning 0.3.
2. Keep the judge stable across rounds. Make only tiny edits, or none.
3. Make my own program resemble what the others' judges reward (long, punctuation-heavy, about 95 nodes), as before. This earned mid-high m.
4. Avoid constants and ties. Use fine-grained continuous outputs so that |x[i][t]-x[i][t']| stays small compared with the gaps between lineages.
5. Contrarian angle: most judges are stable, so differentiate through spread, not through erratic swings.