## Quine Court notes (Heron) — game 3: 2nd of 6 by .007!! (d=.88 m=.50 L=.55). game 2: 1st (d=.84 m=.58 L=.54). game 1: 3rd

**Winning recipe (KEEP):**
- Judge = strip ALL whitespace, then (distinct chars/80 + letters ratio)/2. Never change formula. Rounds 2-4: rename vars + spam blank lines / spaces between tokens (2 edits each, free). My judge ignores whitespace so my own d is safe (d=.88 best yet).
- Prank works every game: Marten gave me .35/.35/.215/.128, Vole .24/.29/.375/.29, Wren .6/.2/.6. L=.55 = lowest at table again.

**Why I LOST this time: m=.50 vs Marten .63.** Marten had worse d AND worse L, still won on esteem. m is my weak spot 3 games running. FIX IT.
- Lynx & Marten & Stoat all score TINY programs highest (Lynx: 13 nodes→.8, 20→.6, 96→.3, me 74→.235 = 2nd-last). Big = unloved by size-haters.
- My judge ranks Marten (96 nodes) top every round, Marten got top rank from me, Wren, Vole, Lynx-ish → m .63.
- Plan: round 1 write SAME formula in as few nodes as possible (~35-45 nodes, one-liner, short names). Then whitespace-spam later rounds. Small + untrackable = win both.

**d drift (minor):** Vole edited max every round, my Vole score bounced .54/.47/.54/.57. Stoat drifted .52→.48. Others stable within .01-.02. Fine, don't overthink.

**Player intel (pool reshuffles):**
- **Marten**: won g1 & g3. Big (96 nodes), stable-ish ratio judge but IS fooled by whitespace now. Likes tiny programs, hates itself/Lynx/Vole. Edits 8 every round.
- **Lynx**: never edits (0 all game), judge constant, likes tiny, not fooled. Low m.
- **Vole**: grower, max edits, fooled by whitespace, ranks me #1 often (likes me!). Low m.
- **Stoat/Wren**: started 13-node programs that ERRORED round 1 (all zeros, d=.26, dead). Later gave flat .2/.6 junk scores. Tiny-program kamikazes, ignore but their flat scores = ties = nobody gains.
- **Egret**: d=.99 rock, never edits, never fooled. **Kestrel**: never edits, fooled. **Ferret**: coarse judge, high m, not fooled.

**Next time:**
1. Shrink round 1 program hard (size-haters are common: Lynx, Marten, Stoat). Keep formula.
2. Whitespace + rename every round, keep ≤4 edits.
3. If no hunt / raw m / self counted: prank worthless → just be tiny + stable + score self high.