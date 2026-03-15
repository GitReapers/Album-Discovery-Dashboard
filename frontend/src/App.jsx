import { useState, useEffect } from "react";
import { lastfmGetTopArtists, lastfmGetTopTracks } from "./api.js";
import SearchBar from "./SearchBar.jsx";
import SearchResults from "./SearchResults.jsx";
import LastFmCharts from "./LastFmCharts.jsx";
import { Routes, Route } from "react-router-dom";
import AlbumPage from "./Album.jsx";
import "./App.css";

function HomePage({ topArtists, topTracks, results, handleResults }) {
  return (
    <div className="home-page">
      <div className="home-hero">
        <h1>Discover New Music</h1>
        <p>Search an artist to explore their discography.</p>
      </div>

      <SearchBar sendResults={handleResults} />
      <SearchResults items={results} />
      <LastFmCharts artists={topArtists} tracks={topTracks} />
    </div>
  );
}

function App() {
  const [topArtists, setTopArtists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const artistsData = await lastfmGetTopArtists();
      setTopArtists(artistsData.artists.artist);

      const tracksData = await lastfmGetTopTracks();
      setTopTracks(tracksData.tracks.track);
    };
    fetchData();
  }, []);

  const handleResults = (apiData) => {
    setResults(JSON.parse(apiData));
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">
          <span className="logo-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="26" height="26" fill="currentColor">
              <path d="M64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320zM320 352C302.3 352 288 337.7 288 320C288 302.3 302.3 288 320 288C337.7 288 352 302.3 352 320C352 337.7 337.7 352 320 352zM224 320C224 373 267 416 320 416C373 416 416 373 416 320C416 267 373 224 320 224C267 224 224 267 224 320zM168 304C168 271.6 184.3 237.4 210.8 210.8C237.3 184.2 271.6 168 304 168C317.3 168 328 157.3 328 144C328 130.7 317.3 120 304 120C256.1 120 210.3 143.5 176.9 176.9C143.5 210.3 120 256.1 120 304C120 317.3 130.7 328 144 328C157.3 328 168 317.3 168 304z"/>
            </svg>
          </span>
          <span className="logo-text">Discovery Dashboard</span>
        </div>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              topArtists={topArtists}
              topTracks={topTracks}
              results={results}
              handleResults={handleResults}
            />
          }
        />
        <Route path="/album/:albumId" element={<AlbumPage />} />
      </Routes>
    </div>
  );
}

export default App;
