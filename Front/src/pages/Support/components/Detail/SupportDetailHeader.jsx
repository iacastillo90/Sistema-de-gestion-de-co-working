export function SupportDetailHeader({ ticket, navigate }) {
  return (
    <div className="section-header d-flex justify-content-between align-items-start flex-wrap gap-3">
      <div>
        <h2 className="section-title">
          <i className="fas fa-headset section-icon"></i>Ticket de Soporte
        </h2>
        <p className="section-subtitle">#{ticket._id.slice(-8).toUpperCase()}</p>
      </div>
      <button
        className="btn btn-outline-secondary"
        onClick={() => navigate('/soporte')}
        style={{ padding: '0.4rem 1rem', borderRadius: '8px' }}
      >
        <i className="fas fa-arrow-left me-2"></i>Volver a Soporte
      </button>
    </div>
  );
}
