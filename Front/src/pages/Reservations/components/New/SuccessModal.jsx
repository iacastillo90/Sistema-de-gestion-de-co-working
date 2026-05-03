import { generateInvoicePDF } from '../../../../utils/pdfHelper';

function SuccessModal({ successModal, completedData, authUser, navigate }) {
  if (!successModal) return null;

  return (
    <div className="modal fade show d-block premium-modal" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ borderTop: successModal === 'Tarjeta' ? '6px solid #198754' : '6px solid var(--primary-red)' }}>
          
          <div className="modal-body p-5 text-center">
            <div className="mb-4">
              <i className={`fas fa-check-circle ${successModal === 'Tarjeta' ? 'text-success' : 'text-primary'}`} style={{ fontSize: '4rem' }}></i>
            </div>
            
            <h3 className="fw-bold mb-3">¡Reserva Exitosa!</h3>
            <p className="text-muted mb-4 fs-6">
              Tu reserva para el día <strong>{completedData?.reservation?.fecha}</strong> en <strong>{completedData?.space?.nombre}</strong> ha sido registrada.
            </p>

            {successModal === 'Pendiente' ? (
              <div className="text-start bg-light p-4 rounded-3 mb-4 border">
                <h6 className="fw-bold text-dark mb-3"><i className="fas fa-info-circle text-primary me-2"></i>Instrucciones de Pago</h6>
                <p className="small text-muted mb-3">
                  Recuerda que tu pago quedó en estado <strong>Pendiente</strong> por un total de <strong>${completedData?.payment?.monto?.toLocaleString()}</strong>.
                </p>
                <ul className="small text-muted mb-0 ps-3">
                  <li className="mb-2"><strong>Efectivo o Tarjeta Física:</strong> Contamos con Punto de Venta en la sede para que pagues antes de entrar.</li>
                  <li><strong>Transferencia Bancaria:</strong><br/>Banco de Chile<br/>Cuenta Corriente: 123456789<br/>RUT: 76.543.210-K<br/>Envía el comprobante a: <strong>soporte@jaffa.com</strong></li>
                </ul>
              </div>
            ) : (
              <div className="text-start bg-light p-4 rounded-3 mb-4 border">
                <h6 className="fw-bold text-success mb-3"><i className="fas fa-shield-check text-success me-2"></i>Cobro Procesado</h6>
                <p className="small text-muted mb-2">
                  Hemos cobrado <strong>${completedData?.payment?.monto?.toLocaleString()}</strong> exitosamente de tu tarjeta.
                </p>
                <p className="small text-muted mb-0">
                  Se ha generado tu boleta de pago electrónica y se ha enviado una copia a tu correo. También puedes descargarla ahora mismo en formato PDF.
                </p>
              </div>
            )}

            <div className="d-flex flex-column gap-2 mt-4">
              {successModal === 'Tarjeta' && (
                <button 
                  className="btn btn-outline-success fw-bold py-2" 
                  onClick={() => generateInvoicePDF(completedData.invoice, completedData.space, authUser, completedData.payment)}
                >
                  <i className="fas fa-file-pdf me-2"></i>Descargar Boleta (PDF)
                </button>
              )}
              <button className="btn-primary-red py-2" onClick={() => navigate('/reservas')} style={{ justifyContent: 'center' }}>
                Ir a Mis Reservas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;
