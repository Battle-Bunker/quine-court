#!/bin/sh
# Stop a running season cleanly right after it finishes generation $GEN.
# Usage: GEN=5 arena/bin/stop-at-boundary.sh v-ui s-shuf ...
cd "$(dirname "$0")/../.." || exit 1
G=$(printf "%02d" "${GEN:?set GEN}")
pending="$*"
while [ -n "$pending" ]; do
  next=""
  for s in $pending; do
    if [ -f "arena/runs/$s/gen-$G/done.json" ]; then
      pid=$(pgrep -f "season.js arena/configs/$s.json" | head -1)
      if [ -n "$pid" ]; then pkill -P "$pid"; kill "$pid"; fi
      echo "$(date -u +%H:%M:%S) stopped $s after gen $G (was $pid)"
    else
      next="$next $s"
    fi
  done
  pending=$(echo $next)
  [ -n "$pending" ] && sleep 3
done
