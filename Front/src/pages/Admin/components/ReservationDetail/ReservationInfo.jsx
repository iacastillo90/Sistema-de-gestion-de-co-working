export function EstadoBadge({ estado }) {
  const cls = {
    Confirmada: 'badge-estado badge-confirmada',
    Cancelada:  'badge-estado badge-cancelada',
    Pendiente:  'badge-estado badge-pendiente',
  };
  const ico = {
    Confirmada: 'fa-check-circle',
    Cancelada:  'fa-times-circle',
    Pendiente:  'fa-clock',
  };
  return (
    <span className={cls[estado] ?? 'badge-estado badge-cancelada'}>
      <i className={`fas ${ico[estado] ?? 'fa-circle'}`}></i>
      {estado}
    </span>
  );
}

export function ReservationInfo({ reservation, space, cantidadHoras }) {
  return (
    <div className="premium-card mb-4">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start mb-4">
          <h4 className="fw-bold mb-0">Información del Evento</h4>
          <EstadoBadge estado={reservation.estado} />
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="p-3 bg-light rounded d-flex gap-3">
              <i className="fas fa-building fs-4 text-primary"></i>
              <div>
                <small className="text-muted d-block">Espacio</small>
                <span className="fw-bold">{space.nombre}</span>
                <span className="d-block small text-muted mt-1">{space.location_id?.name || space.ubicacion}</span>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3 bg-light rounded d-flex gap-3">
              <i className="fas fa-clock fs-4 text-primary"></i>
              <div>
                <small className="text-muted d-block">Horario</small>
                <span className="fw-bold">{reservation.fecha}</span>
                <span className="d-block small mt-1">{reservation.hora_inicio} - {reservation.hora_fin} ({cantidadHoras} hrs)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 border rounded" style={{ backgroundColor: '#fff9e6', borderColor: '#ffeeba' }}>
          <h6 className="fw-bold mb-2 text-dark"><i className="fas fa-sticky-note me-2 text-warning"></i>Requerimientos / Notas del Cliente</h6>
          <p className="text-muted mb-0" style={{ whiteSpace: 'pre-wrap' }}>
            {reservation.nota ? reservation.nota : <i>El cliente no agregó notas.</i>}
          </p>
        </div>
      </div>
    </div>
  );
}
