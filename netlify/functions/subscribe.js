exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // One function, several lists. `product` picks the Brevo list; unknown or
  // missing values fall back to the ToneLab list so the existing forms keep
  // working unchanged. The Specular list id lives in an env var so the list
  // can be moved in Brevo without a redeploy of this file.
  const LISTS = {
    tonelab: 6,
    specular: Number(process.env.BREVO_SPECULAR_LIST_ID) || 10 // Brevo folder "Specular" > list "Waitlist" (#10), created 2026-11-06
  };

  let email, product;
  try {
    const body = JSON.parse(event.body);
    email = body.email?.trim();
    product = String(body.product || 'tonelab').toLowerCase();
  } catch {
    return { statusCode: 400, body: 'Invalid request body' };
  }

  if (!email || !email.includes('@')) {
    return { statusCode: 400, body: 'Invalid email' };
  }

  const listId = LISTS[product] ?? LISTS.tonelab;
  if (!listId) {
    console.error(`Subscribe error: no Brevo list configured for "${product}"`);
    return { statusCode: 500, body: JSON.stringify({ error: 'List not configured' }) };
  }

  try {
    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        updateEnabled: true
      })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Brevo error');
    }

    return { statusCode: 200, body: JSON.stringify({ success: true }) };

  } catch (e) {
    console.error('Subscribe error:', e.message);
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
