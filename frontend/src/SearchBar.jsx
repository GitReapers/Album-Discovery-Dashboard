import { useState } from "react";
import { itunesSearchArtists, itunesLookupAlbums } from "./api.js";

export default function SearchBar({ sendResults }) {
  const [query, setQuery] = useState(null);

  const handleSearch = async () => {
    const artists = await itunesSearchArtists(query);

    if (!artists) {
      return;
    }
    const artistId = artists.results[0].artistId;
    const albumsData = await itunesLookupAlbums(artistId);
    const [artist, ...albums] = albumsData.results; // first element is the artist, get rid of that
  
    // send results to App component
    sendResults(JSON.stringify(albums));
  }

  return (
    <>
    <div>
      <input
        id="string"
        placeholder="Search for an artist to discover albums..."
        type="string"
        onChange={(event) => setQuery(event.target.value)}
      ></input>
      <button type="submit" onClick={handleSearch}>
        Submit
      </button>
    </div>
    </>
  );
}