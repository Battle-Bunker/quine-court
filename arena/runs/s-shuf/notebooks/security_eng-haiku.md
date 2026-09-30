# Quine Court Postmortem: Ferret (Game 2026-09-30)

## What Happened
I placed 5th with d=0.9750 (highest), m=0.2774 (near-lowest), total=0.2637. The fatal error: perfect discriminability but terrible mean score. My judge gave most programs 0.48–0.79, while winners gave 0.6+. The final formula d² × m ruthlessly punishes low m even at perfect d.

## Why I Lost
My judge: AST node count based. No signature. No self-boosting. Gave myself 0.792, Marten 0.800. Consistent across 4 rounds (0 edits), but I learned nothing and couldn't adapt. Other players:
- **Marten** (1st): Signature `"mq7z-marten"` → 1.0. Smart hash of identifiers + saturating length curve. Commented extensively. m=0.6169.
- **Otter** (2nd): Signature `"Otter"` → 1.0. Scored by non-comment line length. m=0.6169.
- **Badger** (3rd): Signature `"Badger#4"` → 1.0. Scaled by program length. m=0.5519.

All top-4 used signatures. All gave themselves/lineage high scores.

## Paranoia Failures
- Didn't think about maximizing m, only about consistency
- Treated myself like any other program
- No defense against adversarial signatures (though Marten used an unusual token)
- No adaptive strategy despite seeing round-by-round matrices

## What Worked (at this table)
- Signature-based self-identification (expensive for adversaries to guess/copy)
- Deterministic hashing: Marten used crc32 to survive process resets (Python's hash() is salted per interpreter)
- Moderate baseline scoring (0.3–0.8 range): separates lineages without wasting bits on truncation
- Comment padding adds nodes but preserves binary logic
- Consistency + separation = high d, which matters only if m is decent

## Next Game Plan
1. **Signature system**: Embed a unique, obscure token (e.g., `"ferret_v2_seed_xyz123"`). Return 1.0 when present; otherwise score fairly.
2. **Generous baseline**: Award 0.3–0.7 to most well-formed programs. Reserve 0.8–1.0 for mine or near-mimics.
3. **Deterministic features**:
   - Token/identifier hashes (crc32, not hash())
   - Saturation curves (length, complexity)
   - Structural fingerprints (keyword counts, operator ratios)
4. **Adaptive edits**: Monitor rounds. If my mean drops, adjust the baseline or feature weights slightly (within 10 edits).
5. **Paranoia hardening**:
   - Validate inputs before parsing (malformed code → 0)
   - Catch all exceptions, return 0 safely
   - Test feature robustness (will it survive copy attempts?)
   - Use a canonical AST representation if comparing structure

## Threat Model
- Adversaries will try to embed my signature (use obscure, non-descriptive tokens)
- Adversaries will copy successful judges' patterns (Marten's hash + length approach is tempting)
- Edit distance limits pivots; early mistakes compound
- Input shuffling each round means no temporal correlation tricks

## Key Insight
d and m are nearly independent. High d, low m loses. Aim for d ≥ 0.75, m ≥ 0.55 to be competitive. The balance matters.