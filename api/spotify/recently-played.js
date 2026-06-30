const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const RECENT_URL =
  'https://api.spotify.com/v1/me/player/recently-played?limit=1';

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

    // 2. Fetch the most recently played track.
    const recentRes = await fetch(RECENT_URL, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    if (!recentRes.ok) {
      throw new Error(`recently played failed: ${recentRes.status}`);
    }
    const data = await recentRes.json();

    const item = data.items?.[0];
    const track = item
      ? {
          name: item.track?.name || '',
          artist: (item.track?.artists || []).map((a) => a.name).join(', '),
          image: item.track?.album?.images?.[0]?.url || '',
          url: item.track?.external_urls?.spotify || '',
          playedAt: item.played_at || '',
        }
      : null;

    // Recently-played changes often, so cache only briefly.
    res.setHeader(
      'Cache-Control',
      's-maxage=60, stale-while-revalidate=300'
    );
    res.status(200).json({ track });
  } catch (err) {
    res.status(502).json({ error: 'Failed to fetch Spotify data.' });
  }
}
