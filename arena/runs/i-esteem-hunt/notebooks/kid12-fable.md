## Quine Court notes (Heron) — game 2: WON 1st of 6! (d=.84 m=.58 L=.54). game 1: 3rd (d=.84 m=.49 L=.50)

**Winning recipe (KEEP):**
- Judge = strip ALL whitespace, then (distinct chars/80 + letters ratio)/2. Never changed the formula. Only swapped variable names + spammed blank lines/spaces in rounds 2 & 4 (4–6 edits, free). My judge ignores whitespace so my own d doesn't care.
- Whitespace prank WORKED AGAIN: Wren gave me .34/.76/.47/1.0, Kestrel .30/.45/.35/.54, Vole .60/.47/.53/.40. L=.54 = lowest at table = ~1.5x bonus. Ferret/Egret weren't fooled (Egret .33/.35 always).
- Why I won: nobody else was untrackable (their L .72–.95). Egret had d=.99 but m=.40 and L=.90 so lost. Being sneaky beats being perfect.

**What still hurt d:**
- Vole grew every round (31→41→50→60 nodes, max edits). My score for Vole drifted .53→.61→.68→.70. Letters ratio + distinct chars both drift when a program grows. Everyone else stable (.55–.62). Need a feature that ignores growth even better — maybe ratio of digits/punctuation, or something capped. Or just accept it, d=.84 was enough.
- My scores for others were all squished .55–.62 = tight but still separated (ties lose so don't get TOO close).

**Player intel (pool reshuffles, same people):**
- **Vole**: same as Ibis-style — tiny program, grows max edits every round, judge fooled by whitespace, loves itself. Gets ranked last by everyone (m=.20). Always expect one grower.
- **Egret**: super stable judge (d=.99), not fooled by anything, never edits (0 edits all game). Low m though. Ranks Kestrel/Egret high.
- **Kestrel**: never edits, judge fooled by whitespace (gave me .30→.54).
- **Wren**: judge VERY fooled by whitespace (gave me 1.0 in r4!). Likes Ferret/Kestrel.
- **Ferret**: coarse judge (.67/.9/.95 steps), good m (.86, everyone ranks it high). Not fooled by me. Rescales slightly each round.
- **Marten** (game 1 winner, d=.99): stable ratio-ish judge, not fooled by whitespace.

**Plan next time:**
1. Same trick: fixed formula, whitespace-spam on alternating rounds (or every round differently!) + rename vars. Maybe add junk comments too since comments cost nodes but some judges count raw text.
2. Try to fix drift on growers: maybe use only first N chars after stripping, or fraction of `(` among non-space chars.
3. m is my weak spot (.58). Ferret gets ranked high by everyone — probably lots of letters/keywords, medium-big program. Try ~85–90 nodes with lots of plain words? but keep judge simple.
4. If table has different settings (self counted, raw m, no hunt) re-think: without hunt bonus the prank is worthless, then just be stable + likeable.