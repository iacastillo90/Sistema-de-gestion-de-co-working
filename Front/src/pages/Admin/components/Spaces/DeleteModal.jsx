export function DeleteModal({ delConfirm, setDelConfirm, handleDelete }) {
  if (!delConfirm) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ borderTop: '6px solid #dc3545' }}>
          <div className="modal-header border-0 pb-0">
            <button type="button" className="btn-close" onClick={() => setDelConfirm(null)}></button>
          </div>
          <div className="modal-body p-4 text-center">
            <i className="fas fa-exclamation-triangle text-danger mb-3" style={{ fontSize: '3.5rem' }}></i>
            <h4 className="fw-bold mb-2">Eliminar Espacio</h4>
            <p className="text-muted mb-4">¿Estás seguro de eliminar <strong>{delConfirm.nombre}</strong>?<br />Esta acción no se puede deshacer.</p>
            <div className="d-flex justify-content-center gap-3">
              <button className="btn btn-light fw-bold px-4 py-2" onClick={() => setDelConfirm(null)}>Cancelar</button>
              <button className="btn btn-danger text-white fw-bold px-4 py-2" onClick={handleDelete}>Sí, eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
