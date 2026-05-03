import { Link } from 'react-router-dom';

function renderStars(n) {
  return Array.from({ length: 5 }, (_, i) => (
    <i key={i} className={`fas fa-star ${i < n ? 'star-filled' : 'star-empty'}`} style={{ color: i < n ? '#f59e0b' : '#e5e7eb' }}></i>
  ));
}

export function SpaceReviews({ reviews }) {
  return (
    <div className="premium-card">
      <div className="card-body p-4 p-lg-5">
        <div className="d-flex align-items-center gap-3 mb-4">
          <h3 className="section-title mb-0" style={{ fontSize: '1.2rem' }}>
            <i className="fas fa-star section-icon"></i>Reseñas
          </h3>
          {reviews.length > 0 && (
            <span className="badge-estado badge-pendiente">{reviews.length}</span>
          )}
        </div>

        {reviews.length === 0 ? (
          <div className="empty-state" style={{ padding: '2rem' }}>
            <i className="fas fa-comment-slash empty-state-icon"></i>
            <h5 className="empty-state-title">Sin reseñas aún</h5>
            <p className="empty-state-desc">Este espacio aún no tiene reseñas. ¡Sé el primero!</p>
            <Link to="/reseñas" className="btn-outline-red">Dejar una reseña</Link>
          </div>
        ) : (
          <div className="row g-3">
            {reviews.map((review, idx) => (
              <div key={review._id ?? idx} className="col-md-6">
                <div className="review-card p-3 h-100" style={{ border: '1px solid var(--border-color)', borderRadius: '12px', background: 'var(--card-bg)' }}>
                  <div className="mb-2 fs-5" style={{ letterSpacing: '2px' }}>{renderStars(review.calificacion)}</div>
                  <p className="mb-1 text-muted">{review.comentario}</p>
                  <small className="info-row mt-1" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--muted)', background: 'var(--bg-color)', padding: '0.3rem 0.6rem', borderRadius: '6px' }}>
                    <i className="fas fa-user"></i>Usuario Anónimo
                  </small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
