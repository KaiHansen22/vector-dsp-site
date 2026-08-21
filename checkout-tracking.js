/* ─────────────────────────────────────────────────────────────────────────────
   Vector DSP — checkout overlay + purchase measurement
   Loaded on every page that carries a Lemon Squeezy buy button.

   Why this file exists: the sale completes on Lemon Squeezy's domain, so a
   pixel on vector-dsp.com cannot see it. Opening the checkout as a Lemon.js
   overlay keeps the buyer on our page, which means Lemon.js can hand us a
   Checkout.Success event with the real order total the moment payment clears.
   That is the only place `order_created` is measured.

   Three details the OpenAI pixel is strict about, all easy to get wrong:
     · Event names must come from the standard taxonomy. It is `order_created`,
       NOT `purchase` — a non-standard name cannot be selected as a base event
       when building a custom conversion.
     · Commerce events take `type: "contents"`. `customer_action` is for
       lead/registration events and `plan_enrollment` is for trials/subs.
     · `amount` is in MINOR UNITS — $54.99 is 5499, not 54.99. Lemon Squeezy
       also reports money in cents, so order totals pass straight through with
       no division. Getting this wrong misreports revenue by 100×.

   Hard rule: measurement must never break a buy button. Every path below
   falls through to a plain navigation if anything is missing or throws.
   ──────────────────────────────────────────────────────────────────────────── */
(function () {
  "use strict";

  var CHECKOUT_MATCH = "lemonsqueezy.com/checkout";
  var LS_PRODUCT_ID = "913987";
  var PRODUCT_NAME = "ToneLab";

  function measure(name, payload) {
    try {
      if (window.oaiq) window.oaiq("measure", name, payload);
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

    /* No `amount` on purpose. The discounted total is not known until the
       checkout renders, and a hardcoded price here would silently go stale
       the moment a sale starts or ends. Revenue is reported on order_created,
       where it is exact. `amount` is optional; `currency` is only required
       when `amount` is present. */
    measure("checkout_started", {
      type: "contents",
      contents: [{
        id: LS_PRODUCT_ID,
        name: PRODUCT_NAME,
        content_type: "product",
        quantity: 1
      }]
    });

    if (openOverlay(href)) {
      e.preventDefault();
    }
    // else: no preventDefault — the link navigates to the hosted checkout as before.
  });

  /* ── Order created ────────────────────────────────────────────────────────
     Checkout.Success carries an Order object. Lemon Squeezy sends money as
     integer cents and the pixel wants minor units, so totals are passed
     through unchanged. total_usd is preferred over total in case the store
     ever sells in another currency. */
  function orderAmount(attrs) {
    if (!attrs) return null;
    var cents = typeof attrs.total_usd === "number" ? attrs.total_usd
              : typeof attrs.total === "number" ? attrs.total
              : null;
    if (cents === null || isNaN(cents)) return null;
    return Math.round(cents);
  }

  function orderContents(attrs) {
    var item = (attrs && attrs.first_order_item) || {};
    return [{
      id: String(item.product_id || LS_PRODUCT_ID),
      name: item.product_name || PRODUCT_NAME,
      content_type: "product",
      quantity: 1
    }];
  }

  function alreadyCounted(orderId) {
    if (!orderId) return false;
    try {
      var key = "vdsp_order_" + orderId;
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

      var payload = {
        type: "contents",
        contents: orderContents(attrs)
      };

      /* Only send amount when we actually have one — currency is required
         alongside it. A sale with an unknown value still beats a lost sale. */
      var amount = orderAmount(attrs);
      if (amount !== null) {
        payload.amount = amount;
        payload.currency = attrs.currency || "USD";
      }

      measure("order_created", payload);
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
