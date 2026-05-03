export function SupportQuickActions({ ticket, handleStatusChange, submitting }) {
  return (
    <div className="premium-card">
      <div className="card-body p-4">
        <h5 className="fw-bold mb-3"><i className="fas fa-cogs text-secondary me-2"></i>Cambio Rápido de Estado</h5>
        <p className="text-muted small mb-3">Cambia el estado del ticket sin necesidad de escribir una respuesta.</p>
        <div className="d-flex gap-2 flex-wrap">
          {ticket.status !== 'Open' && (
            <button className="btn btn-outline-danger fw-bold" onClick={() => handleStatusChange('Open')} disabled={submitting}>
              <i className="fas fa-envelope-open me-2"></i>Reabrir
            </button>
          )}
          {ticket.status !== 'In Review' && (
            <button className="btn btn-outline-warning fw-bold" onClick={() => handleStatusChange('In Review')} disabled={submitting}>
              <i className="fas fa-search me-2"></i>Marcar En Revisión
            </button>
          )}
          {ticket.status !== 'Resolved' && (
            <button className="btn btn-outline-success fw-bold" onClick={() => handleStatusChange('Resolved')} disabled={submitting}>
              <i className="fas fa-check-circle me-2"></i>Marcar como Resuelto
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
