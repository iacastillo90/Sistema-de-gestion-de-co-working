function SpaceDetailsForm({ 
  form, 
  setForm, 
  spaces, 
  selectedSpace, 
  timeOptions, 
  occupiedTimes 
}) {
  return (
    <div className="premium-card h-100" style={{ overflow: 'hidden' }}>
      {selectedSpace?.imagen && (
        <div style={{ width: '100%', height: '180px', position: 'relative' }}>
          <img src={selectedSpace.imagen} alt={selectedSpace.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', padding: '1.5rem', color: 'white' }}>
            <h4 className="mb-0 fw-bold">{selectedSpace.nombre}</h4>
            <small><i className="fas fa-map-marker-alt me-1"></i>{selectedSpace.location_id?.name || selectedSpace.ubicacion}</small>
          </div>
        </div>
      )}
      
      <div className="card-body p-4 p-lg-5">
        {!selectedSpace?.imagen && <h6 className="fw-bold mb-4">Detalles del Espacio</h6>}

        <div className="mb-4">
          <label className="form-label-premium">Elegir Espacio</label>
          <select
            className="form-select-premium w-100"
            value={form.space_id}
            onChange={e => setForm({ ...form, space_id: e.target.value })}
            required
          >
            <option value="">Seleccionar espacio disponible...</option>
            {spaces.map(s => (
              <option key={s._id} value={s._id}>
                {s.nombre} · {s.location_id?.name || s.ubicacion} · ${s.precio?.toLocaleString?.() ?? s.precio}/hr
              </option>
            ))}
          </select>
        </div>

        {selectedSpace && (
          <div className="d-flex align-items-center justify-content-between p-3 rounded-3 mb-4"
            style={{ background: '#f8f9fa', border: '1px solid #e9ecef' }}>
            <div className="d-flex align-items-center gap-3">
              <div className="bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: '45px', height: '45px' }}>
                <i className="fas fa-users text-primary"></i>
              </div>
              <div>
                <small className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Capacidad</small>
                <span className="fw-bold">{selectedSpace.capacidad} personas</span>
              </div>
            </div>
            <div className="text-end">
              <small className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Tarifa</small>
              <span className="fw-bold fs-5 text-success">${selectedSpace.precio ? Math.round(selectedSpace.precio) : 5}</span><small className="text-muted">/hr</small>
            </div>
          </div>
        )}

        <div className="mb-4">
          <label className="form-label-premium">Fecha del evento</label>
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0 text-primary"><i className="fas fa-calendar-alt"></i></span>
            <input
              type="date"
              className="form-control-premium border-start-0 ps-0"
              value={form.fecha}
              onChange={e => setForm({ ...form, fecha: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
              required
              style={{ boxShadow: 'none' }}
            />
          </div>
        </div>

        <div className="row g-4">
          <div className="col-6">
            <label className="form-label-premium">Hora de Inicio</label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0 text-primary"><i className="fas fa-clock"></i></span>
              <select 
                className="form-select-premium border-start-0 ps-0 w-100" 
                value={form.hora_inicio} 
                onChange={e => setForm({ ...form, hora_inicio: e.target.value })}
                required
                style={{ boxShadow: 'none' }}
              >
                <option value="">Seleccionar...</option>
                {timeOptions.map(t => {
                  const isOcc = occupiedTimes.has(t);
                  return <option key={`start-${t}`} value={t} disabled={isOcc}>{t} {isOcc ? '(Ocupado)' : ''}</option>;
                })}
              </select>
            </div>
          </div>
          <div className="col-6">
            <label className="form-label-premium">Hora de Fin</label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0 text-primary"><i className="fas fa-hourglass-end"></i></span>
              <select 
                className="form-select-premium border-start-0 ps-0 w-100" 
                value={form.hora_fin} 
                onChange={e => setForm({ ...form, hora_fin: e.target.value })}
                required
                style={{ boxShadow: 'none' }}
              >
                <option value="">Seleccionar...</option>
                {timeOptions.map(t => {
                  if (form.hora_inicio && timeOptions.indexOf(t) <= timeOptions.indexOf(form.hora_inicio)) {
                    return <option key={`end-${t}`} value={t} disabled>{t}</option>;
                  }
                  let crossesOccupied = false;
                  if (form.hora_inicio) {
                    const sIdx = timeOptions.indexOf(form.hora_inicio);
                    const eIdx = timeOptions.indexOf(t);
                    for (let i = sIdx; i < eIdx; i++) {
                      if (occupiedTimes.has(timeOptions[i])) crossesOccupied = true;
                    }
                  }
                  if (crossesOccupied) {
                    return <option key={`end-${t}`} value={t} disabled>{t} (Ocupado)</option>;
                  }
                  return <option key={`end-${t}`} value={t}>{t}</option>;
                })}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="form-label-premium">
            Motivo / Nota Adicional <span className="text-muted fw-normal">(Opcional)</span>
          </label>
          <textarea
            className="form-control-premium w-100"
            rows="2"
            placeholder="Ej: Reunión con cliente importante, necesito proyector..."
            value={form.nota}
            onChange={e => setForm({ ...form, nota: e.target.value })}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default SpaceDetailsForm;
