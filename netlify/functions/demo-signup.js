/* ─────────────────────────────────────────────────────────────────────────────
   /api/demo-signup — email gate in front of the ToneLab demo download.

   Adds the address to a dedicated Brevo "demo downloads" list, kept separate
   from the waitlist (list 6, via subscribe.js) and from buyers (the purchases
   list, via post-purchase.js). When a demo user later buys, post-purchase.js
   moves them off this list, so a follow-up sequence aimed here never pitches a
   discount to someone who has already paid.

   Required env vars (Netlify → Site configuration → Environment variables):
     BREVO_API_KEY          already set
     BREVO_DEMO_LIST_ID     numeric ID of the "Demo downloads" list in Brevo
                            (Contacts → Lists; the ID column)

   The page reveals the download links whatever this returns — a Brevo outage
   must never cost us a download — so errors here are logged, not surfaced.
   ──────────────────────────────────────────────────────────────────────────── */

function reply(status, body) {
  return {
    statusCode: status,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body)
  };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return reply(405, { error: "POST required" });

  let email, platform;
  try {
    const body = JSON.parse(event.body || "{}");
    email = String(body.email || "").trim().toLowerCase();
    platform = String(body.platform || "");
    /* Honeypot: a hidden field real visitors never fill. Pretend success so
       bots don't learn to skip it. */
    if (body.company) return reply(200, { ok: true });
  } catch {
    return reply(400, { error: "Invalid request body" });
  }

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return reply(400, { error: "Please enter a valid email address." });
  }

  const listId = Number(process.env.BREVO_DEMO_LIST_ID);
  if (!listId || !process.env.BREVO_API_KEY) {
    console.error("demo-signup: BREVO_DEMO_LIST_ID or BREVO_API_KEY not set");
    return reply(500, { error: "Server misconfigured" });
  }

  try {
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        "api-key": process.env.BREVO_API_KEY
      },
      /* updateEnabled: an existing contact (e.g. on the waitlist) is added to
         the demo list without being removed from anything else. */
      body: JSON.stringify({ email, listIds: [listId], updateEnabled: true })
    });
    if (!res.ok) throw new Error("Brevo " + res.status + " " + (await res.text()).slice(0, 300));
    console.log("demo-signup: added to demo list " + listId + (platform ? " (" + platform + ")" : ""));
    return reply(200, { ok: true });
  } catch (e) {
    console.error("demo-signup:", e.message);
    return reply(502, { error: "Could not save email" });
  }
};
