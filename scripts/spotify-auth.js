/* eslint-disable no-console */
// One-time helper to generate a Spotify REFRESH TOKEN for the portfolio.
//
// Usage:
//   1. In your Spotify app dashboard (https://developer.spotify.com/dashboard),
//      add this Redirect URI:  http://127.0.0.1:8888/callback
//   2. Run:
//        SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy node scripts/spotify-auth.js
//   3. A browser tab opens -> log in / approve -> the refresh token prints
//      in your terminal. Copy it into your Vercel env vars as
//      SPOTIFY_REFRESH_TOKEN.
//
// Requires Node 18+ (uses global fetch).

const http = require('http');
const crypto = require('crypto');
const { exec } = require('child_process');

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const PORT = 8888;
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`;
const SCOPE = 'user-top-read';

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    '\nMissing credentials. Run like:\n' +
      '  SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy node scripts/spotify-auth.js\n'
  );
  process.exit(1);
}

const state = crypto.randomBytes(8).toString('hex');
const authUrl =
  'https://accounts.spotify.com/authorize?' +
  new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: SCOPE,
    redirect_uri: REDIRECT_URI,
    state,
  }).toString();

const server = http.createServer(async (req, res) => {
  if (!req.url.startsWith('/callback')) {
    res.writeHead(404);
    res.end();
    return;
  }

  const url = new URL(req.url, REDIRECT_URI);
  const code = url.searchParams.get('code');
  const returnedState = url.searchParams.get('state');

  if (returnedState !== state || !code) {
    res.writeHead(400);
    res.end('State mismatch or missing code. Try again.');
    server.close();
    return;
  }

  try {
    const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    const data = await tokenRes.json();
    if (!tokenRes.ok) {
      throw new Error(JSON.stringify(data));
    }

    console.log('\n========================================');
    console.log('SUCCESS! Your refresh token:\n');
    console.log(data.refresh_token);
    console.log('\nAdd it to Vercel as SPOTIFY_REFRESH_TOKEN');
    console.log('========================================\n');

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(
      '<h2 style="font-family:sans-serif">Done. Check your terminal for the refresh token. You can close this tab.</h2>'
    );
  } catch (err) {
    console.error('Token exchange failed:', err.message);
    res.writeHead(500);
    res.end('Token exchange failed. Check your terminal.');
  } finally {
    server.close();
  }
});

server.listen(PORT, () => {
  console.log('\nOpening Spotify authorization in your browser...');
  console.log('If it does not open, paste this URL manually:\n');
  console.log(authUrl + '\n');
  const opener =
    process.platform === 'darwin'
      ? 'open'
      : process.platform === 'win32'
      ? 'start ""'
      : 'xdg-open';
  exec(`${opener} "${authUrl}"`);
});
