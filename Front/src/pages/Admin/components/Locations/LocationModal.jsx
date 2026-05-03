export function LocationModal({ showModal, setShowModal, editing, handleSubmit, form, setForm, submitting }) {
  if (!showModal) return null;

  return (
    <div className="modal fade show d-block premium-modal" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
        <div className="modal-content" style={{ borderTop: '6px solid var(--primary-red)' }}>
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold">
              <i className={`fas ${editing ? 'fa-edit' : 'fa-plus-circle'} me-2 text-danger`}></i>
              {editing ? `Editar — ${editing.name}` : 'Nueva Sede'}
            </h5>
            <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4">

              {/* Preview imagen */}
              {form.imagen && (
                <div className="mb-4 text-center">
                  <img
                    src={form.imagen}
                    alt="Preview"
                    style={{ width: '100%', maxHeight: '160px', objectFit: 'cover', borderRadius: '12px' }}
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                </div>
              )}

              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label-premium">Nombre de la Sede <span className="text-danger">*</span></label>
                  <input className="form-control" required value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Ej: JAFFA Providencia" style={{ borderRadius: '10px' }} />
                </div>
                <div className="col-12">
                  <label className="form-label-premium">Dirección <span className="text-danger">*</span></label>
                  <input className="form-control" required value={form.address}
                    onChange={e => setForm({ ...form, address: e.target.value })}
                    placeholder="Ej: Av. Providencia 1234" style={{ borderRadius: '10px' }} />
                </div>
                <div className="col-md-6">
                  <label className="form-label-premium">Ciudad <span className="text-danger">*</span></label>
                  <input className="form-control" required value={form.city}
                    onChange={e => setForm({ ...form, city: e.target.value })}
                    placeholder="Santiago" style={{ borderRadius: '10px' }} />
                </div>
                <div className="col-md-6">
                  <label className="form-label-premium">País <span className="text-danger">*</span></label>
                  <input className="form-control" required value={form.country}
                    onChange={e => setForm({ ...form, country: e.target.value })}
                    placeholder="Chile" style={{ borderRadius: '10px' }} />
                </div>
                <div className="col-md-6">
                  <label className="form-label-premium">Teléfono <span className="text-muted fw-normal">(opcional)</span></label>
                  <input className="form-control" value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="+56 2 2345 6789" style={{ borderRadius: '10px' }} />
                </div>
                <div className="col-md-6">
                  <label className="form-label-premium">URL de Imagen <span className="text-muted fw-normal">(opcional)</span></label>
                  <input className="form-control" value={form.imagen}
                    onChange={e => setForm({ ...form, imagen: e.target.value })}
                    placeholder="https://..." style={{ borderRadius: '10px' }} />
                </div>
                <div className="col-12">
                  <label className="form-label-premium">Descripción <span className="text-muted fw-normal">(opcional)</span></label>
                  <textarea className="form-control" rows={3} value={form.descripcion}
                    onChange={e => setForm({ ...form, descripcion: e.target.value })}
                    placeholder="Describe brevemente esta sede, sus características, accesos, etc."
                    style={{ borderRadius: '10px', resize: 'none' }}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer border-0">
              <button type="button" className="btn btn-light fw-bold px-4" onClick={() => setShowModal(false)}>Cancelar</button>
              <button type="submit" className="btn-primary-red" disabled={submitting}>
                {submitting
                  ? <><span className="spinner-border spinner-border-sm me-2"></span>Guardando...</>
                  : <><i className={`fas ${editing ? 'fa-save' : 'fa-check'} me-2`}></i>{editing ? 'Guardar cambios' : 'Crear sede'}</>
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
