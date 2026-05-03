export function SpaceSidebar({ reservations, reviews, totalEarnings, location }) {
  return (
    <div className="col-lg-4">
      <div className="premium-card mb-4 border-top border-4 border-success">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-4"><i className="fas fa-chart-line text-success me-2"></i>Rendimiento</h5>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-muted small">
                <i className="fas fa-calendar-check me-2"></i>Reservas
              </div>
              <div className="fw-bold">{reservations.length}</div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-muted small">
                <i className="fas fa-star me-2"></i>Reseñas
              </div>
              <div className="fw-bold">{reviews.length}</div>
            </div>
            <hr className="my-1" />
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-muted small">
                <i className="fas fa-wallet me-2"></i>Ingresos Est.
              </div>
              <div className="fw-bold text-success fs-5">${totalEarnings.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      {location && (
        <div className="premium-card">
          <div className="card-body p-4">
            <h5 className="fw-bold mb-3"><i className="fas fa-map-marker-alt text-danger me-2"></i>Sede</h5>
            {location.imagen && (
              <img src={location.imagen} alt={location.name} className="w-100 rounded-3 mb-3" style={{ height: '120px', objectFit: 'cover' }} />
            )}
            <div className="fw-bold mb-1">{location.name}</div>
            <div className="text-muted small mb-2"><i className="fas fa-map me-1"></i>{location.address}, {location.city}</div>
            {location.phone && <div className="text-muted small"><i className="fas fa-phone me-1"></i>{location.phone}</div>}
          </div>
        </div>
      )}
    </div>
  );
}
