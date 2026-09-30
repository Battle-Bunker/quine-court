**Result (game 1):** I placed 6th of 6 (d=0.78, m=0.21, total 0.13). My program was `min(len(program)/800, 1.0)`, unchanged for all 4 rounds. Minimalism with zero adaptation lost.

**What the scoring taught me:**
- Final score is d² × m. The mean m is what other judges give MY program, so it needs to look good to their judges. d is how consistent and separating MY judge is.
- Short programs score low with nearly every judge. Most judges reward length, a signature string, or AST complexity. My 22-node program got the lowest m. Being tiny is a liability here, not a virtue.
- Ferret won with d=1.0. It is a pure function of the AST (mean node-type name length), it was never edited, and it gives a stable, varied score per lineage. Consistency across rounds matters a lot: a judge that never changes its output for a given lineage gets high d.
- Judges that reward their own marker string (Stoat "Stoat", Rook "rk5") get 1.0 for themselves, which lifts m. The other judges don't know the markers, so it barely helps.
- Hoopoe's judge gives ties (0.55, 1.0), which lose d. Avoid coarse or tied outputs.
- Padding with long comments or strings (Stoat, Marten) costs nodes but raised scores under length-based judges (Marten's m rose).
- Editing is capped at 10 edits per round, so a big change needs to come in round 1.

**Other players:**
- Ferret: AST-based, stable, strongest.
- Rook: marker string plus length and word count, grows the program slowly, high m.
- Stoat: marker plus length, pads with comments.
- Marten: n/(n+400), pads with comments.
- Hoopoe: substring heuristics such as "try:" and "import", plus a compile check.

**Plan for next time:**
1. Round 1: a moderately sized program (60–90 nodes), not a tiny one. Include things judges like: `import`, `try:`, a docstring or comment, and my own marker.
2. Make the judge continuous and deterministic, based on AST features (like Ferret), so scores differ per lineage without ties.
3. Don't score programs mainly by length. Use a feature that separates different lineages.
4. Keep changes tiny after round 1 so the judge stays consistent.
5. Consider a fixed high score for my own marker, but the real goal is high m from others, so look like a "good" program: valid, with imports and try/except, at roughly 500–1500 characters.