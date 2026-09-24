#!/usr/bin/env node
/* Send the post-purchase survey by hand — for orders placed before the
   webhook existed. Same email as netlify/functions/post-purchase.js.

   Usage (run from the repo root):
     BREVO_API_KEY=xkeysib-... LEMONSQUEEZY_WEBHOOK_SECRET=... node scripts/send-survey.js "jamie@example.com:Jamie Doe" "sam@example.com:Sam"

   The webhook secret must match the one in Netlify — it signs the survey
   link, and the site only accepts answers from links it can verify.

   Each argument is email or email:Full Name. Add --dry-run to print what
   would be sent without sending anything. */

const { htmlBody, textBody, SUPPORT } = require("../netlify/functions/post-purchase.js");
const { surveyUrl } = require("../netlify/lib/survey-token.js");

const args = process.argv.slice(2);
const dry = args.includes("--dry-run");
const people = args.filter((a) => a !== "--dry-run").map((a) => {
  const i = a.indexOf(":");
  return i === -1 ? { email: a.trim(), name: "" } : { email: a.slice(0, i).trim(), name: a.slice(i + 1).trim() };
});

if (!people.length || people.some((p) => !p.email.includes("@"))) {
  console.error('Usage: BREVO_API_KEY=... node scripts/send-survey.js "email:Full Name" ... [--dry-run]');
  process.exit(1);
}
if (!process.env.SURVEY_SECRET && !process.env.LEMONSQUEEZY_WEBHOOK_SECRET) {
  console.error("Set LEMONSQUEEZY_WEBHOOK_SECRET to the same value as in Netlify (it signs the survey link).");
  process.exit(1);
}
if (!dry && !process.env.BREVO_API_KEY) {
  console.error("Set BREVO_API_KEY first (Brevo → SMTP & API → API keys, or copy it from Netlify).");
  process.exit(1);
}

(async () => {
  for (const p of people) {
    const first = p.name.split(/\s+/)[0] || "";
    const url = surveyUrl(p.email, first);
    const message = {
      sender: { name: "Vector DSP", email: process.env.SURVEY_SENDER_EMAIL || SUPPORT },
      to: [{ email: p.email, ...(p.name ? { name: p.name } : {}) }],
      replyTo: { email: SUPPORT, name: "Vector DSP Support" },
      subject: "Quick question from Vector DSP",
      htmlContent: htmlBody(first, url),
      textContent: textBody(first, url),
      tags: ["post-purchase-survey", "manual"]
    };
    if (dry) { console.log(`[dry run] would send to ${p.email} as "Hi ${first || "there"}" — ${url}`); continue; }
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json", "api-key": process.env.BREVO_API_KEY },
      body: JSON.stringify(message)
    });
    console.log(res.ok ? `✓ sent to ${p.email}` : `✗ ${p.email}: Brevo ${res.status} ${await res.text()}`);
  }
})();
