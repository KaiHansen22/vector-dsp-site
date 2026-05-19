exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let email;
  try {
    const body = JSON.parse(event.body);
    email = body.email?.trim();
  } catch {
    return { statusCode: 400, body: 'Invalid request body' };
  }

  if (!email || !email.includes('@')) {
    return { statusCode: 400, body: 'Invalid email' };
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
        listIds: [6],
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
