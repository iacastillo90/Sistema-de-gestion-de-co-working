import { generateInvoicePDF } from '../../../../utils/pdfHelper';

function PaymentInfo({ 
  payment, 
  invoice, 
  space, 
  authUser, 
  reservation, 
  setShowSupportModal, 
  setShowCancelModal 
}) {
  return (
    <div className="premium-card mb-4">
      <div className="card-body p-4 p-lg-5">
        <h5 className="fw-bold mb-4">Información de Pago</h5>
        
        {payment ? (
          <>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Monto Total:</span>
              <span className="fw-bold fs-5">${payment.monto.toLocaleString()}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Método:</span>
              <span className="fw-bold">{payment.metodo_pago}</span>
            </div>
            <div className="d-flex justify-content-between mb-4">
              <span className="text-muted">Estado del Cobro:</span>
              <span className={`badge ${payment.estado === 'Completado' ? 'bg-success' : 'bg-warning text-dark'}`}>
                {payment.estado}
              </span>
            </div>

            {invoice && (
              <button 
                className="btn btn-outline-success w-100 fw-bold py-2 mb-3"
                onClick={() => generateInvoicePDF(invoice, space, authUser, payment)}
              >
                <i className="fas fa-file-pdf me-2"></i>Descargar Boleta (PDF)
              </button>
            )}
            {!invoice && payment.estado === 'Pendiente' && (
              <div className="alert alert-info py-2 small mb-3">
                <i className="fas fa-info-circle me-2"></i>
                La boleta se generará una vez se confirme el pago en sede o por transferencia.
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-4">
            <i className="fas fa-ghost fs-1 text-muted mb-3 d-block"></i>
            <span className="text-muted">No hay registro de pago asociado.</span>
          </div>
        )}

        <hr className="my-4" />
        
        <h5 className="fw-bold mb-3">Acciones</h5>
        <div className="d-flex flex-column gap-2">
          <button className="btn btn-primary fw-bold" onClick={() => setShowSupportModal(true)}>
            <i className="fas fa-headset me-2"></i>Solicitar Soporte Adicional
          </button>
          {reservation.estado === 'Confirmada' && (
            <button className="btn-outline-red fw-bold" onClick={() => setShowCancelModal(true)} style={{justifyContent: 'center'}}>
              <i className="fas fa-times me-2"></i>Cancelar Reserva
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

export default PaymentInfo;
