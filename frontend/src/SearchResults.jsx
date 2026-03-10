import { mbSearchArtist, mbGetAllReleaseGroups, mbGetReleaseGroup } from "./api.js";
export default function SearchResults({ items, sendAlbumInfo }) {

    const handleLookup = async (item) => {
        const artists = await mbSearchArtist(item.artistName); // fetch artists
        const artistId = artists.artists[0].id; // get first artist's id
        if (artistId) {
            const releaseGroups = await mbGetAllReleaseGroups(artistId); // get all releases from this artist
            // filter to get releases that match the album name that was clicked on
            const filteredReleaseGroups = releaseGroups["release-groups"].filter(releaseGroup => {
                return releaseGroup.title === item.collectionName;
            });
            // get the first album's id
            const releaseGroupId = filteredReleaseGroups[0].id;
            if (releaseGroupId) {
                const releaseGroupInfo = await mbGetReleaseGroup(releaseGroupId); // get extra info about this album
                
                // send album info to App component
                sendAlbumInfo(JSON.stringify(releaseGroupInfo));
            }
            else {
                sendAlbumInfo(null);
            }
        }
        else {
            sendAlbumInfo(null);
        }
    }

    if (items) {
        return (
            <table>
                <th>Artist</th>
                <th>Album</th>
                <th>Genre</th>
                {items.map(item => (
                    <tr onClick={() => handleLookup(item)} key={item.id}>
                        <td>{item.artistName}</td>
                        <td>{item.collectionName}</td>
                        <td>{item.primaryGenreName}</td>
                    </tr>
                ))}
            </table>
        );
    }
    else {
        return (<></>)
    }

}