import EstadoBadge from '../Common/EstadoBadge';

function ReservationCard({ res, space, users, isAdmin, navigate }) {
  let cantidadHoras = 0;
  if (res.hora_inicio && res.hora_fin) {
    const start = new Date(`1970-01-01T${res.hora_inicio}`);
    const end = new Date(`1970-01-01T${res.hora_fin}`);
    if (end > start) cantidadHoras = (end - start) / (1000 * 60 * 60);
  }
  const montoEstimado = Math.round(cantidadHoras * (space.precio ? Math.round(space.precio) : 5));

  return (
    <div className="col-md-6 col-xl-4">
      <div className="premium-card h-100 d-flex flex-column" style={{ overflow: 'hidden' }}>
        {space.imagen ? (
          <div style={{ width: '100%', height: '120px', overflow: 'hidden' }}>
            <img src={space.imagen} alt={space.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ) : (
          <div className="bg-light d-flex align-items-center justify-content-center" style={{ width: '100%', height: '120px' }}>
            <i className="fas fa-building text-muted fs-1"></i>
          </div>
        )}

        <div className="card-body p-4 d-flex flex-column flex-grow-1">
          <div className="d-flex justify-content-between align-items-start mb-3 gap-2">
            <div>
              <div className="fw-bold fs-5 text-dark">{space.nombre}</div>
              <small className="text-muted"><i className="fas fa-calendar-day me-1"></i>{res.fecha}</small>
            </div>
            <EstadoBadge estado={res.estado} />
          </div>

          <div className="d-flex flex-column gap-2 mb-4">
            <div className="info-row">
              <i className="fas fa-map-marker-alt text-primary"></i>{space.location_id?.name || space.ubicacion}
            </div>
            <div className="info-row">
              <i className="fas fa-clock"></i>{res.hora_inicio} – {res.hora_fin} ({cantidadHoras} hrs)
            </div>
            <div className="info-row fw-bold text-success">
              <i className="fas fa-dollar-sign"></i>{montoEstimado.toLocaleString()}
            </div>
            {isAdmin && (
              <div className="info-row text-dark fw-semibold">
                <i className="fas fa-user text-info"></i>Cliente: {users.find(u => u._id === res.user_id)?.nombre || res.user_id.slice(-6)}
              </div>
            )}
            {res.nota && (
              <div
                className="info-row mt-2 p-2 bg-light rounded text-muted small reservation-nota"
                title={res.nota}
              >
                "{res.nota}"
              </div>
            )}
          </div>

          <div className="mt-auto pt-3 border-top">
            <button 
              className="btn btn-outline-danger w-100" 
              onClick={() => navigate(isAdmin ? `/admin/reservas/${res._id}` : `/reservas/${res._id}`)}
            >
              <i className="fas fa-eye me-2"></i>Ver Detalle y Gestionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationCard;
