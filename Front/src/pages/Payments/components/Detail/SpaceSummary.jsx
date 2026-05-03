import { Link } from 'react-router-dom';

function SpaceSummary({ space, reservation, cantidadHoras }) {
  return (
    <div className="premium-card mb-4" style={{ overflow: 'hidden' }}>
      {space?.imagen ? (
        <div style={{ position: 'relative', height: '180px' }}>
          <img src={space.imagen} alt={space.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 35%, rgba(0,0,0,0.7))' }}></div>
          <div style={{ position: 'absolute', bottom: '1rem', left: '1.5rem' }}>
            <h4 className="text-white fw-bold mb-0">{space.nombre}</h4>
            <small className="text-white-50"><i className="fas fa-map-marker-alt me-1"></i>{space.location_id?.name || space.ubicacion}</small>
          </div>
        </div>
      ) : (
        <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: '120px' }}>
          <div className="text-center text-muted">
            <i className="fas fa-building fs-1 mb-1 d-block"></i>
            <span className="fw-bold">{space?.nombre || 'Espacio de Trabajo'}</span>
          </div>
        </div>
      )}

      <div className="card-body p-4">
        <div className="row g-3">
          <div className="col-sm-4 text-center">
            <div className="text-muted small mb-1"><i className="fas fa-calendar-alt me-1"></i>Fecha reserva</div>
            <div className="fw-bold">{reservation?.fecha || '—'}</div>
          </div>
          <div className="col-sm-4 text-center">
            <div className="text-muted small mb-1"><i className="fas fa-clock me-1"></i>Horario</div>
            <div className="fw-bold">{reservation ? `${reservation.hora_inicio} – ${reservation.hora_fin}` : '—'}</div>
          </div>
          <div className="col-sm-4 text-center">
            <div className="text-muted small mb-1"><i className="fas fa-hourglass-half me-1"></i>Duración</div>
            <div className="fw-bold">{cantidadHoras > 0 ? `${cantidadHoras} hrs` : '—'}</div>
          </div>
        </div>

        {reservation?.nota && (
          <div className="mt-3 p-3 bg-light rounded" style={{ borderLeft: '3px solid #ffc107' }}>
            <small className="text-muted"><i className="fas fa-sticky-note me-1"></i><strong>Nota de reserva:</strong> {reservation.nota}</small>
          </div>
        )}

        {reservation && (
          <div className="mt-3">
            <Link to={`/reservas/${reservation._id}`} className="btn btn-outline-secondary btn-sm">
              <i className="fas fa-eye me-1"></i>Ver Detalle de Reserva
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default SpaceSummary;
