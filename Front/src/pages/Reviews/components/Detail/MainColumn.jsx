import { Stars } from '../Common/Stars';

export function MainColumn({ space, location, review, ratingLabel, date }) {
  return (
    <div className="col-lg-8">
      {/* Space banner */}
      <div className="premium-card mb-4" style={{ overflow: 'hidden' }}>
        {space?.imagen ? (
          <div style={{ position: 'relative', height: '220px' }}>
            <img src={space.imagen} alt={space.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 40%, rgba(0,0,0,0.75))' }}></div>
            <div style={{ position: 'absolute', bottom: '1.2rem', left: '1.5rem' }}>
              <h4 className="text-white fw-bold mb-0">{space.nombre}</h4>
              {location && <small className="text-white-50"><i className="fas fa-map-marker-alt me-1"></i>{location.name}</small>}
            </div>
            {/* Big rating overlay */}
            <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.55)', borderRadius: '12px', padding: '0.4rem 0.8rem', backdropFilter: 'blur(4px)' }}>
              <Stars n={review.calificacion} size="1rem" />
            </div>
          </div>
        ) : (
          <div className="bg-light d-flex align-items-center justify-content-center p-4" style={{ minHeight: '100px' }}>
            <div className="text-center text-muted">
              <i className="fas fa-building fs-1 mb-1 d-block"></i>
              <span className="fw-bold">{space?.nombre || 'Espacio de Trabajo'}</span>
            </div>
          </div>
        )}

        {/* Space details */}
        {space && (
          <div className="card-body p-4">
            <div className="row g-3">
              {space.capacidad && (
                <div className="col-sm-4 text-center">
                  <div className="text-muted small mb-1"><i className="fas fa-users me-1"></i>Capacidad</div>
                  <div className="fw-bold">{space.capacidad} personas</div>
                </div>
              )}
              {space.precio && (
                <div className="col-sm-4 text-center">
                  <div className="text-muted small mb-1"><i className="fas fa-dollar-sign me-1"></i>Tarifa</div>
                  <div className="fw-bold text-success">${Number(space.precio).toLocaleString()}/hr</div>
                </div>
              )}
              {space.disponibilidad !== undefined && (
                <div className="col-sm-4 text-center">
                  <div className="text-muted small mb-1"><i className="fas fa-circle me-1"></i>Disponibilidad</div>
                  <div className={`fw-bold ${space.disponibilidad ? 'text-success' : 'text-danger'}`}>
                    {space.disponibilidad ? 'Disponible' : 'No disponible'}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Review content */}
      <div className="premium-card mb-4">
        <div className="card-body p-4 p-lg-5">
          {/* Rating hero */}
          <div className="text-center mb-4 py-3" style={{ background: 'linear-gradient(135deg, rgba(255,193,7,0.08), rgba(255,193,7,0.03))', borderRadius: '16px', border: '1px solid rgba(255,193,7,0.15)' }}>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: '#ffc107', lineHeight: 1 }}>{review.calificacion}</div>
            <Stars n={review.calificacion} size="1.4rem" />
            <div className="fw-bold mt-2" style={{ color: '#ffc107' }}>{ratingLabel}</div>
          </div>

          <h6 className="fw-bold text-muted small text-uppercase mb-3 tracking-wide">Opinión del usuario</h6>
          <blockquote style={{ borderLeft: '4px solid var(--primary-red)', paddingLeft: '1.25rem', fontSize: '1.05rem', lineHeight: '1.75', color: 'var(--text)', fontStyle: 'italic' }}>
            "{review.comentario}"
          </blockquote>

          <div className="mt-4 text-muted small">
            <i className="fas fa-calendar-alt me-1"></i>Publicado el {date}
          </div>
        </div>
      </div>
    </div>
  );
}
