// Vercel serverless function: returns Mahir's top 5 Spotify artists.
// Runs server-side so the client secret + refresh token are never exposed.
//
// Required environment variables (set in Vercel project settings):
//   SPOTIFY_CLIENT_ID
//   SPOTIFY_CLIENT_SECRET
//   SPOTIFY_REFRESH_TOKEN   (generate once with scripts/spotify-auth.js)

const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const TOP_URL =
  'https://api.spotify.com/v1/me/top/artists?limit=5&time_range=medium_term';

export default async function handler(req, res) {
  const {
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REFRESH_TOKEN,
  } = process.env;

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    res.status(500).json({ error: 'Spotify environment variables are not set.' });
    return;
  }

  try {
    // 1. Exchange the refresh token for a short-lived access token.
    const basic = Buffer.from(
      `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
    ).toString('base64');

    const tokenRes = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: SPOTIFY_REFRESH_TOKEN,
      }),
    });

    if (!tokenRes.ok) {
      throw new Error(`token exchange failed: ${tokenRes.status}`);
    }
    const { access_token } = await tokenRes.json();

    // 2. Fetch the top artists.
    const topRes = await fetch(TOP_URL, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    if (!topRes.ok) {
      throw new Error(`top artists failed: ${topRes.status}`);
    }
    const data = await topRes.json();

    const artists = (data.items || []).map((a) => ({
      name: a.name,
      genres: a.genres || [],
      image: a.images?.[0]?.url || '',
      url: a.external_urls?.spotify || '',
    }));

    // Cache at the edge for an hour so we don't hammer Spotify on every visit.
    res.setHeader(
      'Cache-Control',
      's-maxage=3600, stale-while-revalidate=86400'
    );
    res.status(200).json({ artists });
  } catch (err) {
    res.status(502).json({ error: 'Failed to fetch Spotify data.' });
  }
}
