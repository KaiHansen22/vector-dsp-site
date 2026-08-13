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
    "robots.txt",
    "llms.txt",
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

  // ─── Watch & ignore ───
  // Make sure node_modules and _site never get scanned as templates.
  eleventyConfig.ignores.add("node_modules");
  eleventyConfig.ignores.add("_site");
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("SETUP.md");

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
