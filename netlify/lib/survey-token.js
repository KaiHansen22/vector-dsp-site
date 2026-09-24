/* Signed survey links.

   The link in the post-purchase email carries the buyer's email plus an HMAC
   of it, so /api/survey only accepts answers from people we actually emailed —
   no login, and nobody can fill the tracker with junk by guessing URLs.

   Key: SURVEY_SECRET if set, otherwise LEMONSQUEEZY_WEBHOOK_SECRET (already
   required by the webhook), so there is nothing new to configure. Changing the
   key invalidates links already sent. */

const crypto = require("crypto");

function key() {
  return process.env.SURVEY_SECRET || process.env.LEMONSQUEEZY_WEBHOOK_SECRET || "";
}

function b64url(s) {
  return Buffer.from(s, "utf8").toString("base64")
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function mac(email, k) {
  return crypto.createHmac("sha256", k).update("survey:" + email).digest("hex").slice(0, 32);
}

function signSurveyToken(email) {
  const k = key();
  if (!k) throw new Error("SURVEY_SECRET / LEMONSQUEEZY_WEBHOOK_SECRET is not set");
  const e = String(email).trim().toLowerCase();
  return b64url(e) + "." + mac(e, k);
}

/* Returns the email the token was issued for, or null. */
function verifySurveyToken(token) {
  const k = key();
  if (!k || typeof token !== "string") return null;
  const dot = token.lastIndexOf(".");
  if (dot < 1) return null;
  let email;
  try {
    email = Buffer.from(token.slice(0, dot).replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
  } catch { return null; }
  const a = Buffer.from(token.slice(dot + 1), "utf8");
  const b = Buffer.from(mac(email, k), "utf8");
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  return email;
}

/* Stable, non-reversible storage key: one response per buyer, resubmits overwrite. */
function responseKey(email) {
  return crypto.createHash("sha256").update(String(email).toLowerCase()).digest("hex").slice(0, 24);
}

function surveyUrl(email, firstName) {
  const q = new URLSearchParams({ t: signSurveyToken(email) });
  if (firstName) q.set("n", firstName);
  return "https://vector-dsp.com/survey?" + q.toString();
}

module.exports = { signSurveyToken, verifySurveyToken, responseKey, surveyUrl };
