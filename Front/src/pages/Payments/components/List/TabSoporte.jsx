function TabSoporte({ tickets, reservations, payments, spaces, navigate, setShowTicketModal }) {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="mb-0 fw-bold">Tus tickets de soporte</h5>
        <button className="btn-primary-red" onClick={() => setShowTicketModal(true)}>
          <i className="fas fa-plus"></i> Nuevo Ticket
        </button>
      </div>

      {tickets.length === 0 ? (
        <div className="premium-card">
          <div className="empty-state p-5">
            <i className="fas fa-headset empty-state-icon"></i>
            <h5 className="empty-state-title">No hay tickets activos</h5>
            <p className="empty-state-desc">Si tienes problemas con un pago, puedes crear un ticket de soporte aquí.</p>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {tickets.map(ticket => {
            // Find related space via reservation
            const relatedReservation = ticket.related_reservation_id
              ? reservations.find(r => r._id === ticket.related_reservation_id)
              : ticket.related_payment_id
                ? reservations.find(r => payments.find(p => p._id === ticket.related_payment_id && p.reservation_id === r._id))
                : null;
            const relatedSpace = relatedReservation
              ? spaces.find(s => s._id === relatedReservation.space_id)
              : null;

            const hasSpaceImage = relatedSpace?.imagen;
            // Default payment image from Unsplash (free, no-attribution required)
            const paymentDefaultImg = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80';
            const cardImg = hasSpaceImage ? relatedSpace.imagen : paymentDefaultImg;
            const imgLabel = hasSpaceImage ? relatedSpace.nombre : 'Gestión de Pago';

            const statusMap = {
              'Open': { cls: 'badge-estado badge-open', ico: 'fa-envelope-open', label: 'Abierto' },
              'In Review': { cls: 'badge-estado badge-in-review', ico: 'fa-search', label: 'En Revisión' },
              'Resolved': { cls: 'badge-estado badge-resolved', ico: 'fa-check-circle', label: 'Resuelto' },
            };
            const statusInfo = statusMap[ticket.status] || statusMap['Open'];
            const createdDate = new Date(ticket.createdAt).toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' });

            return (
              <div key={ticket._id} className="col-md-6">
                <div
                  className="premium-card h-100 d-flex flex-column"
                  style={{ overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s' }}
                  onClick={() => navigate ? navigate(`/soporte/${ticket._id}`) : null}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = ''; }}
                >
                  {/* Banner image */}
                  <div style={{ position: 'relative', width: '100%', height: '130px', overflow: 'hidden' }}>
                    <img
                      src={cardImg}
                      alt={imgLabel}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={e => { e.target.src = paymentDefaultImg; }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 30%, rgba(0,0,0,0.6))' }}></div>
                    <div style={{ position: 'absolute', bottom: '0.6rem', left: '0.8rem', right: '0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                      <span className="text-white fw-bold small" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                        {hasSpaceImage ? <><i className="fas fa-building me-1"></i>{imgLabel}</> : <><i className="fas fa-credit-card me-1"></i>{imgLabel}</>}
                      </span>
                      <span className={statusInfo.cls} style={{ fontSize: '0.7rem' }}>
                        <i className={`fas ${statusInfo.ico}`}></i>{statusInfo.label}
                      </span>
                    </div>
                  </div>

                  <div className="card-body p-4 d-flex flex-column flex-grow-1">
                    <div className="fw-bold mb-1 text-dark" style={{ overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>
                      {ticket.subject}
                    </div>
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

                    <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top">
                      <span className="text-muted" style={{ fontSize: '0.75rem' }}>Ticket: #{ticket._id.slice(-6).toUpperCase()}</span>
                      <span className="text-muted" style={{ fontSize: '0.75rem' }}><i className="fas fa-clock me-1"></i>{createdDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default TabSoporte;
