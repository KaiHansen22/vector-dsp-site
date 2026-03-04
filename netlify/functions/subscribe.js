exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  let email;
  try {
    ({ email } = JSON.parse(event.body));
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request' }) };
  }

  if (!email || !email.includes('@')) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid email' }) };
  }

  const API_KEY = process.env.BREVO_API_KEY;
  const LIST_ID = 6;

  try {
    // 1. Add contact to list
    const contactRes = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': API_KEY
      },
      body: JSON.stringify({
        email,
        listIds: [LIST_ID],
        updateEnabled: true
      })
    });

    if (!contactRes.ok && contactRes.status !== 204) {
      const err = await contactRes.text();
      console.error('Contact error:', err);
    }

    // 2. Send confirmation email
    const emailRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': API_KEY
      },
      body: JSON.stringify({
        sender: { name: 'Vector DSP', email: 'support@vector-dsp.com' },
        to: [{ email }],
        replyTo: { email: 'support@vector-dsp.com' },
        subject: "You're on the ToneLab list",
        htmlContent: `
          <div style="background:#0a0a0f;color:#edf0f4;font-family:'Helvetica Neue',sans-serif;padding:48px 40px;max-width:520px;margin:0 auto;">
            <div style="font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#00C2FF;margin-bottom:24px;">Vector DSP</div>
            <div style="font-size:28px;font-weight:700;margin-bottom:16px;">ToneLab<span style="color:#00C2FF;">.</span></div>
            <p style="font-size:15px;line-height:1.7;color:rgba(237,240,244,0.7);margin-bottom:24px;">
              You're on the early access list. We'll be in touch when ToneLab is ready to ship.
            </p>
            <p style="font-size:13px;line-height:1.7;color:rgba(237,240,244,0.4);">
              Don't want to hear from us?
            </p>
            <a href="https://vector-dsp.com/api/unsubscribe?email=${encodeURIComponent(email)}"
               style="display:inline-block;margin-top:12px;padding:10px 24px;border:1px solid rgba(255,255,255,0.15);color:rgba(237,240,244,0.5);font-size:11px;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;">
              Unsubscribe
            </a>
            <div style="margin-top:40px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.07);font-size:11px;color:rgba(237,240,244,0.25);letter-spacing:0.05em;">
              © 2026 Vector DSP · support@vector-dsp.com
            </div>
          </div>
        `
      })
    });

    if (!emailRes.ok) {
      const err = await emailRes.text();
      console.error('Email error:', err);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };

  } catch (e) {
    console.error('Function error:', e);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error' })
    };
  }
};
