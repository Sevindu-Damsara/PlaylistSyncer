export default async function handler(req, res) {
  const code = req.query.code;

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + Buffer.from(
        '26f83a6e61e74da49391d630f64f684a' + ':' + 'dadbae2485d64ac892d5dce48edbac73'
      ).toString('base64')
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: 'https://playlist-syncer.vercel.app/callback'
    })
  });

  const data = await response.json();
  res.status(200).json(data); // access_token, refresh_token, expires_in
}
