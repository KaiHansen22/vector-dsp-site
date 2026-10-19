// Eleventy config for vector-dsp.com
// Existing HTML pages at the root are passed through unchanged.
// Only the /blog/ subdirectory is templated.

module.exports = function (eleventyConfig) {
  // ─── Passthrough existing static pages and assets ───
  // These ship to _site/ unchanged. Edit the same way you do today.
  const passthrough = [
    "index.html",
    "tonelab.html",
    "tonelab-buy.html",
    "thank-you.html", // post-purchase landing; Lemon Squeezy confirmation-modal button link
    "checkout-tracking.js", // Lemon.js overlay + purchase measurement
    "survey.html", // post-purchase survey form, linked from the survey email
    "dashboard.html", // private metrics tracker (password-gated at the edge)
    "pricing.html",
    "about.html",
    "privacy.html",
    "terms.html",
    "refunds.html",
    "favicon.ico",
    "favicon-32x32.png",
    "apple-touch-icon.png",
    "sundown-sale-1080.png",
    "kai-headphones.jpg",
    "kai-hansen.jpg",
    "tonelab-loop.mp4",
    "tonelab-loop.webm",
    "tonelab-loop-poster.jpg",
    "tonelab-walkthrough-poster.jpg", // click-to-load poster for the walkthrough embed
    "robots.txt",
    "llms.txt",
    "wall", // testimonial portraits
    "netlify", // Netlify functions + config dir
  ];
  passthrough.forEach((f) => eleventyConfig.addPassthroughCopy(f));

  // ─── Markdown: allow raw HTML in posts (BabyLoveGrowth often mixes both) ───
  eleventyConfig.amendLibrary("md", (md) => {
    md.set({ html: true, linkify: true });
  });

  // ─── Filters for templates ───
  eleventyConfig.addFilter("readableDate", (d) =>
    new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );

  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString());


  // ─── SEO helpers for BLG posts ───
  // BLG bodies start with their own "# Title", and post.njk already prints <h1>,
  // which gave every post two H1s. Strip the leading one from the body.
  eleventyConfig.addFilter("stripLeadingH1", (html) =>
    String(html || "").replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>\s*/i, "")
  );

  // BLG sends an empty description, so every post had a blank meta description.
  // Fall back to the first real paragraph of the post, trimmed to ~155 chars.
  eleventyConfig.addFilter("metaDescription", (desc, html) => {
    if (desc && String(desc).trim()) return String(desc).trim();
    const paras = String(html || "").match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
    for (const para of paras) {
      const text = para.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&")
        .replace(/&[a-z#0-9]+;/gi, " ").replace(/\s+/g, " ").trim();
      if (text.length < 80) continue;
      if (text.length <= 155) return text;
      const cut = text.slice(0, 155);
      return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\-–—]+$/, "") + "…";
    }
    return "";
  });

  // ─── Watch & ignore ───
  // Make sure node_modules and _site never get scanned as templates.
  eleventyConfig.ignores.add("node_modules");
  eleventyConfig.ignores.add("_site");
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("SETUP.md");
  eleventyConfig.ignores.add("TESTIMONIAL-OUTREACH.md");

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "blog/_includes",
    },
    // Only process .md and .njk files; everything else is static.
    templateFormats: ["md", "njk"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
