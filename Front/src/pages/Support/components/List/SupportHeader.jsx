export function SupportHeader({ isAdmin, filteredLength, totalLength, setShowNewModal }) {
  return (
    <div className="section-header d-flex justify-content-between align-items-center flex-wrap gap-3">
      <div>
        <h2 className="section-title">
          <i className="fas fa-headset section-icon"></i>
          {isAdmin ? 'Todos los Tickets' : 'Mi Soporte'}
        </h2>
        <p className="section-subtitle">
          {filteredLength} de {totalLength} ticket{totalLength !== 1 ? 's' : ''}
        </p>
      </div>
      <button className="btn-primary-red" onClick={() => setShowNewModal(true)}>
        <i className="fas fa-plus"></i>Nuevo Ticket
      </button>
    </div>
  );
}
