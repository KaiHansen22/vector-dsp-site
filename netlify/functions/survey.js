/* ─────────────────────────────────────────────────────────────────────────────
   /api/survey — stores answers from the post-purchase survey page.

   Accepts only signed tokens (see netlify/lib/survey-token.js), so answers are
   always tied to a real buyer. Stored in Netlify Blobs (store "survey"), one
   entry per buyer; the private tracker reads them through /api/metrics.
   ──────────────────────────────────────────────────────────────────────────── */

const { getStore, connectLambda } = require("@netlify/blobs");
const { verifySurveyToken, responseKey } = require("../lib/survey-token.js");

const MAX = 2000; // characters per answer

function reply(status, body) {
  return {
    statusCode: status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
    body: JSON.stringify(body)
  };
}

const clean = (v) => String(v == null ? "" : v).replace(/\r\n/g, "\n").trim().slice(0, MAX);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return reply(405, { error: "POST required" });

  let body;
  try { body = JSON.parse(event.body || "{}"); }
  catch { return reply(400, { error: "Invalid request" }); }

  /* Two kinds of link reach this form:
       t=<signed token>  the automatic post-purchase email (verified buyer)
       e=<email>         a Brevo campaign, which can't sign per-recipient links.
     Campaign answers are stored but marked unverified, and can never overwrite
     an answer that came through a signed link. */
  let email = verifySurveyToken(body.t);
  let verified = !!email;
  if (!email && body.e) {
    const e = String(body.e).trim().replace(/ /g, "+").toLowerCase(); // "+" arrives as a space if unencoded
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && e.length <= 254) email = e;
  }
  if (!email) return reply(403, { error: "This survey link isn't valid. Reply to the email instead — it reaches Kai directly." });

  const answers = {
    found: clean(body.found),
    interest: clean(body.interest),
    future: clean(body.future)
  };
  if (!answers.found && !answers.interest && !answers.future) {
    return reply(400, { error: "Answer at least one question." });
  }

  try {
    connectLambda(event);
    const store = getStore("survey");
    const k = responseKey(email);
    const prev = await store.get(k, { type: "json" });
    if (prev && prev.verified && !verified) return reply(200, { ok: true });
    await store.setJSON(k, {
      email,
      name: clean(body.n).slice(0, 80),
      answers,
      verified,
      firstSubmittedAt: (prev && prev.firstSubmittedAt) || new Date().toISOString(),
      submittedAt: new Date().toISOString()
    });
    return reply(200, { ok: true });
  } catch (e) {
    console.error("survey store:", e.message);
    return reply(500, { error: "Couldn't save that — please try again, or reply to the email." });
  }
};
