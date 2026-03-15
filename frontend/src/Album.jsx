import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { mbGetReleaseGroup, lastfmGetSimilarArtists } from "./api.js";

export default function Album() {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { artworkUrl, artistName, albumName } = location.state || {};

  const [albumInfo, setAlbumInfo] = useState(null);
  const [similarArtists, setSimilarArtists] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      const album = await mbGetReleaseGroup(albumId);
      setAlbumInfo(album);

      if (artistName) {
        const similar = await lastfmGetSimilarArtists(artistName);
        setSimilarArtists(similar?.similarartists?.artist ?? null);
      }
    };
    fetchAll();
  }, [albumId, artistName]);

  if (!albumInfo) {
    return <div className="loading">Loading album...</div>;
  }

  const displayTitle = albumInfo.title || albumName;
  const genres = albumInfo.genres || [];
  const rating = albumInfo.rating?.value;

  return (
    <div className="album-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        &#8592; Back
      </button>

      <div className="album-hero">
        {artworkUrl ? (
          <img className="album-cover" src={artworkUrl} alt={displayTitle} />
        ) : (
          <div className="album-cover-placeholder">&#9835;</div>
        )}

        <div className="album-details">
          <div className="album-type-label">Album</div>
          {artistName && <div className="album-artist">{artistName}</div>}
          <h2 className="album-title">{displayTitle}</h2>

          {rating && (
            <div className="album-rating">
              Rating:&nbsp;
              <span className="album-rating-value">{Number(rating).toFixed(1)}</span>
              <span style={{ color: "var(--text-muted)" }}>&nbsp;/ 5</span>
            </div>
          )}

          <div className="album-genres">
            {genres.length > 0 ? (
              genres.map((genre) => (
                <span key={genre.id} className="genre-pill">
                  {genre.name}
                </span>
              ))
            ) : (
              <span className="no-genres">No genres listed</span>
            )}
          </div>
        </div>
      </div>

      <div className="album-lower">
        {similarArtists && similarArtists.length > 0 && (
          <div className="similar-section">
            <h3 className="album-section-title">Similar Artists</h3>
            <div className="similar-grid">
              {similarArtists.map((artist) => (
                <div key={artist.name} className="similar-card">
                  {artist.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
