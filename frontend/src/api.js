const LASTFM_KEY = import.meta.env.VITE_LASTFM_API_KEY;
const LASTFM_URL = "https://ws.audioscrobbler.com/2.0/";
const ITUNES_URL = "https://itunes.apple.com";
const MB_URL     = "https://musicbrainz.org/ws/2";
const MB_HEADERS = {
  "User-Agent": "AlbumDiscoveryDashboard/1.0 (your@email.com)",
  "Accept": "application/json",
};

// last.fm
export async function lastfmGetAlbums(artist) {
  const url = `${LASTFM_URL}?method=artist.gettopalbums&artist=${encodeURIComponent(artist)}&api_key=${LASTFM_KEY}&format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Last.fm error: ${res.status}`);
  return res.json();
}

// itunes
export async function itunesSearchAlbums(query) {
  const url = `${ITUNES_URL}/search?term=${encodeURIComponent(query)}&media=music&entity=album&limit=20`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`iTunes error: ${res.status}`);
  return res.json();
}

export async function itunesSearchTracks(query) {
  const url = `${ITUNES_URL}/search?term=${encodeURIComponent(query)}&media=music&entity=song&limit=20`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`iTunes error: ${res.status}`);
  return res.json();
}

// musicbrainz
export async function mbSearchArtist(name) {
  const url = `${MB_URL}/artist?query=${encodeURIComponent(name)}&fmt=json`;
  const res = await fetch(url, { headers: MB_HEADERS });
  if (!res.ok) throw new Error(`MusicBrainz error: ${res.status}`);
  return res.json();
}

export async function mbGetReleases(artistId) {
  const url = `${MB_URL}/release?artist=${artistId}&fmt=json&limit=20`;
  const res = await fetch(url, { headers: MB_HEADERS });
  if (!res.ok) throw new Error(`MusicBrainz error: ${res.status}`);
  return res.json();
}