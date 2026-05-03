export function NewTicketModal({
  showNewModal,
  setShowNewModal,
  handleCreateTicket,
  newSubject,
  setNewSubject,
  newDescription,
  setNewDescription,
  creating
}) {
  if (!showNewModal) return null;

  return (
    <div className="modal fade show d-block premium-modal" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title"><i className="fas fa-headset me-2 text-primary"></i>Nuevo Ticket de Soporte</h5>
            <button type="button" className="btn-close" onClick={() => setShowNewModal(false)}></button>
          </div>
          <form onSubmit={handleCreateTicket}>
            <div className="modal-body p-4">
              <div className="mb-3">
                <label className="form-label-premium">Asunto</label>
                <input
                  type="text"
                  className="form-control-premium w-100"
                  required
                  placeholder="Ej. Problema con mi reserva"
                  value={newSubject}
                  onChange={e => setNewSubject(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label-premium">Descripción detallada</label>
                <textarea
                  className="form-control-premium w-100"
                  rows="4"
                  required
                  placeholder="Explícanos tu problema o consulta con el mayor detalle posible..."
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer border-top-0 pt-0 pb-4 px-4">
              <button type="button" className="btn btn-secondary px-4" onClick={() => setShowNewModal(false)}>Cancelar</button>
              <button type="submit" className="btn-primary-red px-4" disabled={creating}>
                {creating ? 'Creando...' : 'Crear Ticket'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
