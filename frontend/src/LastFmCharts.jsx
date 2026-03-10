export default function LastFmCharts({ artists, tracks }) {
    if (artists && tracks) {
        return (
            <div>
            <table>
                <caption>Top 30 Artists Chart</caption>
                <th>Artist</th>
                <th>Playcount</th>
                <th>Listeners</th>
                {artists.map(artist => (
                    <tr key={artist.id}>
                        <td>{artist.name}</td>
                        <td>{artist.playcount}</td>
                        <td>{artist.listeners}</td>
                    </tr>
                ))}
            </table>
            
            <table>
                <caption>Top 30 Tracks Chart</caption>
                <th>Name</th>
                <th>Artist</th>
                <th>Playcount</th>
                <th>Listeners</th>
                {tracks.map(track => (
                    <tr key={track.id}>
                        <td>{track.name}</td>
                        <td>{track.artist.name}</td>
                        <td>{track.playcount}</td>
                        <td>{track.listeners}</td>
                    </tr>
                ))}
            </table>
            </div>
        );
    }
    else if (artists && !tracks) {
        
        return (
            <div>
            <table>
                <caption>Top 30 Artists Chart</caption>
                <th>Artist</th>
                <th>Playcount</th>
                <th>Listeners</th>
                {artists.map(artist => (
                    <tr key={artist.id}>
                        <td>{artist.name}</td>
                        <td>{artist.playcount}</td>
                        <td>{artist.listeners}</td>
                    </tr>
                ))}
            </table>
            </div>
        );
    }
     else if (tracks && !artists) {
        return (
            <div>
            <table>
                <caption>Top 30 Tracks Chart</caption>
                <th>Name</th>
                <th>Playcount</th>
                <th>Listeners</th>
                {tracks.map(track => (
                    <tr key={track.id}>
                        <td>{track.name}</td>
                        <td>{track.playcount}</td>
                        <td>{track.listeners}</td>
                    </tr>
                ))}
            </table>
            </div>
        );
    }
    else {
        return (<div></div>)
    }
}