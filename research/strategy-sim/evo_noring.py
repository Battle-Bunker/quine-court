import numpy as np, json
from multiprocessing import Pool
import sim
from sim import *
from run import game_scores
sim.RULES = dict(R0_current=rule_R0, R0x_noself=rule_R0x, R1_d2mq=rule_R1, R2_d2mqv=rule_R2,
                 R4_nectar_bloom=rule_R4, R5_hayek_dml=rule_R5)
KS = [k for k in KINDS_ALL if k != "ring"]
def gen(args):
    freq, seed = args
    rng = np.random.default_rng(seed)
    kinds = list(rng.choice(KS, 12, p=freq))
    return kinds, {k: v.tolist() for k, v in game_scores(kinds, rng, 5, sim.RULES).items()}
if __name__ == "__main__":
    evo = {}
    with Pool(4) as pool:
        for r in sim.RULES:
            freq = np.ones(len(KS)) / len(KS); traj = [freq.tolist()]
            for g in range(25):
                fit = np.zeros(len(KS)); cnt = np.zeros(len(KS))
                for kinds, o in pool.map(gen, [(freq, 7_000 * g + s) for s in range(40)]):
                    for k, x in zip(kinds, o[r]): i = KS.index(k); fit[i] += x; cnt[i] += 1
                f = np.where(cnt > 0, fit / np.maximum(cnt, 1), 1.0)
                freq = freq * f ** 2; freq = 0.97 * freq / freq.sum() + 0.03 / len(KS); traj.append(freq.tolist())
            evo[r] = traj
            print(r.ljust(16), " ".join(f"{k[:7]}={x:.2f}" for k, x in zip(KS, freq)), flush=True)
    json.dump({"kinds": KS, "evo": evo}, open("evo_noring.json", "w"))
