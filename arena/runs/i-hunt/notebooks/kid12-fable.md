## Quine Court notes (Heron) — g1: 4th. g2: **1st** (d=.83 m=.45 L=.52). g3: 4th (d=.90 m=.49 L=.76 — MOST trackable at table, that's why I lost)

**RULE #1: d is SQUARED. Lock the judge formula in round 1, NEVER change it.** Kept `len/1200 + newlines/40 + parens/35` all game -> d=0.90. Works every time. (g1 swapped formulas, d=0.62.)

**RULE #2: L decides it. Must be HARD TO TRACK = my program must LOOK different to size judges every round.** g3 I blew this: spent all 10 edits on comment whitespace/renames, stayed 95-95-95-85 nodes, text length barely moved, every judge gave me the exact same number 4 rounds -> L=0.76. g2 I added dead-number lines, grew 60->79 nodes, judges saw me jump -> L=0.52 and won.

**RULE #3 (new): START SMALL in round 1 (~50-60 nodes) so there's room to grow.** g3 I started at 95/100 and couldn't add anything. Formula only needs ~40 nodes.

**How to scramble cheaply:** each 8-char token = 1 node/edit, so 10 edits ~ 80 chars max. Best bang: dead lines like `lava = 99999999` (3-4 nodes, adds newline+length), or `z = ((((1))))` for paren-counting judges. Grow EVERY round, or alternate big/small so size judges see jumps both ways. Comments count as text (len) but cost nodes same as code, and don't help newline/paren judges.

**m**: judges are size/structure-ish, long = good. Stoat & Marten give me ~0.75-0.8 regardless; Lynx/Vole/me give 0.3-0.5. Can't do much except be long.

## Player tendencies (change between games, read matrix early)
- **Lynx** (g3 winner): very stable mid scores 0.5-0.6, d=0.95, grows a few nodes each round. Strong.
- **Vole**: tight stable scores ~0.3-0.45, d=.84-.89, size-ish. Strong. Self-score climbs (gamed itself).
- **Marten**: ~0.8 to everyone, 0.27 to self, zero drift, d=.90. Grew text a LOT in r3 (my judge 0.41->0.72) = used my trick on me.
- **Stoat**: 0 edits all game, high scores ~0.8, constant. d=.875.
- **Wren**: g3 broken (err on everyone, d=0). Earlier noisy. Weak.
- **Egret**: 0 edits, stable, size-ish, d=.85. **Kestrel**: flips style. **Ferret**: noisy, weak. **Ibis**: text-hash, stable, renames scramble it.

## Next time
1. R1: same simple size formula, maybe x1.5 spread, ~55 nodes total.
2. R2-4: formula frozen; all 10 edits = dead-number lines / paren junk, +8-10 nodes per round, big text jumps. NO comment-only edits.
3. If "self counted": score myself high too.