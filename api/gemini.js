export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ error: 'Method not allowed. Send POST with { prompt } in JSON body.' });
  }

  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Missing prompt in body.' });
    }

    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCG-0VABh5NDa61_lbPK5bxnv_6jQlVEwc',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Proxy failed', details: err.message });
  }
}
