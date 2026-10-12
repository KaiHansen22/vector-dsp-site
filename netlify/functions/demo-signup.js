/* ─────────────────────────────────────────────────────────────────────────────
   /api/demo-signup — email gate in front of the ToneLab demo download.

   1. Gives the visitor their own discount code in Lemon Squeezy: 10% off,
      one redemption, expiring 7 days after signup (e.g. DEMO10K7F3QX).
   2. Adds them to the Brevo "demo downloads" list with that code saved on the
      contact as DEMO_CODE. The follow-up emails print {{ contact.DEMO_CODE }},
      so the "7 days" in the copy is enforced at checkout, and a code that gets
      shared stops working after one use.

   The list is kept separate from the waitlist (list 6, via subscribe.js) and
   from buyers (purchases list, via post-purchase.js). When a demo user buys,
   post-purchase.js takes them off this list.

   Someone signing up again (new browser, cleared storage) keeps the code they
   already have — re-signing must not restart the 7-day clock.

   Required env vars (Netlify → Site configuration → Environment variables):
     BREVO_API_KEY              already set
     BREVO_DEMO_LIST_ID         numeric ID of the "Demo downloads" list
     LEMONSQUEEZY_API_KEY       Lemon Squeezy → Settings → API → new key
   Optional:
     LEMONSQUEEZY_STORE_ID      default 324189
     LEMONSQUEEZY_VARIANT_ID    numeric ToneLab variant ID. If set, codes only
                                work on ToneLab; if unset, on anything in the
                                store (fine while ToneLab is the only product).
     DEMO_DISCOUNT_PERCENT      default 10
     DEMO_DISCOUNT_DAYS         default 7

   Brevo needs a text contact attribute named DEMO_CODE. The function creates
   it on first use if it's missing, so there's nothing to set up by hand.

   The page reveals the download links whatever this returns — a Brevo or
   Lemon Squeezy outage must never cost us a download — so failures here are
   logged, not surfaced.
   ──────────────────────────────────────────────────────────────────────────── */

const crypto = require("crypto");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/* No 0/O/1/I, so codes survive being read aloud or retyped. */
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function reply(status, body) {
  return {
    statusCode: status,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body)
  };
}

function brevoHeaders() {
  return {
    "content-type": "application/json",
    accept: "application/json",
    "api-key": process.env.BREVO_API_KEY
  };
}

function randomSuffix(n) {
  const bytes = crypto.randomBytes(n);
  let s = "";
  for (let i = 0; i < n; i++) s += ALPHABET[bytes[i] % ALPHABET.length];
  return s;
}

/* The code this contact was already given, if any. 404 = new contact. */
async function existingCode(email) {
  try {
    const res = await fetch("https://api.brevo.com/v3/contacts/" + encodeURIComponent(email), {
      headers: brevoHeaders()
    });
    if (!res.ok) return null;
    const c = await res.json();
    return (c.attributes && c.attributes.DEMO_CODE) || null;
  } catch {
    return null;
  }
}

/* Creates a single-use, expiring discount in Lemon Squeezy. Returns the code,
   or null if anything goes wrong (logged). */
async function createCode(email) {
  const key = process.env.LEMONSQUEEZY_API_KEY;
  if (!key) {
    console.warn("demo-signup: LEMONSQUEEZY_API_KEY not set — no personal code");
    return null;
  }
  const percent = Number(process.env.DEMO_DISCOUNT_PERCENT || 10);
  const days = Number(process.env.DEMO_DISCOUNT_DAYS || 7);
  const storeId = String(process.env.LEMONSQUEEZY_STORE_ID || "324189");
  const variantId = process.env.LEMONSQUEEZY_VARIANT_ID;
  const code = "DEMO" + percent + randomSuffix(6);

  const attributes = {
    name: "Demo " + percent + "% — " + email,
    code,
    amount: percent,
    amount_type: "percent",
    is_limited_redemptions: true,
    max_redemptions: 1,
    expires_at: new Date(Date.now() + days * 86400 * 1000).toISOString()
  };
  const relationships = { store: { data: { type: "stores", id: storeId } } };
  if (variantId) {
    attributes.is_limited_to_products = true;
    relationships.variants = { data: [{ type: "variants", id: String(variantId) }] };
  }

  try {
    const res = await fetch("https://api.lemonsqueezy.com/v1/discounts", {
      method: "POST",
      headers: {
        accept: "application/vnd.api+json",
        "content-type": "application/vnd.api+json",
        authorization: "Bearer " + key
      },
      body: JSON.stringify({ data: { type: "discounts", attributes, relationships } })
    });
    if (!res.ok) throw new Error("Lemon Squeezy " + res.status + " " + (await res.text()).slice(0, 300));
    return code;
  } catch (e) {
    console.error("demo-signup: code creation failed:", e.message);
    return null;
  }
}

function postContact(body) {
  return fetch("https://api.brevo.com/v3/contacts", {
    method: "POST", headers: brevoHeaders(), body: JSON.stringify(body)
  });
}

/* Creates the DEMO_CODE text attribute in Brevo. Harmless if it already
   exists (Brevo answers 400, which we ignore). */
async function ensureCodeAttribute() {
  try {
    const res = await fetch("https://api.brevo.com/v3/contacts/attributes/normal/DEMO_CODE", {
      method: "POST", headers: brevoHeaders(), body: JSON.stringify({ type: "text" })
    });
    console.log("demo-signup: create DEMO_CODE attribute → " + res.status);
  } catch (e) {
    console.error("demo-signup: create DEMO_CODE attribute failed:", e.message);
  }
}

async function addToList(email, listId, code) {
  const body = { email, listIds: [listId], updateEnabled: true };
  if (code) body.attributes = { DEMO_CODE: code };
  let res = await postContact(body);

  if (!res.ok && code) {
    /* Most likely the DEMO_CODE attribute doesn't exist yet: create it and
       try again. If that still fails, get them on the list without the code
       rather than losing the signup. */
    console.warn("demo-signup: Brevo rejected the contact with DEMO_CODE (" + res.status + " " +
      (await res.text()).slice(0, 200) + ") — creating attribute and retrying");
    await ensureCodeAttribute();
    res = await postContact(body);
    if (!res.ok) {
      console.error("demo-signup: still rejected (" + res.status + " " +
        (await res.text()).slice(0, 200) + ") — adding without the code");
      delete body.attributes;
      res = await postContact(body);
    }
  }
  if (!res.ok) throw new Error("Brevo " + res.status + " " + (await res.text()).slice(0, 300));
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return reply(405, { error: "POST required" });

  let email, platform;
  try {
    const body = JSON.parse(event.body || "{}");
    email = String(body.email || "").trim().toLowerCase();
    platform = String(body.platform || "");
    /* Honeypot: a hidden field real visitors never fill. Pretend success so
       bots don't learn to skip it (and don't mint discount codes). */
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
    const prior = await existingCode(email);
    const code = prior || (await createCode(email));
    /* Brevo may silently drop an attribute it doesn't know, so make sure it
       exists before saving a new code. One cheap call; a no-op once created. */
    if (code && !prior) await ensureCodeAttribute();
    await addToList(email, listId, code);
    console.log("demo-signup: added to demo list " + listId +
      (platform ? " (" + platform + ")" : "") +
      (code ? (prior ? " — kept code " : " — new code ") + code : " — no code"));
    return reply(200, { ok: true });
  } catch (e) {
    console.error("demo-signup:", e.message);
    return reply(502, { error: "Could not save email" });
  }
};
