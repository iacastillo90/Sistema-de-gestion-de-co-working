import { StatusBadge } from '../Common/StatusBadge';

export function SupportCard({ ticket, reservations, spaces, navigate }) {
  const createdDate = new Date(ticket.createdAt).toLocaleDateString('es-CL', {
    day: '2-digit', month: 'short', year: 'numeric'
  });

  // Resolve related image
  const relatedReservation = ticket.related_reservation_id
    ? reservations.find(r => r._id === ticket.related_reservation_id)
    : null;
  const relatedSpace = relatedReservation
    ? spaces.find(s => s._id === relatedReservation.space_id)
    : null;

  const hasSpaceImage = relatedSpace?.imagen;
  const paymentDefaultImg = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80';
  const cardImg = hasSpaceImage ? relatedSpace.imagen : paymentDefaultImg;
  const imgLabel = hasSpaceImage ? relatedSpace.nombre : 'Gestión de Pago';

  return (
    <div className="col-md-6 col-xl-4">
      <div
        className="premium-card h-100 d-flex flex-column support-card-interactive"
        onClick={() => navigate(`/soporte/${ticket._id}`)}
      >
        {/* Banner image */}
        <div style={{ position: 'relative', width: '100%', height: '130px', overflow: 'hidden' }}>
          <img
            src={cardImg}
            alt={imgLabel}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={e => { e.target.src = paymentDefaultImg; }}
          />
          <div className="support-banner-overlay"></div>
          <div style={{ position: 'absolute', bottom: '0.6rem', left: '0.8rem', right: '0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <span className="text-white fw-bold small" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
              {hasSpaceImage
                ? <><i className="fas fa-building me-1"></i>{imgLabel}</>
                : <><i className="fas fa-credit-card me-1"></i>{imgLabel}</>}
            </span>
            <div style={{ fontSize: '0.7rem' }}>
              <StatusBadge status={ticket.status} />
            </div>
          </div>
        </div>

        <div className="card-body p-4 d-flex flex-column flex-grow-1">
          <div className="fw-bold mb-1 text-dark" style={{ overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>
            {ticket.subject}
          </div>
          <small className="text-muted mb-2 d-block"><i className="fas fa-clock me-1"></i>{createdDate}</small>

          <p className="text-muted small mb-3 flex-grow-1" style={{ overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
            {ticket.description}
          </p>

          {ticket.admin_response && (
            <div className="p-2 bg-light rounded small mb-3" style={{ borderLeft: '3px solid var(--primary-red)' }}>
              <strong className="text-danger small"><i className="fas fa-reply me-1"></i>Respuesta JAFFA:</strong>
              <p className="mb-0 mt-1 text-muted" style={{ overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                {ticket.admin_response}
              </p>
            </div>
          )}

          <div className="mt-auto pt-3 border-top">
            <span className="text-primary small fw-bold"><i className="fas fa-eye me-1"></i>Ver detalle</span>
          </div>
        </div>
      </div>
    </div>
  );
}
