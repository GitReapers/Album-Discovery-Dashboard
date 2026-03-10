const LASTFM_KEY = import.meta.env.VITE_LASTFM_API_KEY;
const LASTFM_URL = "https://ws.audioscrobbler.com/2.0/";
const ITUNES_URL = "https://itunes.apple.com";
const MB_URL = "https://musicbrainz.org/ws/2";
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

// last.fm top 30 artists chart
export async function lastfmGetTopArtists() {
  try {
    const url = `${LASTFM_URL}?method=chart.gettopartists&api_key=${LASTFM_KEY}&format=json&limit=30`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Last.fm error: ${res.status}`);
    return res.json();
  }
  catch (err) {
    console.error('LastFM API error:', err.message);
  }
}

// last.fm top 30 tracks chart
export async function lastfmGetTopTracks() {
  try {
    const url = `${LASTFM_URL}?method=chart.gettoptracks&api_key=${LASTFM_KEY}&format=json&limit=30`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Last.fm error: ${res.status}`);
    return res.json();
  }
  catch (err) {
    console.error('LastFM API error:', err.message);
  }
}

// itunes
export async function itunesSearchAlbums(query) {
  try {
    const url = `${ITUNES_URL}/search?term=${encodeURIComponent(query)}&media=music&entity=album&limit=20`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`iTunes error: ${res.status}`);
    return res.json();
  }
  catch (err) {
    console.error('iTunes API error:', err.message);
  }

}

export async function itunesSearchTracks(query) {
  const url = `${ITUNES_URL}/search?term=${encodeURIComponent(query)}&media=music&entity=song&limit=20`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`iTunes error: ${res.status}`);
  return res.json();
}

// musicbrainz
// search by name to get artist's MBID
export async function mbSearchArtist(name) {
  try {
    const url = `${MB_URL}/artist?query=${encodeURIComponent(name)}&fmt=json`;
    const res = await fetch(url, { headers: MB_HEADERS });
    if (!res.ok) throw new Error(`MusicBrainz error: ${res.status}`);
    return res.json();
  }
  catch (err) {
    console.error('MusicBrainz API error:', err.message);
  }
}

// use artist's MBID to get all their release groups (albums and singles)
export async function mbGetAllReleaseGroups(artistId) {
  try {
    const url = `${MB_URL}/release-group?artist=${artistId}&fmt=json&type=album|ep&limit=100`;
    const res = await fetch(url, { headers: MB_HEADERS });
    if (!res.ok) throw new Error(`MusicBrainz error: ${res.status}`);
    return res.json();
  }
  catch (err) {
    console.error('MusicBrainz API error:', err.message);
  }
}

// use release group's MBID to get specific album info
export async function mbGetReleaseGroup(releaseGroupId) {
  try {
    const url = `${MB_URL}/release-group/${releaseGroupId}?inc=aliases+annotation+tags+ratings+genres&fmt=json`;
    const res = await fetch(url, { headers: MB_HEADERS });
    if (!res.ok) throw new Error(`MusicBrainz error: ${res.status}`);
    return res.json();
  }
  catch (err) {
    console.error('MusicBrainz API error:', err.message);
  }
}