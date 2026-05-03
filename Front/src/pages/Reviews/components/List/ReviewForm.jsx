export function ReviewForm({ form, setForm, spaces, submitting, handleSubmit }) {
  return (
    <div className="premium-card mb-4">
      <div className="card-body p-4">
        <h6 className="fw-bold mb-4"><i className="fas fa-pen-to-square me-2 section-icon"></i>Tu opinión sobre un espacio</h6>
        <form onSubmit={handleSubmit}>
          <div className="row g-3 mb-3">
            <div className="col-md-5">
              <label className="form-label-premium">Espacio</label>
              <select className="form-select-premium w-100" value={form.space_id} onChange={e => setForm({ ...form, space_id: e.target.value })} required>
                <option value="">Seleccionar espacio...</option>
                {spaces.map(s => <option key={s._id} value={s._id}>{s.nombre}</option>)}
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label-premium">Calificación</label>
              <select className="form-select-premium w-100" value={form.calificacion} onChange={e => setForm({ ...form, calificacion: Number(e.target.value) })}>
                {[5,4,3,2,1].map(n => <option key={n} value={n}>{'★'.repeat(n)} ({n})</option>)}
              </select>
            </div>
            <div className="col-md-5">
              <label className="form-label-premium">Comentario</label>
              <textarea className="form-control-premium w-100" rows="2" required value={form.comentario} onChange={e => setForm({ ...form, comentario: e.target.value })} placeholder="Comparte tu experiencia..."></textarea>
            </div>
          </div>
          <button type="submit" className="btn-primary-red" disabled={submitting}>
            {submitting ? <><span className="spinner-border spinner-border-sm"></span>Publicando...</> : <><i className="fas fa-paper-plane"></i>Publicar reseña</>}
          </button>
        </form>
      </div>
    </div>
  );
}
