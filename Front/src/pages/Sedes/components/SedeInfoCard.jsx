import { Link } from 'react-router-dom';

/**
 * SedeInfoCard.jsx
 * Atomic component — Sticky sidebar information card with an embedded
 * OpenStreetMap iframe and contact details.
 *
 * Props:
 *  - heading       {string}  Card title (e.g. "Información" / "Information")
 *  - rows          {Array<{icon, label, value}>}
 *  - mapSrc        {string}  Full OpenStreetMap embed URL
 *  - ctaLabel      {string}  Text for the CTA button
 *  - ctaTo         {string}  React Router path for the CTA button (default "/registro")
 */
function SedeInfoCard({
  heading = 'Información',
  rows = [],
  mapSrc,
  ctaLabel = 'Reservar un espacio',
  ctaTo = '/registro',
}) {
  return (
    <div className="sede-info-card">
      <h4>
        <i className="fas fa-map-marker-alt text-danger me-2" />
        {heading}
      </h4>

      {rows.map((row, i) => (
        <div key={i} className="sede-info-row">
          <i className={`fas ${row.icon}`} />
          <div>
            <div className="sede-info-row-label">{row.label}</div>
            <div className="sede-info-row-value">{row.value}</div>
          </div>
        </div>
      ))}

      {/* ── Embedded OpenStreetMap ──────────────────────────────── */}
      {mapSrc && (
        <div className="sede-map-wrapper">
          <iframe
            src={mapSrc}
            title="Mapa de la sede"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}

      <Link
        to={ctaTo}
        className="btn btn-danger w-100 mt-3 fw-bold"
        style={{ borderRadius: '12px', padding: '0.75rem' }}
      >
        <i className="fas fa-calendar-plus me-2" />
        {ctaLabel}
      </Link>
    </div>
  );
}

export default SedeInfoCard;
