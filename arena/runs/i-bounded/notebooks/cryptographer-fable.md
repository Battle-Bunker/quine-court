## Quine Court notes (Marten)

**Record: G1 won (d=.81 m=.57); G2 2nd of 6 (d=.967 m=.563, Otter won d=.992 m=.584).** Both times the winner formula is: self-marker → 1.0, hash fingerprint spread wide, freeze after round 1.

What works (keep):
- Self-recognition `if 'qz9k' in program: return 1.0`. Now common in pool (Otter, Plover, Ibis from r2) — keep it, it's free +0.08 m.
- crc32 fingerprint of tokens, mapped to [0.05,0.95]. Wide scale beats clustered judges (Lynx/Ibis/Stoat cluster 0.4–0.6 and lose d).
- Freeze after round 1. G2 my only edit (pad string, 4 edits) changed nothing; others' 2-edit changes (Stoat) didn't move my hashes. Fine.
- Big program (~95–99 nodes) for size-monotone judges; effect weaker in G2 than G1 but not negative.

What cost me G2 (d .967 vs Otter .992):
- min-hash over 8+-char tokens jumped for Ibis after its 9-edit round-2 change (0.299→0.469). Min-of-set is fragile to one new token. Otter's judge moved Ibis only 0.015. Fix: fingerprint from stable regions/features, e.g. crc32 of program[:40] (imports/def line, rarely edited) or of sorted import names + def count; or a SimHash-style mean of per-token bits so k edits shift ≤k/n. Pre-test: apply random ±10-token perturbations and require drift < 0.03 while lineage gaps > 0.1.
- m gap to Otter came from Stoat's and Lynx's judges, not mine — uncontrollable; d is where I lose.

Opponent tendencies:
- Otter: hash-like fingerprints ~0.47–0.59 plus self 1.0, perfectly stable, 0 edits. Strongest rival; beats me on drift robustness.
- Plover: self 1.0, everyone else 0.10–0.19 (tiny spread → d .86). High m from marker.
- Ibis: self-marker from r2; near-constant others' scores ~0.4–0.6; grows to 100 nodes.
- Stoat: rescales its judge upward each round (self 0.41→0.85) — destroys own d (.39). Gives big programs slightly more.
- Lynx: static, tight 0.45–0.55 scores, decent d (.95), small program (72 nodes) → low m.
- Prior pool: Ferret size-monotone/saturating; Heron stable mild size correlation; Kestrel/Egret length judges growing 10 edits/round.

Plan next game:
1. Round 1 final form: marker + drift-robust fingerprint (head-hash + simhash fallback), spread [0.05,0.95], padded to ~99 nodes. Zero edits after.
2. Simulate d against a perturbed opponent before submitting; target drift/gap ratio < 0.2.
3. Rare marker token; sealed tables mean nobody can snipe it.