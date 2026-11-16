/* ─────────────────────────────────────────────────────────────────────────────
   Scheduled: Black Friday 2026 switchover for people already mid-sequence in
   the Brevo "Demo Download Follow-up Series" (welcome → wait 5 days → reminder).

   Runs at 00:05 MT on Sat Nov 21 and Wed Dec 2 (schedule in netlify.toml);
   on any other day it does nothing.

   Nov 21 (sale starts): contacts who joined the demo list in the last 5 days
     still have their reminder coming. Swap their personal 10% code for
     BLACKFRIDAY so the reminder shows $49.99 instead of $66.59.

   Dec 2 (sale over): contacts who joined in the last 5 days have BLACKFRIDAY
     but their reminder lands after the sale. Give them a personal 10% code
     that expires 7 days after they signed up, so the reminder is accurate.

   Uses the same env vars as demo-signup.js. Logs every change.
   ──────────────────────────────────────────────────────────────────────────── */

const { SALE_CODE, SALE_START, SALE_END, createCode, brevoHeaders } = require("./demo-signup.js");

const DAY = 86400 * 1000;
const REMINDER_DELAY_DAYS = 5; // "Wait 5 days" step in the Brevo automation
const CODE_DAYS = Number(process.env.DEMO_DISCOUNT_DAYS || 7);

async function demoContacts(listId) {
  const out = [];
  for (let offset = 0; ; offset += 500) {
    const res = await fetch(
      `https://api.brevo.com/v3/contacts/lists/${listId}/contacts?limit=500&offset=${offset}`,
      { headers: brevoHeaders() }
    );
    if (!res.ok) throw new Error("Brevo list " + res.status + " " + (await res.text()).slice(0, 200));
    const page = await res.json();
    out.push(...(page.contacts || []));
    if (!page.contacts || page.contacts.length < 500) break;
  }
  return out;
}

async function setCode(email, code) {
  const res = await fetch("https://api.brevo.com/v3/contacts/" + encodeURIComponent(email), {
    method: "PUT", headers: brevoHeaders(),
    body: JSON.stringify({ attributes: { DEMO_CODE: code } })
  });
  if (!res.ok) throw new Error("Brevo update " + res.status + " " + (await res.text()).slice(0, 200));
}

function phaseFor(now) {
  if (now >= SALE_START && now < SALE_START + DAY) return "start";
  if (now >= SALE_END && now < SALE_END + DAY) return "end";
  return null;
}

async function run(now = Date.now()) {
  const phase = phaseFor(now);
  if (!phase) {
    console.log("demo-sale-switch: not a switchover day — nothing to do");
    return { phase: null, changed: 0 };
  }
  const listId = Number(process.env.BREVO_DEMO_LIST_ID);
  if (!listId || !process.env.BREVO_API_KEY) throw new Error("BREVO_DEMO_LIST_ID or BREVO_API_KEY not set");

  const since = now - REMINDER_DELAY_DAYS * DAY; // reminder not sent yet
  const contacts = await demoContacts(listId);
  let changed = 0, failed = 0;

  for (const c of contacts) {
    const created = Date.parse(c.createdAt);
    if (!(created >= since)) continue;
    const code = (c.attributes && c.attributes.DEMO_CODE) || null;
    try {
      if (phase === "start" && code !== SALE_CODE) {
        await setCode(c.email, SALE_CODE);
        console.log(`demo-sale-switch: ${c.email} ${code || "(none)"} → ${SALE_CODE}`);
        changed++;
      } else if (phase === "end" && code === SALE_CODE) {
        const fresh = await createCode(c.email, new Date(created + CODE_DAYS * DAY));
        if (!fresh) throw new Error("code creation failed");
        await setCode(c.email, fresh);
        console.log(`demo-sale-switch: ${c.email} ${SALE_CODE} → ${fresh}`);
        changed++;
      }
    } catch (e) {
      failed++;
      console.error(`demo-sale-switch: ${c.email} failed: ${e.message}`);
    }
  }
  console.log(`demo-sale-switch: ${phase} — ${changed} changed, ${failed} failed, ${contacts.length} on list`);
  return { phase, changed, failed };
}

exports.run = run;
exports.handler = async () => {
  try {
    await run();
    return { statusCode: 200 };
  } catch (e) {
    console.error("demo-sale-switch:", e.message);
    return { statusCode: 500 };
  }
};
