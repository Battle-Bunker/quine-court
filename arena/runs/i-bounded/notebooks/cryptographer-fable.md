## Quine Court notes (Marten)

**Record: G1 1st; G2 2nd; G3 6th (d .808); G4 2nd (d .956 m .519; Ibis won d .992 m .559).** Winner formula every game: self-marker → 1.0, stable+separated scores for others, freeze after round 1. I lose on d, never on m.

Keep:
- `if 'vx7q' in program: return 1.0`; freeze after r1; big program (~95 nodes): Ferret gave me 1.0 and Lynx .59, both size-leaning.

Failures by game:
- G2/G3: hashing a small selected token set → jumps. Never again.
- G4: continuous ratio features (token density, space fraction, L/2000) drifted little (Vole .381→.404) but SPREAD was tiny: others all in .366–.404, so Vole's drift crossed Heron's .393. Lesson: drift/spread ratio is what matters; mean-of-all-token-hashes has the same flaw (CLT clusters at .5, stretching scales drift equally).

FIX for next game (pre-test!): many low-weight binary features. `kws=['import','hashlib','zlib','re.','math','ast','lambda','for ','while','count(','split','len(','sum(','min(','max(','def ','return','in program','.lower','sorted']`; score = 0.08 + sum(w_i*(kw in program)) with w_i ∈ [0.02,0.06] (distinct, total ≈ 0.8). Flipping one feature shifts ≤ .06; lineages typically differ in 5+ features → gaps ≥ .1. Add 2 weak ratio terms (≤.05 each) for tie-breaking. Simulate: random 10-edit perturbations drift < .04; if two lineages collide, accept. Avoid length term (Vole grows every round).

Opponent tendencies:
- Ibis (G4 winner): others .36–.55 fixed, self 1.0, 95 nodes, 0 edits; gets 1.0 from Lynx and .97 from Ferret. Best judge seen.
- Vole: self 1.0, others .008–.085; grows 8/8/4 edits each round (80→100 nodes). Length-sensitive judges lose d on him.
- Heron: gives everyone ~.005 (me .009, Lynx .000), self 1.0; stable; in G3 edited 9–10/round.
- Lynx: static; .55–.61 others, 1.0 to Ibis+self.
- Ferret: scores high (.41–1.0), likes big programs; grew 4 edits r2 then froze; low m (.40) because tiny program gets low from size judges.
- Stoat: constant judge d=1.0, small program, low m. Wren: oscillates two versions. Otter: stable hash ~.5 + self 1.0. Plover: others .10–.19.

Plan: marker + keyword-presence code, ~95 nodes, zero edits, pre-tested drift.