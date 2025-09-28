export default async function handler(req, res) {
  // 1) Universal log
  console.log('[gemini] incoming request', {
    method: req.method,
    url: req.url,
    body: req.body
  });

  // 2) Quick “is it live?” GET handler
  if (req.method === 'GET') {
    return res
      .status(200)
      .json({ msg: 'gemini proxy is live', timestamp: Date.now() });
  }

  // 3) Only POST allowed from your front-end
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ error: 'Method not allowed. Use GET for testing or POST with JSON body.' });
  }

  // 4) Body sanity check
  const { prompt } = req.body || {};
  if (!prompt || typeof prompt !== 'string') {
    return res
      .status(400)
      .json({ error: 'Bad Request: JSON body must include a string field “prompt”.' });
  }

  try {
    // 5) Proxy the call to Gemini
    const apiRes = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCG-0VABh5NDa61_lbPK5bxnv_6jQlVEwc',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await apiRes.json();
    console.log('[gemini] upstream response', {
      status: apiRes.status,
      body: data
    });

    return res.status(apiRes.status).json(data);
  } catch (err) {
    console.error('[gemini] proxy error', err);
    return res.status(500).json({ error: 'Internal proxy error', details: err.message });
  }
}
