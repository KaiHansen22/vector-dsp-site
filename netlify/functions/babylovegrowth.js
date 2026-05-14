// Webhook receiver for BabyLoveGrowth.
//
// Validates a shared secret, parses BLG's webhook payload defensively,
// and commits a Markdown file to blog/posts/<slug>.md in the GitHub repo.
// Netlify auto-deploys the new post within ~30 seconds.
//
// Required env vars (set in Netlify dashboard):
//   GITHUB_TOKEN              PAT with "Contents: Read and write" on the repo
//   BABYLOVEGROWTH_SECRET     Shared secret. BLG must send this in a header.
// Optional env vars (defaults shown):
//   GITHUB_OWNER  = KaiHansen22
//   GITHUB_REPO   = vector-dsp-site
//   GITHUB_BRANCH = main

const REPO_OWNER = process.env.GITHUB_OWNER || 'KaiHansen22';
const REPO_NAME  = process.env.GITHUB_REPO  || 'vector-dsp-site';
const BRANCH     = process.env.GITHUB_BRANCH || 'main';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFKD').replace(/[̀-ͯ]/g, '')   // strip diacritics
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

// Try several common payload paths and return the first non-empty value.
function pick(obj, ...paths) {
  for (const p of paths) {
    let v = obj;
    for (const key of p.split('.')) {
      if (v == null) break;
      v = v[key];
    }
    if (v != null && v !== '') return v;
  }
  return null;
}

function escapeYaml(s) {
  if (s == null) return '""';
  const str = String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, ' ');
  return `"${str}"`;
}

async function ghFetch(path, opts = {}) {
  return fetch(`https://api.github.com${path}`, {
    ...opts,
    headers: {
      'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
      'Accept':        'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type':  'application/json',
      'User-Agent':    'vector-dsp-blog-bridge',
      ...(opts.headers || {})
    }
  });
}

// ─── Handler ─────────────────────────────────────────────────────────────────

exports.handler = async (event) => {
  // 1) Env sanity
  if (!process.env.GITHUB_TOKEN || !process.env.BABYLOVEGROWTH_SECRET) {
    console.error('Missing env vars (need GITHUB_TOKEN and BABYLOVEGROWTH_SECRET)');
    return { statusCode: 500, body: JSON.stringify({ error: 'Server misconfigured' }) };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'POST required' }) };
  }

  // 2) Auth — check the shared secret in any of several common header names.
  const headers = event.headers || {};
  const lower = {};
  for (const k of Object.keys(headers)) lower[k.toLowerCase()] = headers[k];
  const bearer = (lower['authorization'] || '').replace(/^Bearer\s+/i, '') || null;
  const provided =
    lower['x-webhook-secret'] ||
    lower['x-babylovegrowth-secret'] ||
    lower['x-api-key'] ||
    lower['webhook-secret'] ||
    bearer;
  if (!provided || provided !== process.env.BABYLOVEGROWTH_SECRET) {
    console.warn('Auth failed. Header keys present:', Object.keys(lower));
    return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  // 3) Parse payload
  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  // Log the full payload — visible in Netlify function logs.
  // Useful for tuning field extraction after the first real webhook lands.
  console.log('BLG payload received:', JSON.stringify(payload));

  // 4) Extract fields defensively. BLG's exact shape isn't documented yet,
  //    so try multiple common paths.
  const title =
    pick(payload, 'title', 'article.title', 'data.title', 'post.title', 'name');
  const contentMd =
    pick(payload, 'markdown', 'content_markdown', 'body_markdown',
                  'article.markdown', 'article.content_markdown');
  const contentHtml =
    pick(payload, 'content_html', 'html', 'content', 'body',
                  'article.content', 'article.html', 'post.content', 'data.content');
  const description =
    pick(payload, 'description', 'meta_description', 'excerpt', 'summary',
                  'article.description', 'data.description') || '';
  const slugInput =
    pick(payload, 'slug', 'permalink', 'article.slug', 'data.slug');
  const publishedAt =
    pick(payload, 'published_at', 'date', 'created_at',
                  'article.published_at', 'publishedAt');

  if (!title) {
    return { statusCode: 400, body: JSON.stringify({
      error: 'Missing title. Tried: title, article.title, data.title, post.title, name'
    })};
  }
  const content = contentMd || contentHtml;
  if (!content) {
    return { statusCode: 400, body: JSON.stringify({
      error: 'Missing content. Tried: markdown, content_markdown, html, content, body, article.content'
    })};
  }

  const slug = slugify(slugInput || title);
  if (!slug) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Could not derive slug from title or slug fields' }) };
  }

  const dateOnly = (() => {
    const d = publishedAt ? new Date(publishedAt) : new Date();
    return isNaN(d) ? new Date().toISOString().slice(0, 10) : d.toISOString().slice(0, 10);
  })();

  // 5) Build the Markdown file with frontmatter. Eleventy's markdown-it
  //    is configured with html:true, so inline HTML in BLG output renders.
  const markdown = `---
title: ${escapeYaml(title)}
description: ${escapeYaml(description)}
date: ${dateOnly}
---

${content}
`;

  // 6) Check if file already exists (so we set commit message + sha correctly).
  const path = `blog/posts/${slug}.md`;
  let existingSha = null;
  try {
    const checkRes = await ghFetch(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=${BRANCH}`);
    if (checkRes.status === 200) {
      existingSha = (await checkRes.json()).sha;
    } else if (checkRes.status !== 404) {
      const errText = await checkRes.text();
      throw new Error(`GitHub existence check failed: ${checkRes.status} ${errText}`);
    }
  } catch (err) {
    console.error('Existence check error:', err);
    return { statusCode: 502, body: JSON.stringify({ error: `GitHub unreachable: ${err.message}` }) };
  }

  const isUpdate = !!existingSha;
  const commitMessage = `blog: ${isUpdate ? 'update' : 'publish'} "${title}" via BabyLoveGrowth`;

  // 7) Commit the file.
  const body = {
    message: commitMessage,
    content: Buffer.from(markdown, 'utf-8').toString('base64'),
    branch:  BRANCH,
    ...(existingSha ? { sha: existingSha } : {})
  };

  let commitData;
  try {
    const putRes = await ghFetch(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`, {
      method: 'PUT',
      body: JSON.stringify(body)
    });
    if (!putRes.ok) {
      const errText = await putRes.text();
      throw new Error(`GitHub commit failed: ${putRes.status} ${errText}`);
    }
    commitData = await putRes.json();
  } catch (err) {
    console.error('Commit error:', err);
    return { statusCode: 502, body: JSON.stringify({ error: err.message }) };
  }

  const url = `https://vector-dsp.com/blog/${slug}/`;
  console.log(`✓ ${isUpdate ? 'Updated' : 'Published'}: ${url} (commit ${commitData.commit.sha.slice(0,7)})`);

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ok:         true,
      slug,
      url,
      updated:    isUpdate,
      commit_sha: commitData.commit.sha,
      message:    'Article committed. Netlify will rebuild within ~30 seconds.'
    })
  };
};
