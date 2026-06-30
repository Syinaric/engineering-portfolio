// Dev-only: Create React App's dev server (`npm start`) does not run the
// Vercel serverless functions in /api. This mirrors api/spotify/top-artists.js
// so the About section shows real data during local development.
// CRA auto-loads this file; it is ignored in production builds (Vercel uses /api).

module.exports = function (app) {
  app.get('/api/spotify/top-artists', async (req, res) => {
    const {
      SPOTIFY_CLIENT_ID,
      SPOTIFY_CLIENT_SECRET,
      SPOTIFY_REFRESH_TOKEN,
    } = process.env;

    if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
      res
        .status(500)
        .json({ error: 'Spotify env vars missing (.env.local).' });
      return;
    }

    try {
      const basic = Buffer.from(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
      ).toString('base64');

      const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
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
      if (!tokenRes.ok) throw new Error(`token ${tokenRes.status}`);
      const { access_token } = await tokenRes.json();

      const topRes = await fetch(
        'https://api.spotify.com/v1/me/top/artists?limit=5&time_range=medium_term',
        { headers: { Authorization: `Bearer ${access_token}` } }
      );
      if (!topRes.ok) throw new Error(`top ${topRes.status}`);
      const data = await topRes.json();

      const artists = (data.items || []).map((a) => ({
        name: a.name,
        genres: a.genres || [],
        image: a.images?.[0]?.url || '',
        url: a.external_urls?.spotify || '',
      }));

      res.status(200).json({ artists });
    } catch (err) {
      res.status(502).json({ error: 'Failed to fetch Spotify data.' });
    }
  });

  app.get('/api/spotify/recently-played', async (req, res) => {
    const {
      SPOTIFY_CLIENT_ID,
      SPOTIFY_CLIENT_SECRET,
      SPOTIFY_REFRESH_TOKEN,
    } = process.env;

    if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
      res
        .status(500)
        .json({ error: 'Spotify env vars missing (.env.local).' });
      return;
    }

    try {
      const basic = Buffer.from(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
      ).toString('base64');

      const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
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
      if (!tokenRes.ok) throw new Error(`token ${tokenRes.status}`);
      const { access_token } = await tokenRes.json();

      const recentRes = await fetch(
        'https://api.spotify.com/v1/me/player/recently-played?limit=1',
        { headers: { Authorization: `Bearer ${access_token}` } }
      );
      if (!recentRes.ok) throw new Error(`recent ${recentRes.status}`);
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

      res.status(200).json({ track });
    } catch (err) {
      res.status(502).json({ error: 'Failed to fetch Spotify data.' });
    }
  });
};
