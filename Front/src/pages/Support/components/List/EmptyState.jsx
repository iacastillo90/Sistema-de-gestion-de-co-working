export function EmptyState({ ticketsLength, setShowNewModal }) {
  return (
    <div className="premium-card">
      <div className="empty-state">
        <i className="fas fa-headset empty-state-icon"></i>
        {ticketsLength === 0 ? (
          <>
            <h5 className="empty-state-title">Sin tickets de soporte</h5>
            <p className="empty-state-desc">¿Necesitas ayuda? Crea un ticket y nuestro equipo te responderá pronto.</p>
            <button className="btn-primary-red" onClick={() => setShowNewModal(true)}>
              <i className="fas fa-plus"></i>Crear primer ticket
            </button>
          </>
        ) : (
          <>
            <h5 className="empty-state-title">Sin resultados</h5>
            <p className="empty-state-desc">No se encontraron tickets con los filtros aplicados.</p>
          </>
        )}
      </div>
    </div>
  );
}
