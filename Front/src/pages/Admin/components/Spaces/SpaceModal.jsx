export function SpaceModal({ showModal, setShowModal, editing, handleSubmit, form, setForm, locations, submitting }) {
  if (!showModal) return null;

  return (
    <div className="modal fade show d-block premium-modal" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
        <div className="modal-content" style={{ borderTop: '6px solid var(--primary-red)' }}>
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold">
              <i className={`fas ${editing ? 'fa-edit' : 'fa-plus-circle'} me-2 text-danger`}></i>
              {editing ? `Editar — ${editing.nombre}` : 'Nuevo Espacio'}
            </h5>
            <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4">
              {/* Preview */}
              {form.imagen && (
                <div className="mb-4">
                  <img src={form.imagen} alt="preview" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '12px' }}
                    onError={e => { e.target.style.display = 'none'; }} />
                </div>
              )}
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label-premium">Nombre <span className="text-danger">*</span></label>
                  <input className="form-control" required value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })}
                    placeholder="Ej: Sala Ejecutiva A" style={{ borderRadius: '10px' }} />
                </div>
                <div className="col-md-6">
                  <label className="form-label-premium">Sede <span className="text-danger">*</span></label>
                  <select className="form-select" required value={form.location_id} onChange={e => setForm({ ...form, location_id: e.target.value })} style={{ borderRadius: '10px' }}>
                    <option value="">Seleccionar sede...</option>
                    {locations.map(l => <option key={l._id} value={l._id}>{l.name} — {l.city}</option>)}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label-premium">Tipo</label>
                  <select className="form-select" value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })} style={{ borderRadius: '10px' }}>
                    <option value="">Sin tipo</option>
                    <option value="sala">Sala</option>
                    <option value="oficina">Oficina</option>
                    <option value="escritorio">Escritorio</option>
                    <option value="coworking">Coworking</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label-premium">Capacidad <span className="text-danger">*</span></label>
                  <input type="number" min="1" className="form-control" required value={form.capacidad}
                    onChange={e => setForm({ ...form, capacidad: e.target.value })}
                    placeholder="Ej: 10" style={{ borderRadius: '10px' }} />
                </div>
                <div className="col-md-6">
                  <label className="form-label-premium">Precio (CLP) <span className="text-danger">*</span></label>
                  <input type="number" min="0" className="form-control" required value={form.precio}
                    onChange={e => setForm({ ...form, precio: e.target.value })}
                    placeholder="Ej: 25000" style={{ borderRadius: '10px' }} />
                </div>
                <div className="col-12">
                  <label className="form-label-premium">URL de Imagen</label>
                  <input className="form-control" value={form.imagen}
                    onChange={e => setForm({ ...form, imagen: e.target.value })}
                    placeholder="https://..." style={{ borderRadius: '10px' }} />
                </div>
                <div className="col-12">
                  <label className="form-label-premium">Descripción</label>
                  <textarea className="form-control" rows={3} value={form.descripcion}
                    onChange={e => setForm({ ...form, descripcion: e.target.value })}
                    placeholder="Descripción del espacio, amenidades, etc."
                    style={{ borderRadius: '10px', resize: 'none' }} />
                </div>
              </div>
            </div>
            <div className="modal-footer border-0">
              <button type="button" className="btn btn-light fw-bold px-4" onClick={() => setShowModal(false)}>Cancelar</button>
              <button type="submit" className="btn-primary-red" disabled={submitting}>
                {submitting
                  ? <><span className="spinner-border spinner-border-sm me-2"></span>Guardando...</>
                  : <><i className={`fas ${editing ? 'fa-save' : 'fa-check'} me-2`}></i>{editing ? 'Guardar cambios' : 'Crear espacio'}</>
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
