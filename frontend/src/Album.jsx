import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { mbGetReleaseGroup } from "./api.js";

export default function Album() {
  const { albumId } = useParams();
  const [albumInfo, setAlbumInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlbum = async () => {
      const album = await mbGetReleaseGroup(albumId); // get extra info about this album
      setAlbumInfo(album);
    };

    fetchAlbum();
  }, [albumId]);

  if (!albumInfo) {
    return <p>Loading album...</p>;
  }
  else {
    return (
      <div>
        <button onClick={() => navigate(-1)}>
          Back
        </button>

        <h2>{albumInfo.title}</h2>
        <div>Genres:</div>
        {albumInfo.genres.map(genre => (
          <ul key={genre.id}>
            <li>{genre.name}</li>
          </ul>
        ))}
        <div>Rating: {albumInfo.rating.value} </div>
      </div>
    );

  }
}
