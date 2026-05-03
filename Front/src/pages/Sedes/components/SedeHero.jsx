/**
 * SedeHero.jsx
 * Atomic component — Hero section for every Sede page.
 * Props:
 *  - bgImage    {string}  URL of the background photo
 *  - badge      {string}  Location label shown in the pill badge
 *  - title      {string}  First line of the H1
 *  - subtitle   {string}  Red-highlighted second line of the H1
 *  - description{string}  Lead paragraph
 *  - stats      {Array<{value, label}>}  Bottom stat grid
 */
function SedeHero({ bgImage, badge, title, subtitle, description, stats = [] }) {
  return (
    <section className="sede-hero">
      <div
        className="sede-hero-bg"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      <div className="sede-hero-overlay" />
      <div className="container sede-hero-content">
        <div className="row">
          <div className="col-lg-8">
            <div className="sede-hero-badge">
              <i className="fas fa-map-marker-alt" />
              {badge}
            </div>

            <h1>
              {title}
              {subtitle && (
                <>
                  <br />
                  <span style={{ color: '#ff6b6b' }}>{subtitle}</span>
                </>
              )}
            </h1>

            <p
              className="lead"
              style={{ color: 'rgba(255,255,255,0.82)', maxWidth: '540px' }}
            >
              {description}
            </p>

            {stats.length > 0 && (
              <div className="sede-hero-stats">
                {stats.map((s, i) => (
                  <div key={i} className="sede-stat">
                    <div className="sede-stat-value">{s.value}</div>
                    <div className="sede-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SedeHero;
