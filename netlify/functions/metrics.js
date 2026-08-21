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
const ADS_API = "https://api.ads.openai.com/v1";
const ADS_WINDOW_DAYS = 30;
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

/* ── OpenAI Ads ───────────────────────────────────────────────────────────
   Two calls. GET /ad_account/insights gives spend and delivery per campaign;
   conversions live on a separate POST endpoint and have to be merged back in
   by campaign id. The ad account is implicit in the key, so nothing else
   identifies it. Only impressions/clicks/spend are requested — CTR and CPC are
   derived here rather than trusting field names that were not verified. */
async function adsInsights(key) {
  /* The API rejects anything that is not a full-hour unix timestamp in the ad
     account's timezone (America/Denver): "minute and second must be 0".
     Denver is a whole-hour offset from UTC, so flooring to the hour in UTC
     lands on a full hour there too. A half-hour-offset account timezone —
     India, Newfoundland — would need the offset applied first. */
  const HOUR = 3600;
  const end = Math.floor(Date.now() / 1000 / HOUR) * HOUR;
  const start = end - ADS_WINDOW_DAYS * 86400;
  const range = JSON.stringify({ type: "unix_range", start: start, end: end });

  const params = new URLSearchParams();
  params.append("time_granularity", "none");     // one row per campaign, whole window
  params.append("aggregation_level", "campaign");
  ["campaign.id", "campaign.name", "campaign.impressions", "campaign.clicks", "campaign.spend"]
    .forEach((f) => params.append("fields[]", f));
  params.append("time_ranges[]", range);

  const res = await fetch(ADS_API + "/ad_account/insights?" + params.toString(), {
    headers: { Authorization: "Bearer " + key }
  });
  if (!res.ok) throw new Error("insights " + res.status + " " + (await res.text()).slice(0, 200));
  const rows = (await res.json()).data || [];

  const byId = {};
  let impressions = 0, clicks = 0, spend = 0;
  for (const r of rows) {
    const id = r.campaign_id || r.id;
    const row = byId[id] || (byId[id] = {
      id: id, name: r.campaign_name || id, impressions: 0, clicks: 0, spend: 0, conversions: null
    });
    row.impressions += Number(r.impressions || 0);
    row.clicks += Number(r.clicks || 0);
    row.spend += Number(r.spend || 0);
    impressions += Number(r.impressions || 0);
    clicks += Number(r.clicks || 0);
    spend += Number(r.spend || 0);
  }

  /* Conversions are a separate endpoint. If it fails, delivery numbers are
     still worth showing — conversions stay null and the page says so. */
  let conversions = null;
  const ids = Object.keys(byId);
  if (ids.length) {
    try {
      const cres = await fetch(ADS_API + "/conversions/insights", {
        method: "POST",
        headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
        body: JSON.stringify({
          aggregation_level: "campaign",
          time_ranges: [range],
          entity_ids: ids
        })
      });
      if (cres.ok) {
        conversions = 0;
        for (const c of (await cres.json()).data || []) {
          const row = byId[c.entity_id];
          const n = Number(c.conversions || 0);
          if (row) row.conversions = (row.conversions || 0) + n;
          conversions += n;
        }
      }
    } catch (e) { /* delivery data still renders */ }
  }

  return {
    windowDays: ADS_WINDOW_DAYS,
    impressions: impressions,
    clicks: clicks,
    spend: spend,
    conversions: conversions,
    campaigns: Object.keys(byId).map((k) => byId[k]).sort((a, b) => b.spend - a.spend)
  };
}

function summariseOrders(rows) {
  const now = Date.now();
  const day = 86400000;
  let paid = 0, comped = 0, refunded = 0;
  let grossCents = 0, refundedCents = 0, discountCents = 0;
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
      continue;
    }

    /* A fully discounted order is a comped licence, not a sale. Lemon Squeezy
       records it as an order like any other, so counting rows would overstate
       both revenue and the download-to-sale rate. Beta testers were given free
       licences, so these are expected — they are just not customers. */
    if (cents === 0) {
      comped++;
      continue;
    }

    paid++;
    grossCents += cents;
    discountCents += Number(a.discount_total_usd || a.discount_total || 0);
    if (now - created < 7 * day) last7++;
    if (now - created < 30 * day) last30++;
    const key = new Date(created).toISOString().slice(0, 10);
    series[key] = (series[key] || 0) + 1;
  }

  return {
    paid, comped, refunded,
    grossUsd: grossCents / 100,
    refundedUsd: refundedCents / 100,
    /* Discounts on paying orders only. Rolling the 100%-off comps in here
       would report the full list price of every free licence as a "discount". */
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

  /* Optional. Without the key the page falls back to hand-entered ad figures. */
  if (process.env.OPENAI_ADS_API_KEY) {
    try {
      result.ads = await adsInsights(process.env.OPENAI_ADS_API_KEY);
    } catch (e) {
      result.errors.push("OpenAI Ads: " + e.message);
    }
  }

  if (result.sales && result.downloads && result.downloads.total > 0) {
    result.conversionRate = result.sales.paid / result.downloads.total;
  }

  return json(result);
};
