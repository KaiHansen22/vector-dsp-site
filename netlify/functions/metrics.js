/* ─────────────────────────────────────────────────────────────────────────────
   /api/metrics — the only place the Lemon Squeezy key is ever read.

   Sources:
     · Lemon Squeezy API  → orders, revenue, refunds, discount usage
     · GitHub Releases API → demo download counts per installer asset

   The key lives in a Netlify environment variable and never reaches a browser.
   The edge function already gates this path; this checks the session cookie
   again anyway, because "it can only be reached through the gated path" is an
   assumption that survives exactly until someone edits netlify.toml.
   ──────────────────────────────────────────────────────────────────────────── */

const crypto = require("crypto");

const COOKIE = "vdsp_dash";
const REPO = "KaiHansen22/vector-dsp-site";
const LS_API = "https://api.lemonsqueezy.com/v1";
const PAGE_SIZE = 100;   // Lemon Squeezy's maximum
const MAX_PAGES = 20;    // 2000 orders; far beyond current volume, bounded anyway

function json(body, status) {
  return {
    statusCode: status || 200,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
      "x-robots-tag": "noindex, nofollow"
    },
    body: JSON.stringify(body)
  };
}

/* Returns null when the request is good, or a {status, error} to send back.
   Distinguishing "not configured" from "bad session" matters: the first is a
   setup problem the dashboard should name out loud, the second is normal. */
function refuse(event) {
  const password = process.env.DASHBOARD_PASSWORD;
  if (!password) {
    return { status: 503, error: "DASHBOARD_PASSWORD is not set for functions on this site" };
  }

  const raw = (event.headers.cookie || event.headers.Cookie || "")
    .split(";").map((c) => c.trim())
    .find((c) => c.startsWith(COOKIE + "="));
  if (!raw) return { status: 401, error: "no session cookie reached the function" };

  const token = raw.slice(COOKIE.length + 1);
  const dot = token.indexOf(".");
  if (dot === -1) return { status: 401, error: "malformed session cookie" };

  const exp = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!/^\d+$/.test(exp)) return { status: 401, error: "malformed session cookie" };
  if (Number(exp) < Date.now()) return { status: 401, error: "session expired" };

  const expected = crypto.createHmac("sha256", password).update(exp).digest("hex");
  const a = Buffer.from(sig, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return { status: 401, error: "session signature did not verify — DASHBOARD_PASSWORD may differ between the edge function and this function" };
  }
  return null;
}

async function ls(path, key) {
  const res = await fetch(LS_API + path, {
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      Authorization: "Bearer " + key
    }
  });
  if (!res.ok) {
    throw new Error("Lemon Squeezy " + res.status + " on " + path);
  }
  return res.json();
}

/* Orders come back paginated. Walk until a short page arrives or the cap hits —
   never "while (true)" against someone else's API. */
async function allOrders(key, storeId) {
  const out = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    const qs = `?filter[store_id]=${storeId}&page[size]=${PAGE_SIZE}&page[number]=${page}`;
    const body = await ls("/orders" + qs, key);
    const rows = (body && body.data) || [];
    out.push(...rows);
    if (rows.length < PAGE_SIZE) break;
  }
  return out;
}

async function githubDownloads() {
  const headers = { Accept: "application/vnd.github+json", "User-Agent": "vector-dsp-metrics" };
  /* Optional. Unauthenticated GitHub allows 60 requests/hour per IP and Netlify
     egress IPs are shared, so a token is worth setting if this ever 403s. */
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = "Bearer " + process.env.GITHUB_TOKEN;
  }

  const res = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=100`, { headers });
  if (!res.ok) throw new Error("GitHub " + res.status);
  const releases = await res.json();

  const assets = [];
  let total = 0, mac = 0, windows = 0;

  for (const rel of releases) {
    for (const a of rel.assets || []) {
      const count = a.download_count || 0;
      total += count;
      const name = a.name || "";
      if (/\.(pkg|dmg)$/i.test(name)) mac += count;
      else if (/windows|\.exe$|\.msi$/i.test(name) || /\.zip$/i.test(name)) windows += count;
      assets.push({ release: rel.tag_name, name: name, downloads: count });
    }
  }
  assets.sort((x, y) => y.downloads - x.downloads);
  return { total, mac, windows, assets };
}

function summariseOrders(rows) {
  const now = Date.now();
  const day = 86400000;
  let paid = 0, refunded = 0, grossCents = 0, refundedCents = 0, discountCents = 0;
  let last7 = 0, last30 = 0;
  const series = {};

  for (const row of rows) {
    const a = row.attributes || {};
    if (a.test_mode) continue;                 // test orders are not revenue

    const cents = Number(a.total_usd || a.total || 0);
    const created = Date.parse(a.created_at);

    if (a.refunded) {
      refunded++;
      refundedCents += cents;
    } else {
      paid++;
      grossCents += cents;
      discountCents += Number(a.discount_total_usd || a.discount_total || 0);
      if (now - created < 7 * day) last7++;
      if (now - created < 30 * day) last30++;
      const key = new Date(created).toISOString().slice(0, 10);
      series[key] = (series[key] || 0) + 1;
    }
  }

  return {
    paid, refunded,
    grossUsd: grossCents / 100,
    refundedUsd: refundedCents / 100,
    discountUsd: discountCents / 100,
    last7, last30,
    daily: Object.keys(series).sort().map((d) => ({ date: d, orders: series[d] }))
  };
}

exports.handler = async (event) => {
  const denied = refuse(event);
  if (denied) return json({ error: denied.error }, denied.status);

  const key = process.env.LEMONSQUEEZY_API_KEY;
  const result = { generatedAt: new Date().toISOString(), errors: [] };

  /* One source failing must not blank the whole dashboard — report per source
     and render whatever did come back. */
  if (!key) {
    result.errors.push("LEMONSQUEEZY_API_KEY is not set");
  } else {
    try {
      const stores = await ls("/stores", key);
      const store = (stores.data || [])[0];
      if (!store) throw new Error("no store on this Lemon Squeezy account");
      result.store = (store.attributes && store.attributes.name) || null;
      result.sales = summariseOrders(await allOrders(key, store.id));
    } catch (e) {
      result.errors.push("Lemon Squeezy: " + e.message);
    }
  }

  try {
    result.downloads = await githubDownloads();
  } catch (e) {
    result.errors.push("GitHub: " + e.message);
  }

  if (result.sales && result.downloads && result.downloads.total > 0) {
    result.conversionRate = result.sales.paid / result.downloads.total;
  }

  return json(result);
};
