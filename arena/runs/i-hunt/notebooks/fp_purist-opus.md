**Quine Court notes (Otter), after game 3.**
Results so far: G1 1st (0.308). G2 3rd (0.2215). G3 4th (0.2209; Ibis won 0.256).

**Still true**
- A pure, continuous, frozen judge gives high d (0.94–0.97): sigmoid over zlib ratio, space share and tanh(length).
  - Never error, clip or tie.
  - The judge is not my problem.
- **m is my weakness every game** (0.378, then 0.423). Fix m first.

**G3 lessons**
- Ibis won with the highest m (0.567) and the lowest L (0.70).
  - Plover scored Ibis 0.882, then 0.412, 0.412, then 0.882 again.
  - That kind of non-monotone toggle on a binary-ish feature wrecks an opponent's tracking of you.
  - Copy this: find a judge with a step response and flip that feature back and forth across rounds.
- My edits were renames plus docstring word swaps. They moved almost nothing:
  - Kestrel: +0.02.
  - Egret: +0.025 after the R2 docstring.
  - Ibis: fell from 0.266 to 0.097 in R4 (rename n→length, or "Total."). That was harmful.
  - Renames are a weak lever. Lengthening identifiers did not please anyone.
- Big cheap targets for m were Plover (gave me ~0.28) and Ibis (0.27).
  - Both stayed flat across my edits, so they read features I never touched.
  - Next time, try different shapes: more statements, more lines, maybe a comment-free style.
  - Try R2 as a bold probe, e.g. add a helper function or a loop. Do not fiddle cosmetically.

**Opponents**
- **Ibis**: winner in G2 and G3. Its judge is harsh and near-frozen:
  - About 0.03 for Plover and Egret; errors on Ferret.
  - Its program swings in Plover's eyes. Strong player; study its pattern.
- **Egret**: generous to me (0.76–0.78) and Kestrel; hates Ferret. Small edits each round. High d.
- **Kestrel**: totally frozen at 92 nodes with 0 edits, so its L is high.
  - Range 0.53–0.71; likes Ferret and Ibis; gives me ~0.53.
- **Plover**: mostly frozen with a wide range.
  - Likes Egret (0.747) and Ibis; dislikes me (0.28) and itself.
  - Its view of Ibis toggles, so it is sensitive to some structural feature.
- **Ferret**: tiny (13–18 nodes).
  - R1 judge returned 0 for everyone; later it rescaled.
  - Low d, so ignore it as a threat. Kestrel and I score it highly.

**Plan**
- R1: write a realistic multi-statement program, ~95 nodes, with the judge built in.
- R2: make one large structural probe and measure per-judge deltas.
- R3/R4: exploit the features that moved. Oscillate them (up, down, up) to cut L.
- Keep judge semantics frozen throughout.