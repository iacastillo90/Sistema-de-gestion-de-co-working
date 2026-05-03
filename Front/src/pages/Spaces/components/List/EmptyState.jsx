export function EmptyState({ isAdmin, openCreate }) {
  return (
    <div className="premium-card">
      <div className="empty-state">
        <i className="fas fa-building empty-state-icon"></i>
        <h5 className="empty-state-title">No hay espacios aún</h5>
        <p className="empty-state-desc">Aún no se han registrado espacios de trabajo.</p>
        {isAdmin && (
          <button className="btn-primary-red" onClick={openCreate}>
            <i className="fas fa-plus"></i>Crear primer espacio
          </button>
        )}
      </div>
    </div>
  );
}
