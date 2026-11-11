#!/usr/bin/env bash
# Commit and push the vector-dsp.com site. Run from Terminal on the Mac:
#   bash "$HOME/dev/Vector DSP/vector-dsp-site/push.sh" "commit message"
# With no message it uses the default below. Netlify deploys on push to main.
set -euo pipefail
cd "$(dirname "$0")"

MSG="${1:-Google Ads: demo download is the primary conversion}"

# A cloud Cowork session can leave a stray lock behind; clear it before anything else.
rm -f .git/index.lock

echo "── status ──"
git status --short
if [ -z "$(git status --porcelain)" ]; then
  echo "Nothing to commit."; exit 0
fi

git add -A
git commit -m "$MSG"
git push origin main

echo
echo "Pushed. Netlify is building — check https://app.netlify.com then:"
echo "  1. open https://vector-dsp.com/tonelab?demo=1, enter your email, click an installer"
echo "  2. DevTools > Network: look for googleadservices.com/pagead/conversion with label lejLCMnBoLYdEK-5wJFF"
