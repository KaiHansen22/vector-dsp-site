/* ─────────────────────────────────────────────────────────────────────────────
   /api/post-purchase — Lemon Squeezy `order_created` webhook.

   Sends every new ToneLab customer a short feedback email through Brevo's
   transactional API. Replies go to support@vector-dsp.com, so answers land in
   the normal support inbox — no form, no database.

   Required env vars (Netlify → Site configuration → Environment variables):
     BREVO_API_KEY                 already set (used by subscribe.js)
     LEMONSQUEEZY_WEBHOOK_SECRET   the signing secret entered on the webhook in
                                   Lemon Squeezy → Settings → Webhooks
   Optional:
     SURVEY_SENDER_EMAIL   default support@vector-dsp.com (must be a verified
                           sender in Brevo)
     SURVEY_DELAY_HOURS    default 0. Brevo can schedule up to 72h out — e.g. 48
                           gives buyers time to actually use the plugin first.
     SURVEY_SEND_TEST      "1" to also send for Lemon Squeezy test-mode orders
                           (handy for trying it end to end; unset afterwards).
   ──────────────────────────────────────────────────────────────────────────── */

const crypto = require("crypto");
const { surveyUrl } = require("../lib/survey-token.js");

const SUPPORT = "support@vector-dsp.com";

function reply(status, body) {
  return {
    statusCode: status,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body)
  };
}

/* Lemon Squeezy signs the raw request body with HMAC-SHA256 (hex) and sends it
   in X-Signature. Verify against the raw bytes, before any JSON parsing. */
