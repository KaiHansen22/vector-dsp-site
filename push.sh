#!/usr/bin/env bash
# Commit and push the vector-dsp.com site. Run from Terminal on the Mac:
#   bash "$HOME/dev/Vector DSP/vector-dsp-site/push.sh" "commit message"
# With no message it uses the default below. Netlify deploys on push to main.
set -euo pipefail
cd "$(dirname "$0")"

MSG="${1:-Specular: waitlist page, hero video, Brevo list routing, home-page card}"

# A cloud Cowork session can leave a stray lock behind; clear it before anything else.
rm -f .git/index.lock

echo "── status ──"
git status --short
if [ -z "$(git status --porcelain)" ]; then
  echo "Nothing to commit."; exit 0
fi

git add -A
git commit -m "$MSG" -m "Adds /specular (orange/purple waitlist page with the 11th Hour strata hero loop and sound toggle),
routes product=specular signups to Brevo list #10 in netlify/functions/subscribe.js (ToneLab stays on #6),
names the Specular card on the home page, and registers the new assets with Eleventy + a /specular redirect."
git push origin main

echo
echo "Pushed. Netlify is building — check https://app.netlify.com then:"
echo "  1. open https://vector-dsp.com/specular"
echo "  2. sign up with hansenkai22+specular@gmail.com"
echo "  3. confirm it lands in Brevo › Specular › Waitlist (#10)"
