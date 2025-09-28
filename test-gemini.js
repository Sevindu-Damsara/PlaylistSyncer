import fetch from 'node-fetch';

async function test() {
  const res = await fetch('https://playlist-syncer.vercel.app/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: 'Hello world' })
  });
  console.log('Status:', res.status);
  console.log('Body:', await res.text());
}

test().catch(console.error);
