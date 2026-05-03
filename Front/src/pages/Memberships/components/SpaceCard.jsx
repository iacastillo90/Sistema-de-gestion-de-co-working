import { Link } from 'react-router-dom';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80';

const TIPO_CONFIG = {
  sala:       { color: 'bg-primary',   icon: 'fa-users',       label: 'Sala' },
  oficina:    { color: 'bg-success',   icon: 'fa-building',    label: 'Oficina' },
  escritorio: { color: 'bg-warning',   icon: 'fa-desktop',     label: 'Escritorio' },
  coworking:  { color: 'bg-info',      icon: 'fa-laptop-house',label: 'Coworking' },
};

function SpaceCard({ space, location }) {
  const tipo = space.tipo?.toLowerCase();
  const tipoConf = TIPO_CONFIG[tipo] || { color: 'bg-secondary', icon: 'fa-door-open', label: space.tipo || 'Espacio' };
  const locationName = location?.name || space.ubicacion || 'JAFFA CoWork';
  const locationCity = location?.city ? ` • ${location.city}` : '';

  const features = [
    `Capacidad: ${space.capacidad} persona${space.capacidad !== 1 ? 's' : ''}`,
    location?.phone ? `Tel: ${location.phone}` : 'Wifi incluido',
    `Precio: $${Number(space.precio).toLocaleString()} / hr`,
  ];

  return (
    <div className="col-12 col-sm-6 col-xl-4">
      <div className="space-card">
        {/* Image */}
        <div className="space-card-image">
          <img
            src={space.imagen || PLACEHOLDER}
            alt={space.nombre}
            onError={e => { e.target.src = PLACEHOLDER; }}
          />
          <div className="space-card-image-overlay" />

          {/* Tipo badge */}
          <span className={`space-card-badge-tipo ${tipoConf.color} bg-opacity-85 text-white`}>
            <i className={`fas ${tipoConf.icon} me-1`}></i>{tipoConf.label}
          </span>

          {/* Price badge */}
          <span className="space-card-price">
            ${Number(space.precio).toLocaleString()}<span style={{ opacity: 0.7, fontSize: '0.7rem' }}>/hr</span>
          </span>
        </div>

        {/* Body */}
        <div className="space-card-body">
          {/* Disponibilidad */}
          <div>
            <span className={`disponibilidad-dot ${space.disponibilidad ? 'available' : 'unavailable'}`}></span>
            <span style={{ fontSize: '0.75rem', color: space.disponibilidad ? '#198754' : '#dc3545', fontWeight: 600 }}>
              {space.disponibilidad ? 'Disponible' : 'No disponible'}
            </span>
          </div>

          <h3 className="space-card-title">{space.nombre}</h3>

          <p className="space-card-location">
            <i className="fas fa-map-marker-alt text-danger"></i>
            {locationName}{locationCity}
          </p>

          {space.descripcion && (
            <p style={{ fontSize: '0.82rem', color: '#6c757d', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {space.descripcion}
            </p>
          )}

          <ul className="space-card-features">
            {features.map((f, i) => (
              <li key={i}>
                <i className="fas fa-check-circle"></i>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="space-card-footer">
          {space.disponibilidad ? (
            <Link to={`/reservas/nueva?spaceId=${space._id}`} className="btn-reservar">
              <i className="fas fa-calendar-plus"></i>Reservar
            </Link>
          ) : (
            <span className="btn-reservar" style={{ background: '#6c757d', cursor: 'not-allowed', opacity: 0.7 }}>
              <i className="fas fa-ban"></i>No disponible
            </span>
          )}
          <Link to={`/espacios/${space._id}`} className="btn-ver-detalle" title="Ver detalle">
            <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SpaceCard;
