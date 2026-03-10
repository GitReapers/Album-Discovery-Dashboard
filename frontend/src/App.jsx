import { useState, useEffect } from "react";
import { lastfmGetTopArtists, lastfmGetTopTracks } from "./api.js";
import SearchBar from "./SearchBar.jsx";
import SearchResults from "./SearchResults.jsx";
import LastFmCharts from "./LastFmCharts.jsx";

function App() {
  async function Test() {
    try {
      console.log("API Key:", import.meta.env.VITE_LASTFM_API_KEY);
      const lastfm = await lastfmGetAlbums("radiohead");
      console.log("Last.fm works", lastfm);

      const itunes = await itunesSearchAlbums("the strokes");
      console.log("iTunes albums:", itunes.results);
      console.log("itunes works", itunes);

      const mb = await mbSearchArtist("radiohead");
      console.log("Musicbrainz works", mb);
    } catch (err) {
      console.error("Failed:", err.message);
    }
  }

  const [topArtists, setTopArtists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
  const [album, setAlbum] = useState(null);

  // lastfm api gets the top charts (artists and tracks) (only fetches once on load)
  useEffect(() => {
    const fetchData = async () => {
      const artistsData = await lastfmGetTopArtists();
      setTopArtists(artistsData.artists.artist);

      const tracksData = await lastfmGetTopTracks();
      setTopTracks(tracksData.tracks.track);
    }
    fetchData();
  }, []);

  const [results, setResults] = useState(null);
  const [albumInfo, setAlbumInfo] = useState(null);

  // itunes api is used to search for albums using a keyword (album name, artist name, etc)
  // callback func to handle search results received from search bar component
  const handleResults = (apiData) => {
    setResults(JSON.parse(apiData));
  };

  // music brainz is used to lookup additional info about a row that is clicked on in the search results list
  // callback func to handle album info results received from search results component
  const handleAlbumInfo = (apiData) => {
    setAlbumInfo(JSON.parse(apiData));
  };


  return (
    <div style={{ padding: 24, fontFamily: "Arial" }}>
      <header style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0 }}>Album Discovery Dashboard</h1>
        <p style={{ marginTop: 8 }}>Search for an artist and discover albums.</p>
      </header>

      <main>

        <div>
          <SearchBar sendResults={handleResults} />
          <SearchResults items={results} sendAlbumInfo={handleAlbumInfo}/>
          <p>Album info: { JSON.stringify(albumInfo) }</p>
        </div>

        <LastFmCharts artists={topArtists} tracks={topTracks}/>

        <button onClick={Test}>Run API Tests</button>
      </main>
    </div>
  );
}

export default App;