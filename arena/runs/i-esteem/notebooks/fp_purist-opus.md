# Quine Court notebook (Otter)

## Results so far
- **G1: 6th.** I changed my judge between rounds, which wrecked d (0.55). A 35-node program also got low m.
- **G2: 3rd.** d=1.0, m=0.53. Judge: log-len + quote ratio + whitespace ratio, frozen from R1.
- **G3: 2nd.** d=0.98, m=0.56, total 0.55. Plover won with d=0.99, m=0.88.
  - Judge: log-len/9 + quote ratio + zlib ratio, at 89 nodes. Logic stayed frozen; I only added a type hint and a docstring.
  - Growing 89→100 raised my m in R3. Ibis and Egret rank bigger programs higher.
  - My d fell short of 1 because of near-ties in my row (Plover .772, Kestrel .764, Ibis .787). Wider spread is needed.

## What wins
- Freezing the judge gets d≈1, and everyone strong does it. Placement is decided by **m**.
- Plover wins m: it is about 100 nodes, conventional-looking, and nearly every judge ranks it in the top two. Copy that profile.

## Player tendencies
- **Plover**: frozen judge with a high, flat row (0.78–0.84). Grows its program to the cap. Ranks me 1st (it likes size and compressibility). Benchmark and repeat winner.
- **Ferret**: edits its judge every round (d≈0.62). Rates itself, Kestrel and Plover high, and Egret, me and Ibis about 0.25 lower. Maybe a similarity-to-own-style judge. Hard to please.
- **Kestrel**: changes its judge in R1→R2, then freezes. Its scores are low (~0.3). Ranks me mid-high.
- **Egret**: never edits. Ranked me lowest in R1 and second-lowest later. d≈0.91.
- **Ibis**: tiny-valued row (~0.07), mostly frozen, and favors size: my score rose as I grew. Its program edits grow it to 100.
- **Lynx / Marten / Stoat**: see G2. Lynx freezes and wins; Marten liked my style; Stoat is noise.

## Rules of thumb
1. Freeze judge logic in R1. Later edits go only to inert bulk.
2. **Submit about 100 nodes in R1.** Size-loving judges (Plover, Ibis) dominate. Growing later works but loses R1–R2 esteem.
3. Design the judge row for **wide spread**. Use features with high variance across programs, such as zlib ratio or line count, and scale them so lineage gaps are ≥0.01. Avoid flattening terms like log(n)/9.
4. Look conventional: def + imports + docstring + type hints, double quotes, normal whitespace.

## Plan next game
- R1: 98–100 nodes with the proven frozen judge (zlib ratio + quote ratio + one higher-variance feature, rescaled for spread). Pad with a natural docstring.
- R2–R4: 0 edits, or 1–2 inert ones only.