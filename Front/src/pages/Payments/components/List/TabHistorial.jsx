import EstadoBadge from '../Common/EstadoBadge';

function TabHistorial({ 
  payments, 
  reservations, 
  invoices, 
  isAdmin, 
  handlePayPending, 
  submitting, 
  setSelectedInvoice, 
  setShowInvoiceModal, 
  navigate 
}) {
  return (
    <div className="premium-card">
      <div className="card-body p-0">
        {payments.length === 0 ? (
          <div className="empty-state p-5">
            <i className="fas fa-receipt empty-state-icon"></i>
            <h5 className="empty-state-title">No hay transacciones</h5>
            <p className="empty-state-desc">Tus pagos aparecerán aquí una vez que reserves un espacio.</p>
          </div>
        ) : (
          <div className="d-flex flex-column p-2">
            {payments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(pay => {
              const res = reservations.find(r => r._id === pay.reservation_id);
              const isPending = pay.estado === 'Pendiente';
              const invoice = invoices.find(i => i.payment_id === pay._id);

              return (
                <div
                  key={pay._id}
                  className="payment-row"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/pagos/${pay._id}`)}
                >
                  <div className="payment-row-icon" style={{ background: isPending ? 'rgba(209,32,38,0.1)' : 'rgba(25,135,84,0.1)', color: isPending ? 'var(--primary-red)' : '#198754' }}>
                    <i className={`fas ${isPending ? 'fa-clock' : 'fa-check'}`}></i>
                  </div>

                  <div className="flex-grow-1 min-width-0">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="fw-bold text-truncate">Reserva {res ? res.fecha : 'Eliminada'}</span>
                      <span className={`payment-row-amount ${isPending ? 'debit' : 'credit'}`}>
                        ${pay.monto.toLocaleString()}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-muted small text-truncate">
                        {pay.fecha_pago} · {pay.metodo_pago}
                      </span>
                      <EstadoBadge estado={pay.estado} />
                    </div>
                  </div>

                  {isPending && !isAdmin && (
                    <button
                      className="btn-primary-red ms-2"
                      style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
                      onClick={(e) => { e.stopPropagation(); handlePayPending(pay); }}
                      disabled={submitting}
                    >
                      Pagar
                    </button>
                  )}

                  {!isPending && invoice && (
                    <button
                      className="btn btn-sm btn-outline-secondary ms-2"
                      style={{ padding: '0.4rem 1rem', fontSize: '0.85rem', borderRadius: '8px' }}
                      onClick={(e) => { e.stopPropagation(); setSelectedInvoice(invoice); setShowInvoiceModal(true); }}
                    >
                      <i className="fas fa-file-invoice"></i> Boleta
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default TabHistorial;
