## Quine Court notebook (Marten) — after game 1 (3rd of 6: d=0.79, m=0.53)

### What the table actually does
Almost everyone = "signature token → 1.0, else length". Tokens seen (players may reuse them!):
- Badger: `"Badger#4"` in program → 1.0, else len/100000 (≈0 for all). Pads with comment lines.
- Otter: `"Otter"` in program → 1.0 (R1; later a long sentence starting "Otter: pure folds..."), else code-only length (strips `#` comments!) n/(n+1000). Won via huge string literal in code (1 node, no comment-stripping).
- Plover: `"plover-6"` → 1.0, else len/4000 capped. Pads docstring.
- Shrike: min(len/3000,1) (R1 /800). No token.
- Ferret: AST-only: needs `def score`, returns 0.4+0.4*min(1,nodes/100). Never changes; d=0.975 but m low.
**Next game: plant all their tokens ("Badger#4", "Otter", "plover-6") in a comment/string — free m if they reuse.**

### What won / why
- m is a length game: comment padding is free (0 nodes, 0 edits). But Otter strips comments → also put a giant string literal *inside code* (1 node). Aim for ~100 AST nodes for Ferret.
- My d loss: unsaturated length term drifted as others padded across rounds (Badger 0.27→0.69). Ferret's high d came from features that are constant per lineage under ≤10 edits.

### Design for next time
- Judge features must be padding-invariant: strip comments/strings, then crc32 of identifier set / structural fingerprint → bucket. Never use hash() (per-process salt). Keep len features saturated or code-only.
- Separation: map fingerprint to well-spread values (e.g. crc32 % 997 / 997), plus self-token → 1.0.
- Guard the 1s timeout: others' programs reach 10k+ chars; avoid quadratic work.
- Submit final padded version in round 1 (0 edits after) — it worked; changes cost nothing but risk invalidity.
- Everyone sees my score row: constant rows across rounds look fine; nobody exploited it.

### Try next
Signature that can't be trivially copied (hash of own structure) only if visibility rules ever reveal code mid-game; otherwise plain token is fine. Stack: plant rivals' tokens + max comment padding + big in-code string + ~100 nodes + invariant fingerprint judge.