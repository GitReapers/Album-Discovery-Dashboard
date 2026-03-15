import { mbSearchArtist, mbGetAllReleaseGroups } from "./api.js";
import { useNavigate } from "react-router-dom";

function normalizeTitle(title) {
  return title
    .toLowerCase()
    .replace(/\s*\(.*?\)\s*/g, "") // strip "(Remastered)", "(Deluxe Edition)", etc.
    .replace(/[^a-z0-9\s]/g, "")  // strip punctuation
    .replace(/\s+/g, " ")
    .trim();
}

export default function SearchResults({ items }) {
  const navigate = useNavigate();

  const handleClick = async (item) => {
    const artists = await mbSearchArtist(item.artistName);
    const artistId = artists.artists[0].id;

    if (!artistId) {
      alert("Failed to load artist information.");
      return;
    }

    const releaseGroups = await mbGetAllReleaseGroups(artistId);
    const itunesTitle = normalizeTitle(item.collectionName);
    const filteredReleaseGroups = releaseGroups["release-groups"].filter((rg) => {
      const mbTitle = normalizeTitle(rg.title);
      return mbTitle === itunesTitle || mbTitle.includes(itunesTitle) || itunesTitle.includes(mbTitle);
    });

    if (filteredReleaseGroups.length === 0) {
      alert("Failed to load album information.");
      return;
    }

    const releaseGroupId = filteredReleaseGroups[0].id;
    const artworkUrl = item.artworkUrl100?.replace("100x100bb", "500x500bb");

    navigate(`/album/${releaseGroupId}`, {
      state: {
        artworkUrl,
        artistName: item.artistName,
        albumName: item.collectionName,
      },
    });
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="results-section">
      <div className="section-header">
        <h2>Albums</h2>
      </div>
      <div className="results-grid">
        {items.map((item) => (
          <div
            key={item.collectionId}
            className="album-card"
            onClick={() => handleClick(item)}
          >
            {item.artworkUrl100 ? (
              <img
                className="album-art"
                src={item.artworkUrl100.replace("100x100bb", "400x400bb")}
                alt={item.collectionName}
              />
            ) : (
              <div className="album-art-placeholder">&#9835;</div>
            )}
            <div className="album-card-title">{item.collectionName}</div>
            <div className="album-card-artist">{item.artistName}</div>
            {item.primaryGenreName && (
              <span className="album-card-genre">{item.primaryGenreName}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
