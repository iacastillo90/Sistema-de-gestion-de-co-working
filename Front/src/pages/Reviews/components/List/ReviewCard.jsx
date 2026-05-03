import { Stars } from '../Common/Stars';
import { UserAvatar } from '../Common/UserAvatar';
import { RatingBadge } from '../Common/RatingBadge';

export function ReviewCard({ 
  review, 
  sp, 
  loc, 
  user, 
  isOwn, 
  isAdmin, 
  date, 
  navigate, 
  handleDelete 
}) {
  return (
    <div className="col-md-6 col-lg-4">
      <div
        className="premium-card h-100 d-flex flex-column review-card-interactive"
        onClick={() => navigate(`/reseñas/${review._id}`)}
      >
        {/* Space image banner */}
        {sp?.imagen ? (
          <div style={{ position: 'relative', height: '120px', overflow: 'hidden' }}>
            <img src={sp.imagen} alt={sp.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 25%, rgba(0,0,0,0.65))' }}></div>
            <div style={{ position: 'absolute', bottom: '0.5rem', left: '0.8rem', right: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <span className="text-white fw-bold small" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                <i className="fas fa-building me-1"></i>{sp.nombre}
              </span>
              <RatingBadge n={review.calificacion} />
            </div>
          </div>
        ) : (
          <div className="d-flex align-items-center justify-content-between px-3" style={{ height: '64px', background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)' }}>
            <span className="fw-bold text-muted">{sp?.nombre || 'Espacio'}</span>
            <RatingBadge n={review.calificacion} />
          </div>
        )}

        <div className="card-body p-4 d-flex flex-column flex-grow-1">
          {/* Location */}
          {(loc?.city || loc?.country) && (
            <div className="text-muted small mb-2">
              <i className="fas fa-map-marker-alt me-1 text-primary"></i>
              {[loc.city, loc.country].filter(Boolean).join(', ')}
            </div>
          )}

          {/* Stars */}
          <Stars n={review.calificacion} size="0.9rem" />

          {/* Comment */}
          <p className="flex-grow-1 mb-3 mt-2" style={{ lineHeight: '1.6', color: 'var(--text)', fontSize: '0.875rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
            "{review.comentario}"
          </p>

          {/* Footer: author + date + actions */}
          <div className="mt-auto pt-3 border-top d-flex align-items-center gap-2">
            <UserAvatar name={user?.nombre} userId={review.user_id} />
            <div className="flex-grow-1 min-width-0">
              <div className="fw-bold small text-truncate">
                {user?.nombre || 'Usuario'}
                {isOwn && <span className="badge-estado badge-confirmada ms-1" style={{ fontSize: '0.65rem' }}><i className="fas fa-user"></i>Tú</span>}
              </div>
              <div className="text-muted" style={{ fontSize: '0.75rem' }}>{date}</div>
            </div>
            {(isAdmin || isOwn) && (
              <button
                className="btn btn-sm"
                title="Eliminar"
                style={{ border: '1.5px solid #dee2e6', color: '#D12026', background: 'transparent', borderRadius: '8px' }}
                onClick={ev => { ev.stopPropagation(); handleDelete(review._id); }}
              >
                <i className="fas fa-trash"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
