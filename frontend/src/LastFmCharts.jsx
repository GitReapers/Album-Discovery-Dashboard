export default function LastFmCharts({ artists, tracks }) {
    if (artists && tracks) {
        return (
            <div>
                <table>
                    <caption>Top 30 Artists Chart</caption>
                    <thead>
                        <tr>
                            <th>Artist</th>
                            <th>Playcount</th>
                            <th>Listeners</th>
                        </tr>
                    </thead>
                    <tbody>
                        {artists.map((artist, index) => (
                            <tr key={index}>
                                <td>{artist.name}</td>
                                <td>{artist.playcount}</td>
                                <td>{artist.listeners}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <table>
                    <caption>Top 30 Tracks Chart</caption>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Artist</th>
                            <th>Playcount</th>
                            <th>Listeners</th>
                        </tr></thead>
                    <tbody>
                        {tracks.map((track, index) => (
                            <tr key={index}>
                                <td>{track.name}</td>
                                <td>{track.artist.name}</td>
                                <td>{track.playcount}</td>
                                <td>{track.listeners}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
    else if (artists && !tracks) {

        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <caption>Top 30 Artists Chart</caption>
                            <th>Artist</th>
                            <th>Playcount</th>
                            <th>Listeners</th>
                            <tbody>
                                {artists.map((artist, index) => (
                                    <tr key={index}>
                                        <td>{artist.name}</td>
                                        <td>{artist.playcount}</td>
                                        <td>{artist.listeners}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </tr>
                    </thead>
                </table>
            </div>
        );
    }
    else if (tracks && !artists) {
        return (
            <div>
                <table>
                    <caption>Top 30 Tracks Chart</caption>
                    <thead>

                        <tr>
                            <th>Name</th>
                            <th>Playcount</th>
                            <th>Listeners</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tracks.map((track, index) => (
                            <tr key={index}>
                                <td>{track.name}</td>
                                <td>{track.playcount}</td>
                                <td>{track.listeners}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
    else {
        return (<div></div>)
    }
}