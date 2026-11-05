/* ─────────────────────────────────────────────────────────────────────────────
   Black Friday 2026: ToneLab $49.99 (list $73.99), Sat Nov 21 → Tue Dec 1.

   Switches itself on and off by date, so nothing needs deploying when the
   sale starts or ends. The price is enforced by the Lemon Squeezy code
   BLACKFRIDAY (fixed $24 off, same date window); this script only shows the
   sale and adds the code to checkout links.

   Preview any time with ?bf=1 on a page that loads this file.
   After the sale: delete this file and its <script> tags (or leave it; it
   does nothing outside the window).
   ──────────────────────────────────────────────────────────────────────────── */
(function () {
  var START = Date.parse("2026-11-21T00:00:00-07:00");
  var END   = Date.parse("2026-12-02T00:00:00-07:00"); // end of Tue Dec 1, Mountain
  var CODE  = "BLACKFRIDAY";
  var LIST  = "73.99";
  var SALE  = "49.99";

  var now = Date.now();
  var preview = /[?&]bf=1\b/.test(location.search);
  if (!preview && (now < START || now >= END)) return;

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    /* 1. Checkout links carry the code. */
    var links = document.querySelectorAll('a[href*="lemonsqueezy.com/checkout/buy/"]');
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      var href = a.getAttribute("href");
      if (/discount_code/.test(href)) continue;
      a.setAttribute("href", href + (href.indexOf("?") < 0 ? "?" : "&") +
        "checkout%5Bdiscount_code%5D=" + CODE);
      a.innerHTML = a.innerHTML.replace("$" + LIST, "$" + SALE);
    }

    /* 2. Bar under the fixed nav. */
    var css = document.createElement("style");
    css.textContent =
      ".bf-bar{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:8px 18px;" +
      "padding:11px 20px;text-decoration:none;position:relative;z-index:5;" +
      "background:linear-gradient(90deg,#0B0D11 0%,#171226 42%,#0e1c2b 70%,#0B0D11 100%);" +
      "border-bottom:1px solid rgba(255,255,255,0.07);font-family:'Barlow','Segoe UI',Arial,sans-serif;}" +
      ".bf-bar .bf-tag{font-family:'Barlow Condensed','Arial Narrow',Arial,sans-serif;font-weight:700;font-size:14px;" +
      "letter-spacing:0.3em;text-transform:uppercase;color:#4DFFEC;}" +
      ".bf-bar .bf-txt{font-size:15px;color:rgba(237,240,244,0.75);}" +
      ".bf-bar s{color:#5A6070;text-decoration-color:rgba(255,107,107,0.8);}" +
      ".bf-bar strong{color:#EDF0F4;font-weight:700;}" +
      ".bf-bar .bf-cta{display:inline-block;padding:6px 16px;background:#00C2FF;color:#0B0D11;" +
      "font-family:'Barlow Condensed','Arial Narrow',Arial,sans-serif;font-weight:700;font-size:13px;" +
      "letter-spacing:0.14em;text-transform:uppercase;}" +
      ".bf-bar:hover .bf-cta{background:#33CEFF;}" +
      "@media (max-width:640px){.bf-bar{padding:10px 14px;gap:4px 10px}.bf-bar .bf-txt{font-size:13px}" +
      ".bf-bar .bf-tag{font-size:12px;letter-spacing:0.18em}}";
    document.head.appendChild(css);

    var nav = document.querySelector("nav");
    var bar = document.createElement("a");
    bar.className = "bf-bar";
    bar.href = "/tonelab";
    bar.innerHTML =
      '<span class="bf-tag">Black Friday</span>' +
      '<span class="bf-txt">ToneLab <s>$' + LIST + '</s> <strong>$' + SALE + '</strong> · through Dec 1</span>' +
      '<span class="bf-cta">Get ToneLab →</span>';
    if (nav && getComputedStyle(nav).position === "fixed") {
      bar.style.marginTop = nav.offsetHeight + "px";
      nav.parentNode.insertBefore(bar, nav.nextSibling);
    } else if (nav) {
      nav.parentNode.insertBefore(bar, nav.nextSibling);
    } else {
      document.body.insertBefore(bar, document.body.firstChild);
    }

    /* 3. Price displays. */
    // ToneLab hero card
    var amt = document.querySelector(".preorder-price-now .amount");
    if (amt) {
      amt.textContent = SALE.split(".")[0];
      var was = document.createElement("span");
      was.className = "preorder-price-retail";
      was.textContent = "$" + LIST;
      var row = amt.closest(".preorder-price-row");
      if (row) row.insertBefore(was, row.firstChild);
      var badge = document.querySelector(".preorder-badge");
      if (badge) badge.textContent = "Black Friday · Through Dec 1";
    }
    // Pricing page card
    var pn = document.querySelector(".price-row .price-now");
    if (pn) {
      pn.innerHTML = '<span class="currency">$</span>' + SALE.split(".")[0] +
        '<span class="cents">.' + SALE.split(".")[1] + "</span>";
      var w = document.createElement("span");
      w.className = "price-was";
      w.textContent = "$" + LIST;
      pn.parentNode.insertBefore(w, pn);
      var terms = document.querySelector(".price-terms");
      if (terms) {
        var note = document.createElement("div");
        note.className = "sale-note";
        note.textContent = "Black Friday · Save $24 through Dec 1";
        terms.parentNode.insertBefore(note, terms.nextSibling);
      }
    }
    // Inline "$73.99" mentions in visible copy (e.g. ToneLab bottom CTA)
    var spans = document.querySelectorAll("section span, section p");
    for (var j = 0; j < spans.length; j++) {
      var el = spans[j];
      if (el.closest(".bf-bar, .preorder-price-row, .price-row")) continue; // already handled above
      if (el.children.length === 0 && el.textContent.trim() === "$" + LIST) {
        el.innerHTML = '<s style="opacity:0.6">$' + LIST + "</s> $" + SALE;
      }
    }
  });
})();
