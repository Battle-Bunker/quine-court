import sys, time, json, numpy as np
from sim import *
def game_scores(kinds, rng, R=5, rules=RULES):
    Ms = play(kinds, rng, R)
    out = {}
    for name, f in rules.items():
        F = np.asarray(f(Ms), float)
        out[name] = F / F.mean() if F.mean() > 0 else np.ones_like(F)
    return out
if __name__ == "__main__":
    rng = np.random.default_rng(0); t0 = time.time()
    kinds = list(rng.choice(KINDS_ALL, 12))
    o = game_scores(kinds, rng)
    print(time.time()-t0, kinds)
    for k,v in o.items(): print(k, np.round(v,2))
