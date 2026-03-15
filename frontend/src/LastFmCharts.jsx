function formatNum(n) {
  const num = parseInt(n);
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return Math.round(num / 1_000) + "K";
  return num.toString();
}

function ArtistsChart({ artists }) {
  return (
    <div className="chart-card">
      <div className="chart-title">Top Artists</div>
      <ul className="chart-list">
        {artists.map((artist, i) => (
          <li key={i} className="chart-item">
            <span className={`chart-rank${i < 3 ? " top-three" : ""}`}>
              {i + 1}
            </span>
            <div className="chart-item-info">
              <div className="chart-item-name">{artist.name}</div>
              <div className="chart-item-sub">
                {formatNum(artist.listeners)} listeners
              </div>
            </div>
            <span className="chart-item-stat">
              {formatNum(artist.playcount)} plays
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TracksChart({ tracks }) {
  return (
    <div className="chart-card">
      <div className="chart-title">Top Tracks</div>
      <ul className="chart-list">
        {tracks.map((track, i) => (
          <li key={i} className="chart-item">
            <span className={`chart-rank${i < 3 ? " top-three" : ""}`}>
              {i + 1}
            </span>
            <div className="chart-item-info">
              <div className="chart-item-name">{track.name}</div>
              <div className="chart-item-sub">{track.artist.name}</div>
            </div>
            <span className="chart-item-stat">
              {formatNum(track.playcount)} plays
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function LastFmCharts({ artists, tracks }) {
  if (!artists && !tracks) return null;

  return (
    <div className="charts-section">
      <div className="section-header">
        <h2>Trending Now</h2>
      </div>
      <div className="charts-grid">
        {artists && <ArtistsChart artists={artists} />}
        {tracks && <TracksChart tracks={tracks} />}
      </div>
    </div>
  );
}
