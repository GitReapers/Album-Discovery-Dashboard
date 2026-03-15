import { useState } from "react";
import { itunesSearchArtists, itunesLookupAlbums } from "./api.js";

export default function SearchBar({ sendResults }) {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;
    const artists = await itunesSearchArtists(query);
    if (!artists) return;

    const artistId = artists.results[0].artistId;
    const albumsData = await itunesLookupAlbums(artistId);
    const [, ...albums] = albumsData.results;

    sendResults(JSON.stringify(albums));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="search-container">
      <input
        className="search-input"
        placeholder="Search for an artist..."
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="search-btn" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}
