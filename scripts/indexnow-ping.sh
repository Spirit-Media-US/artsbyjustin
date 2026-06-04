#!/usr/bin/env bash
# IndexNow ping for artsbyjustin.com — submits every sitemap URL to Bing/IndexNow.
# RUN AFTER the key file is live on production (i.e. after dev → main merge):
#   bash scripts/indexnow-ping.sh
# Safe to re-run; IndexNow dedupes. Key file: public/1e361ccb709a913c5b88ebe3a1526fe3.txt
set -euo pipefail

KEY="1e361ccb709a913c5b88ebe3a1526fe3"
HOST="artsbyjustin.com"

# Verify the key file is live first — IndexNow rejects the batch otherwise
if ! curl -sf "https://${HOST}/${KEY}.txt" | grep -q "$KEY"; then
  echo "ERROR: key file not live at https://${HOST}/${KEY}.txt — merge to main first." >&2
  exit 1
fi

URLS_JSON=$(curl -sf "https://${HOST}/sitemap-0.xml" \
  | grep -o '<loc>[^<]*</loc>' \
  | sed -e 's/<loc>//' -e 's/<\/loc>//' \
  | python3 -c 'import json,sys; print(json.dumps([l.strip() for l in sys.stdin if l.strip()]))')

COUNT=$(echo "$URLS_JSON" | python3 -c 'import json,sys; print(len(json.load(sys.stdin)))')

HTTP_CODE=$(curl -s -o /tmp/indexnow-resp.txt -w "%{http_code}" -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "{\"host\":\"${HOST}\",\"key\":\"${KEY}\",\"urlList\":${URLS_JSON}}")

echo "Submitted ${COUNT} URLs — HTTP ${HTTP_CODE}"
[ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "202" ] || { cat /tmp/indexnow-resp.txt; exit 1; }
