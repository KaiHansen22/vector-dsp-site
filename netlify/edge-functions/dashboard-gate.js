/* ─────────────────────────────────────────────────────────────────────────────
   Password gate for the private metrics dashboard.

   Netlify's built-in visitor password is a paid-plan feature and applies to the
   whole site, which is wrong twice over — vector-dsp.com must stay public. This
   edge function gates two paths and nothing else.

   It covers /api/metrics as well as the page. Gating only the page would be
   theatre: the page is markup, the function behind it is where the revenue
   data actually flows, and an ungated endpoint can just be curled.

   The token is an expiry stamp plus an HMAC of that stamp keyed by the
   password, so the cookie carries no secret, cannot be extended by the holder,
   and dies on its own after SESSION_HOURS.

   This is a shared-password gate, not authentication. Right tool for one
   person's private numbers; wrong tool for anything belonging to a customer.
   ──────────────────────────────────────────────────────────────────────────── */

const COOKIE = "vdsp_dash";
const SESSION_HOURS = 12;

function html(body, status) {
  return new Response(body, {
    status: status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex, nofollow"
    }
  });
}

async function hmac(secret, message) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0")).join("");
}

/* Compare digests rather than raw strings so the comparison time doesn't
   depend on how many leading characters happened to match. */
async function sameSecret(a, b) {
  const enc = new TextEncoder();
  const [da, db] = await Promise.all([
    crypto.subtle.digest("SHA-256", enc.encode(a || "")),
    crypto.subtle.digest("SHA-256", enc.encode(b || ""))
  ]);
  const x = new Uint8Array(da), y = new Uint8Array(db);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}

async function mintToken(password) {
  const exp = String(Date.now() + SESSION_HOURS * 3600 * 1000);
  return exp + "." + (await hmac(password, exp));
}

async function tokenValid(token, password) {
  if (!token || token.indexOf(".") === -1) return false;
  const [exp, sig] = token.split(".");
  if (!/^\d+$/.test(exp) || Number(exp) < Date.now()) return false;
  return await sameSecret(sig, await hmac(password, exp));
}

function loginPage(message) {
  return `<!DOCTYPE html><html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>ToneLab Tracker</title>
<link rel="icon" href="/favicon.ico">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Barlow:wght@300;400&display=swap" rel="stylesheet">
<style>
  /* Same values as index.html so the gate is unmistakably the same site. */
  :root{--bg:#0B0D11;--surface:#13161D;--line:rgba(255,255,255,0.07);
        --purple:#9B6DFF;--cyan:#00C2FF;--white:#EDF0F4;--muted:#5A6070}
  *{box-sizing:border-box}
  body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;
       background:var(--bg);color:var(--white);font-family:'Barlow','Segoe UI',Arial,sans-serif;padding:24px}
  form{background:var(--surface);border:1px solid var(--line);border-radius:8px;
       padding:34px;width:100%;max-width:360px}
  h1{font-family:'Barlow Condensed','Arial Narrow',sans-serif;font-weight:800;font-size:30px;
     letter-spacing:0.03em;text-transform:uppercase;margin:0 0 20px;line-height:1}
  h1 .tone{color:#EDF0F4} h1 .lab{color:var(--cyan)}
  input{width:100%;padding:13px 14px;background:#0B0D11;color:var(--white);
        border:1px solid var(--line);border-radius:5px;font-size:16px;margin-bottom:14px}
  input:focus{outline:none;border-color:var(--purple)}
  button{width:100%;padding:13px;background:var(--cyan);color:#06080B;border:0;
         border-radius:5px;font-family:'Barlow Condensed','Arial Narrow',sans-serif;
         font-size:16px;font-weight:700;letter-spacing:0.14em;
         text-transform:uppercase;cursor:pointer}
  button:hover{background:#33CEFF}
  .err{color:#FF6B6B;font-size:13px;margin:0 0 14px}
  .note{color:var(--muted);font-size:12px;margin:16px 0 0;line-height:1.6}
</style></head><body>
<form method="POST">
  <h1><span class="tone">Tone</span><span class="lab">Lab</span></h1>
  ${message ? `<p class="err">${message}</p>` : ""}
  <input type="password" name="password" placeholder="Password" autofocus autocomplete="current-password" required>
  <button type="submit">Enter</button>
  <p class="note">Vector DSP internal metrics. Nothing here is public.</p>
</form></body></html>`;
}

export default async (request, context) => {
  const password = Netlify.env.get("DASHBOARD_PASSWORD");

  /* Fail closed. A missing env var must never mean "let everyone in". */
  if (!password) {
    return html(loginPage("DASHBOARD_PASSWORD is not set on this site."), 503);
  }

  const url = new URL(request.url);

  if (request.method === "POST") {
    const form = await request.formData();
    if (await sameSecret(form.get("password"), password)) {
      const token = await mintToken(password);
      return new Response("", {
        status: 303,
        headers: {
          location: url.pathname,
          "cache-control": "no-store",
          "set-cookie":
            `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_HOURS * 3600}`
        }
      });
    }
    return html(loginPage("Incorrect password."), 401);
  }

  const cookie = (request.headers.get("cookie") || "")
    .split(";").map((c) => c.trim())
    .find((c) => c.startsWith(COOKIE + "="));
  const token = cookie ? cookie.slice(COOKIE.length + 1) : "";

  if (await tokenValid(token, password)) {
    return context.next();
  }

  /* An expired or absent session on the JSON endpoint should read as a status
     code, not as a login page the fetch would try to parse. */
  if (url.pathname.startsWith("/api/metrics")) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json", "cache-control": "no-store" }
    });
  }

  return html(loginPage(""), 401);
};
