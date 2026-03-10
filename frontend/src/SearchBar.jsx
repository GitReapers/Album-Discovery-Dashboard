import { useState } from "react";
import { itunesSearchAlbums } from "./api.js";

export default function SearchBar({ sendResults }) {
  const [query, setQuery] = useState(null);

  const handleSearch = async () => {
    const itunes = await itunesSearchAlbums(query);
  
    // send results to App component
    sendResults(JSON.stringify(itunes.results));
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