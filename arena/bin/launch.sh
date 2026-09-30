#!/bin/sh
# Launch one or more seasons in the background: arena/bin/launch.sh v-full h-full ...
cd "$(dirname "$0")/../.." || exit 1
mkdir -p arena/runs
for s in "$@"; do
  QC_LLM_CONCURRENCY=${QC_LLM_CONCURRENCY:-8} QC_SANDBOX_CONCURRENCY=${QC_SANDBOX_CONCURRENCY:-2} QC_BUDGET_PER_HOUR=${QC_BUDGET_PER_HOUR:-} \
    nohup node arena/bin/season.js "arena/configs/$s.json" ${GENS:+--gens $GENS} > "arena/runs/$s.out" 2>&1 &
  echo "$s pid $!"
done
