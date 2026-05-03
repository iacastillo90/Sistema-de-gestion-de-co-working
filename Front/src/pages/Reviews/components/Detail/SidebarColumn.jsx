import { UserAvatar } from '../Common/UserAvatar';

export function SidebarColumn({ 
  author, 
  review, 
  isOwn, 
  location, 
  ratingLabel, 
  space, 
  navigate 
}) {
  return (
    <div className="col-lg-4">
      {/* Author card */}
      <div className="premium-card mb-4">
        <div className="card-body p-4">
          <h6 className="fw-bold mb-3"><i className="fas fa-user me-2 text-primary"></i>Autor de la Reseña</h6>
          <div className="d-flex align-items-center gap-3">
            <UserAvatar name={author?.nombre} userId={review.user_id} large />
            <div>
              <div className="fw-bold fs-6">{author?.nombre || 'Usuario Anónimo'}</div>
              {author?.email && <div className="text-muted small">{author.email}</div>}
              {isOwn && <span className="badge-estado badge-confirmada mt-1 d-inline-block" style={{ fontSize: '0.7rem' }}><i className="fas fa-user"></i>Tu reseña</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Location card */}
      {location && (
        <div className="premium-card mb-4">
          <div className="card-body p-4">
            <h6 className="fw-bold mb-3"><i className="fas fa-map-marker-alt me-2 text-primary"></i>Ubicación de la Sede</h6>
            <div className="d-flex flex-column gap-2">
              {location.name && (
                <div className="d-flex gap-2">
                  <i className="fas fa-building text-muted mt-1" style={{ width: '16px' }}></i>
                  <span className="fw-bold">{location.name}</span>
                </div>
              )}
              {location.address && (
                <div className="d-flex gap-2">
                  <i className="fas fa-road text-muted mt-1" style={{ width: '16px' }}></i>
                  <span className="text-muted small">{location.address}</span>
                </div>
              )}
              {location.city && (
                <div className="d-flex gap-2">
                  <i className="fas fa-city text-muted mt-1" style={{ width: '16px' }}></i>
                  <span className="text-muted small">{location.city}</span>
                </div>
              )}
              {location.country && (
                <div className="d-flex gap-2">
                  <i className="fas fa-globe-americas text-muted mt-1" style={{ width: '16px' }}></i>
                  <span className="text-muted small">{location.country}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Meta info */}
      <div className="premium-card mb-4">
        <div className="card-body p-4">
          <h6 className="fw-bold mb-3"><i className="fas fa-info-circle me-2 text-primary"></i>Información</h6>
          <div className="d-flex flex-column gap-2">
            <div className="d-flex justify-content-between">
              <span className="text-muted small">ID Reseña</span>
              <span className="fw-bold small font-monospace">#{review._id.slice(-8).toUpperCase()}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="text-muted small">Publicada</span>
              <span className="small">{new Date(review.createdAt).toLocaleDateString('es-CL')}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="text-muted small">Calificación</span>
              <span className={`fw-bold small ${review.calificacion >= 4 ? 'text-success' : review.calificacion >= 3 ? 'text-warning' : 'text-danger'}`}>
                {review.calificacion}/5 – {ratingLabel}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Other reviews of this space button */}
      {space && (
        <div className="premium-card">
          <div className="card-body p-4 text-center">
            <i className="fas fa-th-list text-primary fs-3 mb-2 d-block"></i>
            <h6 className="fw-bold mb-1">¿Ver más reseñas?</h6>
            <p className="text-muted small mb-3">Explora otras opiniones de la comunidad sobre nuestros espacios.</p>
            <button className="btn btn-outline-danger w-100" style={{ borderRadius: '10px' }} onClick={() => navigate('/reseñas')}>
              <i className="fas fa-arrow-left me-2"></i>Todas las Reseñas
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
