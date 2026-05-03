export function PaymentActions({ payment, client, space, submitting, promptMarkAsInReview, promptMarkAsPaid, promptMarkAsPending }) {
  return (
    <div className="premium-card">
      <div className="card-body p-4">
        <h5 className="fw-bold mb-3"><i className="fas fa-cogs text-secondary me-2"></i>Acciones Administrativas</h5>
        <div className="d-flex gap-3 flex-wrap">
          {payment.metodo_pago?.toLowerCase().includes('transferencia') ? (
            <>
              {payment.estado === 'Pendiente' && (
                <button 
                  className="btn btn-info text-white fw-bold" 
                  onClick={promptMarkAsInReview}
                  disabled={submitting}
                >
                  <i className="fas fa-search me-2"></i>Marcar En Revisión
                </button>
              )}
              {payment.estado === 'En Revisión' && (
                <button 
                  className="btn btn-success fw-bold" 
                  onClick={promptMarkAsPaid}
                  disabled={submitting}
                >
                  <i className="fas fa-check-circle me-2"></i>Marcar como Pagado
                </button>
              )}
            </>
          ) : (
            payment.estado === 'Pendiente' && (
              <button 
                className="btn btn-success fw-bold" 
                onClick={promptMarkAsPaid}
                disabled={submitting}
              >
                <i className="fas fa-check-circle me-2"></i>Marcar como Pagado
              </button>
            )
          )}

          {payment.estado !== 'Pendiente' && (
            <button 
              className="btn btn-warning text-dark fw-bold" 
              onClick={promptMarkAsPending}
              disabled={submitting}
            >
              <i className="fas fa-undo me-2"></i>Revertir a Pendiente
            </button>
          )}

          {payment.estado === 'Pendiente' && client && (
            <a href={`mailto:${client.email}?subject=Recordatorio de Pago - JAFFA CoWork&body=Hola ${client.nombre}, te recordamos que tienes un pago pendiente de $${payment.monto.toLocaleString()} por tu reserva en ${space?.nombre}.`} className="btn btn-outline-info fw-bold">
              <i className="fas fa-envelope me-2"></i>Enviar Recordatorio
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
