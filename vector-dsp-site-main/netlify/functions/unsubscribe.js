exports.handler = async (event) => {
  const email = event.queryStringParameters?.email;

  if (!email) {
    return {
      statusCode: 302,
      headers: { Location: '/?unsubscribe=error' }
    };
  }

  try {
    // Remove from Brevo list
    const res = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify({
        listUnsubscription: [6]
      })
    });

    if (!res.ok) throw new Error('Brevo error');

    return {
      statusCode: 302,
      headers: { Location: '/?unsubscribe=success' }
    };

  } catch (e) {
    return {
      statusCode: 302,
      headers: { Location: '/?unsubscribe=error' }
    };
  }
};
