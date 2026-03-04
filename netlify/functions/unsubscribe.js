exports.handler = async (event) => {
  const email = event.queryStringParameters?.email;

  if (!email) {
    return {
      statusCode: 302,
      headers: { Location: '/unsubscribed.html?status=error' }
    };
  }

  try {
    const API_KEY = process.env.BREVO_API_KEY;
    const LIST_ID = 6;

    // Correct Brevo endpoint: remove contact from a specific list
    const res = await fetch(`https://api.brevo.com/v3/contacts/lists/${LIST_ID}/contacts/remove`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': API_KEY
      },
      body: JSON.stringify({
        emails: [email]
      })
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Brevo unsubscribe error:', err);
      return {
        statusCode: 302,
        headers: { Location: '/unsubscribed.html?status=error' }
      };
    }

    return {
      statusCode: 302,
      headers: { Location: '/unsubscribed.html?status=success' }
    };

  } catch (e) {
    console.error('Unsubscribe error:', e);
    return {
      statusCode: 302,
      headers: { Location: '/unsubscribed.html?status=error' }
    };
  }
};
