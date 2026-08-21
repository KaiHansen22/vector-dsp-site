/* ─────────────────────────────────────────────────────────────────────────────
   Vector DSP — checkout overlay + purchase measurement
   Loaded on every page that carries a Lemon Squeezy buy button.

   Why this file exists: the sale completes on Lemon Squeezy's domain, so a
   pixel on vector-dsp.com cannot see it. Opening the checkout as a Lemon.js
   overlay keeps the buyer on our page, which means Lemon.js can hand us a
   Checkout.Success event with the real order total the moment payment clears.
   That is the only place `purchase` is measured.

   Hard rule: measurement must never break a buy button. Every path below
   falls through to a plain navigation if anything is missing or throws.
   ──────────────────────────────────────────────────────────────────────────── */
(function () {
  "use strict";

  var CHECKOUT_MATCH = "lemonsqueezy.com/checkout";

  function measure(name, amount) {
    try {
      if (window.oaiq) {
        window.oaiq("measure", name, {
          type: "customer_action",
          amount: amount || 0,
          currency: "USD"
        });
      }
    } catch (e) {}
  }

  /* ── Open the checkout as an overlay ──────────────────────────────────────
     If Lemon.js has not loaded (blocked, offline, script error) we return
     false and let the browser follow the href exactly as it does today. */
  function openOverlay(href) {
    try {
      if (!window.LemonSqueezy || !window.LemonSqueezy.Url || !window.LemonSqueezy.Url.Open) {
        return false;
      }
      // embed=1 drops Lemon Squeezy's own header/footer inside the overlay.
      var url = href.indexOf("embed=1") > -1
        ? href
        : href + (href.indexOf("?") > -1 ? "&" : "?") + "embed=1";
      window.LemonSqueezy.Url.Open(url);
      return true;
    } catch (e) {
      return false;
    }
  }

  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
    if (!a) return;
    var href = a.getAttribute("href") || "";
    if (href.indexOf(CHECKOUT_MATCH) === -1) return;

    measure("checkout_started", 0);

    if (openOverlay(href)) {
      e.preventDefault();
    }
    // else: no preventDefault — the link navigates to the hosted checkout as before.
  });

  /* ── Purchase ─────────────────────────────────────────────────────────────
     Checkout.Success carries an Order object. Lemon Squeezy sends money as
     integer cents, so totals are divided by 100. total_usd is preferred over
     total in case the store ever sells in another currency. */
  function orderAmount(attrs) {
    var cents = null;
    if (attrs && typeof attrs.total_usd === "number") cents = attrs.total_usd;
    else if (attrs && typeof attrs.total === "number") cents = attrs.total;
    if (cents === null || isNaN(cents)) return null;
    return Math.round(cents) / 100;
  }

  function alreadyCounted(orderId) {
    if (!orderId) return false;
    try {
      var key = "vdsp_purchase_" + orderId;
      if (localStorage.getItem(key) === "1") return true;
      localStorage.setItem(key, "1");
    } catch (e) {}
    return false;
  }

  function onEvent(event) {
    try {
      if (!event || event.event !== "Checkout.Success") return;
      var data = event.data || {};
      var attrs = data.attributes || {};
      if (alreadyCounted(data.id)) return;

      var amount = orderAmount(attrs);
      /* If Lemon Squeezy ever stops sending a total, count the conversion
         rather than dropping it — a sale with an unknown value still beats
         a missing sale. */
      measure("purchase", amount === null ? 0 : amount);
    } catch (e) {}
  }

  /* Lemon.js is loaded with defer immediately before this file, so it is
     normally ready by now. The retry covers a slow or reordered load. */
  var tries = 0;
  (function setup() {
    try {
      if (window.LemonSqueezy && window.LemonSqueezy.Setup) {
        window.LemonSqueezy.Setup({ eventHandler: onEvent });
        return;
      }
    } catch (e) {}
    if (++tries < 40) setTimeout(setup, 250); // give up after ~10s
  })();
})();
