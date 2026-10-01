// Generates season configs. Persona->model pairing rotates by `shift`, so across seasons with
// shifts 0..3 every persona is played by every model once (decorrelates persona and model).
const fs = require("fs");
const PERSONAS = ["kid12", "fp_purist", "graph_nerd", "mischief", "cryptographer", "diplomat", "scientist", "game_theorist", "minimalist", "rules_lawyer",
  "artist", "security_eng", "altruist", "cutthroat", "copycat", "contrarian", "evolutionist", "cobol", "gambler", "zen"];
const MODELS = ["fable", "opus", "sonnet", "haiku"];
const roster = (shift, personas = PERSONAS) => [
  ...personas.map((p, i) => ({ persona: p, model: MODELS[(i + shift) % 4] })),
  ...MODELS.map((m) => ({ persona: "plain", model: m })),
];
const BASE = { language: "python", nodeLimit: 100, distanceLimit: 10, numRounds: 4, measure: "vanilla", isolation: "row", rulesDetail: "full", visibility: "hidden", chat: false };
const season = (name, shift, over = {}, extra = {}) => ({ name, generations: 8, seed: 1000 + shift, tableSize: 6, effort: "medium", roster: roster(shift, extra.personas), base: { ...BASE, ...over }, digest: true, reflect: true, ...extra.cfg });
const out = {
  "v-full": season("v-full", 0),
  "v-ui": season("v-ui", 1, { rulesDetail: "ui" }),
  "h-full": season("h-full", 2, { measure: "bounded", isolation: "call" }),
  "sweep-v": season("sweep-v", 3, {}, { cfg: { sweep: { nodeLimit: [40, 100, 250], distanceLimit: [3, 10, 30], numRounds: [3, 5] } } }),
  // Controlled comparisons (same persona x model pairing as their reference season):
  "s-shuf": season("s-shuf", 0, { isolation: "row-shuffled" }),               // vs v-full: only the input order changes
  "h-abs": season("h-abs", 2, { measure: "bounded", isolation: "call", objective: "absolute" }), // vs h-full: only the objective changes
};
// Wave 2: homogeneous model tiers (same 12 personas at every tier) to test whether complexity survives
// increasing optimization power. Two tables of six per generation.
const TIER_PERSONAS = ["kid12", "fp_purist", "graph_nerd", "mischief", "cryptographer", "diplomat", "scientist", "rules_lawyer", "security_eng", "altruist", "cutthroat", "plain"];
const tier = (name, model, over, seed) => ({ name, generations: 5, seed, tableSize: 6, effort: "medium",
  roster: TIER_PERSONAS.map((p) => ({ persona: p, model })), base: { ...BASE, ...over }, digest: true, reflect: true });
for (const m of MODELS) out[`tier-h-${m}`] = tier(`tier-h-${m}`, m, { measure: "bounded", isolation: "call" }, 2000);
for (const m of ["haiku", "sonnet"]) out[`tier-v-${m}`] = tier(`tier-v-${m}`, m, {}, 3000);
// Wave 2: social variants on the hardened rules (tables alternate chat / open code).
out["h-social"] = { ...season("h-social", 1, { measure: "bounded", isolation: "call" }, { personas: [...PERSONAS.slice(0, 17), "trickster_diplomat", "economist", "stylometrist"] }),
  generations: 4, tables: [{ chat: true }, { visibility: "open" }, { chat: true }, { visibility: "open" }] };
// ---- Intended rules (per the designer): evaluations are pure and independent (fresh process per
// judge x program), authors never see any other program (sealed: no reveal, results-only digests,
// no error messages, 3-decimal results). 12 agents (3 per model), 2 tables of 6, identical seating
// across these seasons (same seed) so they differ only in the rule under test.
const I_PERSONAS = ["kid12", "fp_purist", "graph_nerd", "mischief", "cryptographer", "diplomat", "scientist", "rules_lawyer", "security_eng", "cutthroat", "contrarian", "plain"];
const SEALED = { ...BASE, isolation: "call", visibility: "sealed" };
const iSeason = (name, over, extra = {}) => ({ name, generations: 6, seed: 4242, tableSize: 6, effort: "medium",
  roster: I_PERSONAS.map((p, i) => ({ persona: p, model: MODELS[i % 4] })), base: { ...SEALED, ...over }, digest: true, reflect: true, ...extra });
out["i-base"] = iSeason("i-base", {});                                                   // intended rules, shipped measurement + scoring
out["i-bounded"] = iSeason("i-bounded", { measure: "bounded" });                         // + information costs nodes/edits
out["i-esteem"] = iSeason("i-esteem", { measure: "bounded", self: "excluded", m: "rank" }); // + relative esteem, no self-score
out["i-hunt"] = iSeason("i-hunt", { measure: "bounded", self: "excluded", hunt: true });   // + reward for being hard to track
out["i-esteem-hunt"] = iSeason("i-esteem-hunt", { measure: "bounded", self: "excluded", m: "rank", hunt: true });
out["i-creeds"] = iSeason("i-creeds", { measure: "bounded", self: "excluded", m: "rank" }, { creeds: true }); // i-esteem + persona creeds
// ---- Wave 3 (after analyst checkpoint 2): esteem+hunt was the only variant with a live arms race.
// j-drift: analyst proposal P1 - a drift floor (>= 3 edits per round) so judges cannot win by freezing and
// programs must keep moving, with hunt at half strength. Same roster/seating as the i-* seasons.
out["j-drift"] = { ...iSeason("j-drift", { measure: "bounded", self: "excluded", m: "rank", hunt: true, huntWeight: 0.25, minDistance: 3 }), generations: 5 };
// Optimization-power test: homogeneous model tiers, same 6 personas, esteem+hunt rules, one table per gen.
const T_PERSONAS = ["kid12", "fp_purist", "graph_nerd", "mischief", "security_eng", "plain"];
for (const m of MODELS) out[`t-${m}`] = { name: `t-${m}`, generations: 5, seed: 5151, tableSize: 6, effort: "medium",
  roster: T_PERSONAS.map((p) => ({ persona: p, model: m })), base: { ...SEALED, measure: "bounded", self: "excluded", m: "rank", hunt: true }, digest: true, reflect: true };
// P2 (analyst checkpoint 2): consensus-discounted esteem - a judge's ranks count with weight (1 - rho)/2 where rho
// is its agreement with the other judges, so whatever everyone rewards stops paying. Stacked on esteem+hunt.
out["k-disc-hunt"] = { ...iSeason("k-disc-hunt", { measure: "bounded", self: "excluded", m: "rank-disc", hunt: true }), generations: 4 };
for (const [k, v] of Object.entries(out)) fs.writeFileSync(`${__dirname}/${k}.json`, JSON.stringify(v, null, 1));
console.log(Object.keys(out).join(" "));
