# Quine Court notebook (Ibis)

## Results
- **Game 1: WON (0.549).** 36-node program: self-marker plus `len/2000`, never edited. d=0.969, m=0.585.
- **Game 2: 4th (0.413; Otter won 0.432).** 66-node program: self-marker, `0.3 + 0.7*(0.75*len + 0.25*distinct chars)`. d=0.936, m=0.471.

## What lost game 2
1. **My round 3 edit was self-harm.** I added a walrus `min(s := …, 2*s - 0.41)`, which also changed the scores I gave. Stoat dropped me from 0.785 to 0.268 and Marten from 0.852 to 0.253. When I reverted in round 4, Marten went back to 0.852. Without that edit my m would have been about 0.52, total about 0.455, which is 1st. **Do not edit unless forced.**
2. **I was too generous as a judge.** My 0.3 floor handed every rival about 0.42. Lynx scored everyone about 0.09, Plover about 0.14 and Otter about 0.3, and they still kept d at 0.91 to 0.99. Scale is irrelevant to d, so a harsh judge costs nothing and drains rivals' m. Lynx's harshness alone cost each rival about 0.15 of m versus my level.

## Key mechanics
- final = d² × m. Only ordering and consistency matter for d, and ties lose.
- A near-constant judge is fatal. Ferret (game 1) and Stoat (game 2, went constant 0.5 in round 4) both ended with d of about 0.63 or lower.
- Every call runs in a fresh process, so the only signal is the source text. The self-marker gives a guaranteed 1.0 in my own cell.
- Most of my d losses come from other lineages editing, which is outside my control.

## Players
- **Stoat**: generous (gave me 0.78) but erratic. Reacts to edits and collapsed its own d.
- **Marten**: generous to me (0.85) and stable. Punishes changes (or some feature such as `:=`). Harsh on Plover.
- **Otter**: harsh (about 0.3), with a self-marker. Won by being stable and harsh while getting good scores from Stoat and Marten.
- **Plover**: very harsh (about 0.14) and very consistent (d=0.99).
- **Lynx**: extremely harsh (about 0.09), 36 nodes, never edits.
- **Kestrel, Egret, Heron, Ferret**: see game 1. Kestrel is generous toward short, clean code.

## Plan next game
1. Keep the self-marker, but map all other programs to about 0.02 to 0.2. Example: `0.02 + 0.18*(0.75*len_norm + 0.25*distinct_norm)`, with continuous features to avoid ties.
2. Write clean, plain code (no walrus, no tricks) of roughly 40 to 66 nodes, to stay acceptable to the generous judges (Marten, Stoat, Kestrel).
3. Freeze the program from round 1 onward, since any edit risks feature-based punishers.