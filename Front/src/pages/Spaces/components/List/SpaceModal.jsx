export function SpaceModal({
  showModal,
  setShowModal,
  editing,
  handleSubmit,
  form,
  setForm,
  locations,
  showNewLocation,
  setShowNewLocation,
  locForm,
  setLocForm
}) {
  if (!showModal) return null;

  return (
    <div className="modal fade show d-block premium-modal" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{editing ? 'Editar Espacio' : 'Nuevo Espacio'}</h5>
            <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label-premium">Nombre del espacio</label>
                  <input className="form-control-premium w-100" required value={form.nombre}
                    onChange={e => setForm({ ...form, nombre: e.target.value })} />
                </div>

                <div className="col-md-6">
                  <label className="form-label-premium">Capacidad (personas)</label>
                  <input type="number" className="form-control-premium w-100" required value={form.capacidad}
                    onChange={e => setForm({ ...form, capacidad: e.target.value })} />
                </div>

                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-end mb-2">
                    <label className="form-label-premium mb-0">Sede (Ubicación)</label>
                    {!showNewLocation && (
                      <button type="button" className="btn btn-sm btn-outline-primary" style={{ padding: '0.1rem 0.5rem', fontSize: '0.8rem' }}
                        onClick={() => setShowNewLocation(true)}>
                        <i className="fas fa-plus me-1"></i>Crear Sede
                      </button>
                    )}
                  </div>

                  {!showNewLocation ? (
                    <select className="form-select-premium w-100" required={!form.ubicacion}
                      value={form.location_id} onChange={e => setForm({ ...form, location_id: e.target.value })}>
                      <option value="">Selecciona una Sede...</option>
                      {locations.map(loc => (
                        <option key={loc._id} value={loc._id}>{loc.name} - {loc.city}</option>
                      ))}
                      {/* Compatibilidad si editamos un espacio que solo tiene string de ubicacion */}
                      {!form.location_id && form.ubicacion && (
                        <option value="" disabled>Actual: {form.ubicacion} (Selecciona una sede real)</option>
                      )}
                    </select>
                  ) : (
                    <div className="p-3 rounded border" style={{ background: '#f8f9fa' }}>
                      <div className="d-flex justify-content-between mb-2">
                        <h6 className="fw-bold mb-0 text-primary"><i className="fas fa-map-marker-alt me-1"></i>Nueva Sede Rápida</h6>
                        <button type="button" className="btn-close" style={{ transform: 'scale(0.7)' }} onClick={() => setShowNewLocation(false)}></button>
                      </div>
                      <div className="row g-2">
                        <div className="col-md-6">
                          <input type="text" className="form-control form-control-sm" placeholder="Nombre Sede" required
                            value={locForm.name} onChange={e => setLocForm({ ...locForm, name: e.target.value })} />
                        </div>
                        <div className="col-md-6">
                          <input type="text" className="form-control form-control-sm" placeholder="Ciudad" required
                            value={locForm.city} onChange={e => setLocForm({ ...locForm, city: e.target.value })} />
                        </div>
                        <div className="col-md-6">
                          <input type="text" className="form-control form-control-sm" placeholder="Dirección" required
                            value={locForm.address} onChange={e => setLocForm({ ...locForm, address: e.target.value })} />
                        </div>
                        <div className="col-md-6">
                          <input type="text" className="form-control form-control-sm" placeholder="País" required
                            value={locForm.country} onChange={e => setLocForm({ ...locForm, country: e.target.value })} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="form-label-premium">Precio x Hora ($)</label>
                  <input type="number" className="form-control-premium w-100" required value={form.precio}
                    onChange={e => setForm({ ...form, precio: e.target.value })} />
                </div>
                <div className="col-md-6">
                  <label className="form-label-premium">URL de Imagen</label>
                  <input className="form-control-premium w-100" value={form.imagen}
                    onChange={e => setForm({ ...form, imagen: e.target.value })} placeholder="https://..." />
                </div>
                <div className="col-12">
                  <label className="form-label-premium">Descripción</label>
                  <textarea className="form-control-premium w-100" rows="3" required value={form.descripcion}
                    onChange={e => setForm({ ...form, descripcion: e.target.value })}></textarea>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
              <button type="submit" className="btn-primary-red">
                {editing ? 'Guardar cambios' : 'Crear espacio'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
