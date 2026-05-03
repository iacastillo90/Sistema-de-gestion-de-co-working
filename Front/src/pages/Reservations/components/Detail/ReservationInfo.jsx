import EstadoBadge from '../Common/EstadoBadge';

function ReservationInfo({ 
  space, 
  reservation, 
  cantidadHoras, 
  editingNota, 
  setEditingNota, 
  notaValue, 
  setNotaValue, 
  handleSaveNota 
}) {
  return (
    <div className="premium-card mb-4">
      <div className="card-body p-0">
        {space.imagen && (
          <div style={{ width: '100%', height: '220px', overflow: 'hidden', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
            <img src={space.imagen} alt={space.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}
        <div className="p-4 p-lg-5">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h3 className="fw-bold mb-0">{space.nombre}</h3>
            <EstadoBadge estado={reservation.estado} />
          </div>
          
          <p className="text-muted">{space.descripcion}</p>
          
          <div className="row g-3 mt-4">
            <div className="col-md-6">
              <div className="p-3 bg-light rounded-3 d-flex align-items-center gap-3">
                <div className="text-primary fs-4"><i className="fas fa-calendar-alt"></i></div>
                <div>
                  <small className="text-muted d-block">Fecha</small>
                  <span className="fw-bold">{reservation.fecha}</span>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-3 bg-light rounded-3 d-flex align-items-center gap-3">
                <div className="text-primary fs-4"><i className="fas fa-clock"></i></div>
                <div>
                  <small className="text-muted d-block">Horario</small>
                  <span className="fw-bold">{reservation.hora_inicio} - {reservation.hora_fin} ({cantidadHoras} hrs)</span>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-3 bg-light rounded-3 d-flex align-items-center gap-3">
                <div className="text-primary fs-4"><i className="fas fa-users"></i></div>
                <div>
                  <small className="text-muted d-block">Capacidad Autorizada</small>
                  <span className="fw-bold">Hasta {space.capacidad} personas</span>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="p-3 bg-light rounded-3 d-flex align-items-start gap-3">
                <div className="text-primary fs-4 mt-1"><i className="fas fa-map-marker-alt"></i></div>
                <div className="flex-grow-1">
                  <small className="text-muted d-block mb-1">Ubicación de la Sede</small>
                  {space.location_id ? (
                    <>
                      <span className="fw-bold d-block text-dark fs-6">{space.location_id.name}</span>
                      <span className="text-muted d-block small mt-1">
                        <i className="fas fa-map-pin me-1"></i>{space.location_id.address}, {space.location_id.city}, {space.location_id.country}
                      </span>
                    </>
                  ) : (
                    <span className="fw-bold d-block text-dark">{space.ubicacion}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Nota / Motivo */}
          <div className="mt-4 p-4 rounded-3 border" style={{ backgroundColor: '#fdfdfd' }}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="fw-bold mb-0 text-dark"><i className="fas fa-sticky-note me-2 text-warning"></i>Motivo / Nota de la Reserva</h6>
              {!editingNota && (
                <div className="d-flex gap-2">
                  {reservation.nota && (
                    <button className="btn btn-sm btn-outline-danger" onClick={() => { setNotaValue(''); handleSaveNota(''); }} style={{ padding: '0.1rem 0.5rem', fontSize: '0.8rem' }}>
                      <i className="fas fa-trash me-1"></i>Borrar
                    </button>
                  )}
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => setEditingNota(true)} style={{ padding: '0.1rem 0.5rem', fontSize: '0.8rem' }}>
                    <i className="fas fa-edit me-1"></i>{reservation.nota ? 'Editar' : 'Agregar Nota'}
                  </button>
                </div>
              )}
            </div>
            
            {editingNota ? (
              <div className="mt-2">
                <textarea 
                  className="form-control mb-2" 
                  rows="2" 
                  placeholder="Ej: Reunión con cliente importante, necesito proyector..."
                  value={notaValue} 
                  onChange={e => setNotaValue(e.target.value)}
                ></textarea>
                <div className="d-flex gap-2 justify-content-end">
                  <button className="btn btn-sm btn-light" onClick={() => { setNotaValue(reservation.nota || ''); setEditingNota(false); }}>Cancelar</button>
                  <button className="btn btn-sm btn-primary" onClick={() => handleSaveNota()}>Guardar</button>
                </div>
              </div>
            ) : (
              <p className="text-muted mb-0 mt-2" style={{ whiteSpace: 'pre-wrap' }}>
                {reservation.nota ? reservation.nota : <i>No se agregó ninguna nota a esta reserva.</i>}
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default ReservationInfo;
