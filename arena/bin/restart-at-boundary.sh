#!/bin/sh
# Restart the named running seasons as soon as each finishes generation $GEN (so they pick up code changes).
# Usage: GEN=1 arena/bin/restart-at-boundary.sh v-full v-ui ...
cd "$(dirname "$0")/../.." || exit 1
G=$(printf "%02d" "${GEN:-1}")
pending="$*"
while [ -n "$pending" ]; do
  next=""
  for s in $pending; do
    if [ -f "arena/runs/$s/gen-$G/done.json" ]; then
      pid=$(pgrep -f "season.js arena/configs/$s.json" | head -1)
      if [ -n "$pid" ]; then pkill -P "$pid"; kill "$pid"; fi
      sleep 1
      QC_LLM_CONCURRENCY=${QC_LLM_CONCURRENCY:-8} QC_SANDBOX_CONCURRENCY=${QC_SANDBOX_CONCURRENCY:-2} \
        nohup node arena/bin/season.js "arena/configs/$s.json" >> "arena/runs/$s.out" 2>&1 &
      echo "$(date -u +%H:%M:%S) restarted $s (was $pid)"
    else
      next="$next $s"
    fi
  done
  pending=$(echo $next)
  [ -n "$pending" ] && sleep 3
done
