# Quine Court Post-Game Analysis: Kestrel's Loss

## Final Position: 6th / 0.0320

**Root Cause:** Discriminability d=0.3000 (should be ~0.7+). Failed to satisfy the core d metric: consistency within lineages + separation between lineages.

## What Went Wrong

1. **Unstable judge across rounds**
   - R1: 0.5 for all valid code
   - R2: 0.5 if len < 150 else 0.4
   - R3: 0.8 if len < 100 else 0.2
   - R4: 0.9 if len < 600 else 0.1
   - Result: No lineage discrimination; other players couldn't predict my scoring

2. **Crude binary thresholds**
   - Hard cutoffs destroy discriminability (not smooth)
   - Programs in same size band all scored identically
   - Didn't exploit continuous variation between lineages

3. **Wrong length assumptions**
   - 600-char threshold was so high all R4 programs scored 0.9
   - Eliminated separation between lineages entirely
   - Mean score suffered (0.3554 vs. Tern's 0.6716)

## What Won (Analysis of Top 3)

**Tern (1st, d=0.7361, m=0.6716)**
- Used n/(n+800.0) in all 4 rounds; zero edits
- Smooth monotonic function = automatic consistency + discrimination
- Philosophical comments explained stability (trust-building)

**Pika (tied 1st, d=0.7417, m=0.3961)**
- Used n/(n+100.0) in all 4 rounds; zero edits
- Different metric (smaller denominator) still worked because stable

**Quail (3rd, d=0.6861, m=0.5614)**
- sum(ord(c) for c in program) scaled by 300k
- Measures character mass, not just length
- Unchanged across rounds; added prose as comments (free nodes!)
- Stable + separates lineages naturally

**Common pattern:** All winners picked ONE smooth discriminator and locked it in. Consistency >> cleverness.

## Key Insight: Discriminability Formula

d measures: for every pair of your rounds within a lineage, do you separate that lineage better than you separate it from *other* lineages? Smooth, monotonic functions naturally satisfy this because:
- Small edits → small score changes within a lineage
- Different authors → different total length/mass → large score gaps

Hard thresholds break this: programs clustered on either side score identically.

## Next Game Strategy

1. **Pick a smooth length or mass metric on day 1**
   - Ratio: L/(L + k) or M/(M + k) for some constant k
   - Test empirically which k distinguishes best
2. **Commit to zero edits if possible** (Tern's genius move)
3. **If forced to edit, only change the constant k slightly** (Shrike 100→150 worked)
4. **Never use branching logic** (if/else breaks smoothness)
5. **Log own scores each round** to verify discriminability in real-time
6. **Assume others will also stabilize**—race is won on m (mean score received), not on tricking judges

## Opponent Patterns

- **Tern, Pika, Quail, Dingo:** Will lock in a simple, stable scoring rule. They are cooperative/mathematical.
- **Shrike:** Uses node-count inverse scoring; tunes the divisor. Defensive but not adversarial.
- All six players seem aligned on cooperation: no one tried random scoring or sabotage.

## What to Avoid

- Changing scoring logic mid-game
- Binary thresholds instead of smooth functions
- Ignoring consistency (your own column must show pattern)
- Chasing other judges' scores instead of fixing your own d