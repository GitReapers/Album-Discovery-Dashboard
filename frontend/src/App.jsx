import { useState } from "react";
import { lastfmGetAlbums, itunesSearchAlbums, mbSearchArtist } from "./api.js";

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
  return (
    <div style={{ padding: 24, fontFamily: "Arial" }}>
      <header style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0 }}>Album Discovery Dashboard</h1>
        <p style={{ marginTop: 8 }}>Search for an artist and discover albums.</p>
      </header>

      <main>
        <p>Next: add a search box here.</p>
        <button onClick={Test}>Run API Tests</button>
      </main>
    </div>
  );
}

export default App;