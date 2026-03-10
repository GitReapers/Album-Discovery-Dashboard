import { mbSearchArtist, mbGetAllReleaseGroups } from "./api.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SearchResults({ items }) {
    const navigate = useNavigate();

    const handleClick = async (item) => {
        
            const artists = await mbSearchArtist(item.artistName); // fetch artists
            const artistId = artists.artists[0].id; // get first artist's mbid

            if (!artistId) {
                alert("Failed to load artist information.");
                return;
            }

            const releaseGroups = await mbGetAllReleaseGroups(artistId); // get all releases from this artist
            // filter to get releases that match the album name that was clicked on
            const filteredReleaseGroups = releaseGroups["release-groups"].filter(releaseGroup => {
                return releaseGroup.title === item.collectionName;
            });
            
            if (filteredReleaseGroups.length === 0) {
                alert("Failed to load album information.");
                return;
            }
            // get the first album's mbid
            const releaseGroupId = filteredReleaseGroups[0].id;

            // navigate to album page and send album mbid    
            navigate(`/album/${releaseGroupId}`);

    }

    if (!items || items.length === 0) {
        return null;
    }
    else {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Artist</th>
                        <th>Album</th>
                        <th>Genre</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr onClick={() => handleClick(item)} key={item.collectionId}>
                            <td>{item.artistName}</td>
                            <td>{item.collectionName}</td>
                            <td>{item.primaryGenreName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

}