function signatureValid(raw, signature, secret) {
  if (!signature || !secret) return false;
  const expected = crypto.createHmac("sha256", secret).update(raw).digest("hex");
  const a = Buffer.from(String(signature), "utf8");
  const b = Buffer.from(expected, "utf8");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function escapeHtml(s) {
  return String(s || "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

const QUESTIONS = [
  "How did you find out about ToneLab and Vector DSP?",
  "What interests you the most about ToneLab?",
  "What more would you like to see from Vector DSP in the future?"
];

function textBody(firstName, url) {
  return [
    `Hi ${firstName || "there"},`,
    "",
    "Thanks for picking up ToneLab. Vector DSP is a small design studio, so hearing from you directly shapes what we build next. If you have a minute, we'd love your answers to these:",
    "",
    ...QUESTIONS.map((q, i) => `${i + 1}. ${q}`),
    "",
    `Answer here (takes about 30 seconds): ${url}`,
    "Or just hit reply.",
    "",
    "Enjoy shaping your sound!",
    "",
    "The Vector DSP team",
    SUPPORT
  ].join("\n");
}

function htmlBody(firstName, url) {
  const name = escapeHtml(firstName || "there");
  const questions = QUESTIONS.map((q, i) => `
          <tr><td style="padding:0 0 14px 0;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
              <td valign="top" width="36" style="font-family:'IBM Plex Mono',Menlo,Consolas,monospace;font-size:13px;font-weight:500;color:#9B6DFF;line-height:26px;">${String(i + 1).padStart(2, "0")}</td>
              <td valign="top" style="font-family:'Barlow','Segoe UI',Arial,sans-serif;font-size:17px;font-weight:500;color:#EDF0F4;line-height:26px;">${escapeHtml(q)}</td>
            </tr></table>
          </td></tr>`).join("");

  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark">
<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500&family=Barlow+Condensed:wght@700;800&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet">
<style>@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500&family=Barlow+Condensed:wght@700;800&family=IBM+Plex+Mono:wght@500&display=swap');</style>
<title>Thanks for choosing ToneLab</title></head>
<body style="margin:0;padding:0;background:#0B0D11;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#0B0D11;">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px;background:#13161D;border:1px solid #1F232B;border-radius:8px;">
      <tr><td style="padding:34px 34px 8px 34px;">
        <div style="font-family:'Barlow Condensed','Arial Narrow',Arial,sans-serif;font-size:30px;font-weight:800;letter-spacing:0.03em;text-transform:uppercase;line-height:1;">
          <span style="color:#EDF0F4;">Tone</span><span style="color:#00C2FF;">Lab</span>
        </div>
        <div style="height:3px;width:48px;background:#9B6DFF;margin:14px 0 0 0;font-size:0;line-height:0;">&nbsp;</div>
      </td></tr>
      <tr><td style="padding:22px 34px 6px 34px;font-family:'Barlow','Segoe UI',Arial,sans-serif;font-size:17px;font-weight:300;color:#C9CDD4;line-height:28px;">
        Hi ${name},<br><br>
        Thanks for picking up ToneLab. Vector DSP is a small design studio, so hearing from you directly shapes what we build next. If you have a minute, we'd love your answers to these:
      </td></tr>
      <tr><td style="padding:20px 34px 6px 34px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">${questions}
        </table>
      </td></tr>
      <tr><td style="padding:8px 34px 8px 34px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="background:#00C2FF;border-radius:4px;">
            <a href="${escapeHtml(url)}" style="display:inline-block;padding:14px 28px;font-family:'Barlow Condensed','Arial Narrow',Arial,sans-serif;font-size:16px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#06080B;text-decoration:none;">Answer in 30 seconds</a>
          </td>
        </tr></table>
        <div style="font-family:'Barlow','Segoe UI',Arial,sans-serif;font-size:14px;font-weight:300;color:#5A6070;line-height:22px;padding-top:12px;">Or just hit reply &mdash; it reaches us directly.</div>
      </td></tr>
      <tr><td style="padding:22px 34px 30px 34px;font-family:'Barlow','Segoe UI',Arial,sans-serif;font-size:15px;font-weight:300;color:#EDF0F4;line-height:24px;">
        <span style="font-family:'Barlow Condensed','Arial Narrow',Arial,sans-serif;font-size:28px;font-weight:800;letter-spacing:0.02em;text-transform:uppercase;line-height:1.1;color:#C4A8FF;">Enjoy shaping your sound!</span><br><br>
        <span style="color:#5A6070;">The Vector DSP team</span><br>
        <a href="mailto:${SUPPORT}" style="color:#00C2FF;text-decoration:none;">${SUPPORT}</a>
      </td></tr>
    </table>
    <div style="font-family:'Barlow','Segoe UI',Arial,sans-serif;font-size:12px;font-weight:300;color:#5A6070;line-height:18px;padding:18px 16px 0 16px;max-width:560px;">
      You're receiving this because you purchased ToneLab from <a href="https://vector-dsp.com" style="color:#5A6070;">vector-dsp.com</a>. This is a one-time message.
    </div>
  </td></tr>
</table>
</body></html>`;
}

/* Exported so scripts/send-survey.js can send the same email by hand. */
exports.htmlBody = htmlBody;
exports.textBody = textBody;
exports.SUPPORT = SUPPORT;

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return reply(405, { error: "POST required" });

  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret || !process.env.BREVO_API_KEY) {
    console.error("post-purchase: missing LEMONSQUEEZY_WEBHOOK_SECRET or BREVO_API_KEY");
    return reply(500, { error: "Server misconfigured" });
  }

  const raw = event.isBase64Encoded
    ? Buffer.from(event.body || "", "base64")
    : Buffer.from(event.body || "", "utf8");
  const headers = {};
  for (const k of Object.keys(event.headers || {})) headers[k.toLowerCase()] = event.headers[k];

  if (!signatureValid(raw, headers["x-signature"], secret)) {
    console.warn("post-purchase: signature did not verify");
    return reply(401, { error: "Invalid signature" });
  }

  let payload;
  try { payload = JSON.parse(raw.toString("utf8")); }
  catch { return reply(400, { error: "Invalid JSON" }); }

  const eventName = (payload.meta && payload.meta.event_name) || headers["x-event-name"];
  /* Anything other than a new order is acknowledged and ignored, so extra
     events ticked on the webhook never cause retries or stray emails. */
  if (eventName !== "order_created") return reply(200, { ok: true, skipped: eventName || "unknown" });

  const a = (payload.data && payload.data.attributes) || {};
  if (a.test_mode && process.env.SURVEY_SEND_TEST !== "1") {
    return reply(200, { ok: true, skipped: "test_mode" });
  }
  if (a.status && a.status !== "paid") return reply(200, { ok: true, skipped: "status " + a.status });

  const email = String(a.user_email || "").trim();
  if (!email.includes("@")) return reply(200, { ok: true, skipped: "no email" });
  const firstName = String(a.user_name || "").trim().split(/\s+/)[0] || "";
  const url = surveyUrl(email, firstName);

  const message = {
    sender: { name: "Vector DSP", email: process.env.SURVEY_SENDER_EMAIL || SUPPORT },
    to: [{ email, ...(a.user_name ? { name: a.user_name } : {}) }],
    replyTo: { email: SUPPORT, name: "Vector DSP Support" },
    subject: "Quick question from Vector DSP",
    htmlContent: htmlBody(firstName, url),
    textContent: textBody(firstName, url),
    tags: ["post-purchase-survey"]
  };

  const delayHours = Math.min(Math.max(Number(process.env.SURVEY_DELAY_HOURS || 0), 0), 72);
  if (delayHours > 0) {
    message.scheduledAt = new Date(Date.now() + delayHours * 3600 * 1000).toISOString();
  }

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        "api-key": process.env.BREVO_API_KEY
      },
      body: JSON.stringify(message)
    });
    if (!res.ok) throw new Error("Brevo " + res.status + " " + (await res.text()).slice(0, 300));
    console.log(`post-purchase: survey ${delayHours ? "scheduled" : "sent"} for order ${payload.data && payload.data.id}`);
    return reply(200, { ok: true });
  } catch (e) {
    /* A non-2xx makes Lemon Squeezy retry, which is what we want when Brevo
       is briefly down. */
    console.error("post-purchase:", e.message);
    return reply(502, { error: e.message });
  }
};
