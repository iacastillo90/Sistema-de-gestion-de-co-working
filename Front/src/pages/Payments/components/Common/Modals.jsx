export function CardModal({ 
  show, 
  onClose, 
  cardForm, 
  setCardForm, 
  handleAddCard, 
  submitting 
}) {
  if (!show) return null;
  return (
    <div className="modal fade show d-block premium-modal" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold">Agregar Tarjeta</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="alert alert-info py-2" style={{ fontSize: '0.85rem' }}>
              <i className="fas fa-lock me-2"></i>Tus datos están protegidos. Solo guardamos los últimos 4 dígitos.
            </div>
            <form onSubmit={handleAddCard}>
              <div className="mb-3">
                <label className="form-label-premium">Nombre en la tarjeta</label>
                <input
                  type="text" className="form-control-premium w-100" required
                  value={cardForm.card_holder} onChange={e => setCardForm({ ...cardForm, card_holder: e.target.value })}
                  placeholder="JUAN PEREZ"
                />
              </div>

              <div className="row g-3 mb-3">
                <div className="col-8">
                  <label className="form-label-premium">Últimos 4 dígitos</label>
                  <input
                    type="text" className="form-control-premium w-100" required pattern="\d{4}" maxLength="4"
                    value={cardForm.last4} onChange={e => setCardForm({ ...cardForm, last4: e.target.value.replace(/\D/g, '') })}
                    placeholder="1234"
                  />
                </div>
                <div className="col-4">
                  <label className="form-label-premium">Marca</label>
                  <select
                    className="form-select-premium w-100"
                    value={cardForm.brand} onChange={e => setCardForm({ ...cardForm, brand: e.target.value })}
                  >
                    <option value="Visa">Visa</option>
                    <option value="Mastercard">Mastercard</option>
                    <option value="Amex">Amex</option>
                  </select>
                </div>
              </div>

              <div className="row g-3 mb-4">
                <div className="col-6">
                  <label className="form-label-premium">Mes (MM)</label>
                  <input
                    type="number" className="form-control-premium w-100" required min="1" max="12"
                    value={cardForm.exp_month} onChange={e => setCardForm({ ...cardForm, exp_month: e.target.value })}
                    placeholder="12"
                  />
                </div>
                <div className="col-6">
                  <label className="form-label-premium">Año (YYYY)</label>
                  <input
                    type="number" className="form-control-premium w-100" required min={new Date().getFullYear()} max={new Date().getFullYear() + 20}
                    value={cardForm.exp_year} onChange={e => setCardForm({ ...cardForm, exp_year: e.target.value })}
                    placeholder="2028"
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary-red w-100" disabled={submitting}>
                {submitting ? 'Guardando...' : 'Guardar Tarjeta'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TicketModal({ 
  show, 
  onClose, 
  ticketForm, 
  setTicketForm, 
  handleCreateTicket, 
  payments, 
  submitting 
}) {
  if (!show) return null;
  return (
    <div className="modal fade show d-block premium-modal" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold">Crear Ticket de Soporte</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleCreateTicket}>
              <div className="mb-3">
                <label className="form-label-premium">Asunto</label>
                <input
                  type="text" className="form-control-premium w-100" required maxLength="120"
                  value={ticketForm.subject} onChange={e => setTicketForm({ ...ticketForm, subject: e.target.value })}
                  placeholder="Ej: Cargo duplicado"
                />
              </div>
              <div className="mb-3">
                <label className="form-label-premium">Pago relacionado (opcional)</label>
                <select
                  className="form-select-premium w-100"
                  value={ticketForm.related_payment_id} onChange={e => setTicketForm({ ...ticketForm, related_payment_id: e.target.value })}
                >
                  <option value="">Ninguno específico</option>
                  {payments.map(p => (
                    <option key={p._id} value={p._id}>
                      ${p.monto} - {p.fecha_pago} ({p.estado})
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="form-label-premium">Descripción del problema</label>
                <textarea
                  className="form-control-premium w-100" required rows="4" maxLength="1000"
                  value={ticketForm.description} onChange={e => setTicketForm({ ...ticketForm, description: e.target.value })}
                  placeholder="Describe detalladamente el inconveniente..."
                ></textarea>
              </div>
              <button type="submit" className="btn-primary-red w-100" disabled={submitting}>
                {submitting ? 'Enviando...' : 'Enviar Ticket'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export function InvoiceModal({ show, onClose, selectedInvoice }) {
  if (!show || !selectedInvoice) return null;
  return (
    <div className="modal fade show d-block premium-modal" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
      <div className="modal-dialog modal-dialog-centered modal-sm">
        <div className="modal-content" style={{ backgroundColor: '#fff', borderTop: '6px solid var(--primary-red)' }}>
          <div className="modal-body p-4 text-center">
            <div className="mb-3">
              <i className="fas fa-check-circle text-success" style={{ fontSize: '3rem' }}></i>
            </div>
            <h4 className="fw-bold mb-1">Boleta de Pago</h4>
            <p className="text-muted small mb-4">#{selectedInvoice._id.slice(-8).toUpperCase()}</p>

            <div className="text-start mb-4">
              <div className="d-flex justify-content-between border-bottom py-2">
                <span className="text-muted small">Fecha</span>
                <span className="fw-bold small">{new Date(selectedInvoice.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="d-flex justify-content-between border-bottom py-2">
                <span className="text-muted small">Descripción</span>
                <span className="fw-bold small text-end" style={{ maxWidth: '60%' }}>{selectedInvoice.descripcion}</span>
              </div>
              <div className="d-flex justify-content-between border-bottom py-2">
                <span className="text-muted small">Duración</span>
                <span className="fw-bold small">{selectedInvoice.cantidad_horas.toFixed(1)} hrs</span>
              </div>
              <div className="d-flex justify-content-between border-bottom py-2">
                <span className="text-muted small">Tarifa/hr</span>
                <span className="fw-bold small">${selectedInvoice.precio_por_hora}</span>
              </div>
              <div className="d-flex justify-content-between py-2 bg-light px-2 rounded mt-2">
                <span className="fw-bold">Total</span>
                <span className="fw-bold" style={{ color: 'var(--primary-red)' }}>${selectedInvoice.monto_total.toLocaleString()}</span>
              </div>
            </div>

            <div className="text-muted small mb-3">
              Pago procesado exitosamente mediante Tarjeta Asociada.
            </div>

            <button type="button" className="btn btn-outline-secondary w-100 fw-bold" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
