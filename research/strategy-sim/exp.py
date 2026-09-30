import numpy as np, json, sys
from multiprocessing import Pool
from sim import *
from run import game_scores
N = 12; R = 5

def mixed(seed):
    rng = np.random.default_rng(seed)
    kinds = list(rng.choice(KINDS_ALL, N))
    o = game_scores(kinds, rng, R)
    return kinds, {k: v.tolist() for k, v in o.items()}

def invade(args):
    res, mut, seed = args
    rng = np.random.default_rng(seed)
    kinds = [res] * (N - 1) + [mut]
    o = game_scores(kinds, rng, R)
    return res, mut, {k: float(v[-1] / v[:-1].mean()) if v[:-1].mean() > 0 else float('nan') for k, v in o.items()}

def evo_gen(args):
    freq, seed = args
    rng = np.random.default_rng(seed)
    kinds = list(rng.choice(KINDS_ALL, N, p=freq))
    return kinds, {k: v.tolist() for k, v in game_scores(kinds, rng, R).items()}

if __name__ == "__main__":
    with Pool(8) as pool:
        # 1. mixed tournaments
        acc = {r: {k: [] for k in KINDS_ALL} for r in RULES}
        for kinds, o in pool.map(mixed, range(600)):
            for r, v in o.items():
                for k, x in zip(kinds, v): acc[r][k].append(x)
        mix = {r: {k: (np.mean(v), np.std(v) / np.sqrt(len(v))) for k, v in d.items()} for r, d in acc.items()}
        json.dump({r: {k: v[0] for k, v in d.items()} for r, d in mix.items()}, open('mixed.json', 'w'), indent=1)
        # 2. invasion
        residents = ["taste", "ring", "focal"]
        jobs = [(a, b, s) for a in residents for b in KINDS_ALL if b != a for s in range(30)]
        inv = {}
        for a, b, o in pool.map(invade, jobs):
            for r, x in o.items(): inv.setdefault(r, {}).setdefault(a, {}).setdefault(b, []).append(x)
        inv = {r: {a: {b: float(np.nanmean(v)) for b, v in d2.items()} for a, d2 in d1.items()} for r, d1 in inv.items()}
        json.dump(inv, open('invade.json', 'w'), indent=1)
        # 3. replicator meta-evolution (strategies copy what wins, across games)
        evo = {}
        for r in RULES:
            freq = np.ones(len(KINDS_ALL)) / len(KINDS_ALL); traj = [freq.tolist()]
            for gen in range(25):
                fit = np.zeros(len(KINDS_ALL)); cnt = np.zeros(len(KINDS_ALL))
                for kinds, o in pool.map(evo_gen, [(freq, 10_000 * gen + s) for s in range(40)]):
                    for k, x in zip(kinds, o[r]):
                        i = KINDS_ALL.index(k); fit[i] += x; cnt[i] += 1
                f = np.where(cnt > 0, fit / np.maximum(cnt, 1), 1.0)
                freq = freq * f ** 2; freq = 0.97 * freq / freq.sum() + 0.03 / len(KINDS_ALL)  # selection + mutation
                traj.append(freq.tolist())
            evo[r] = traj
            print(r, {k: round(x, 2) for k, x in zip(KINDS_ALL, freq)}, flush=True)
        json.dump(evo, open('evo.json', 'w'))
