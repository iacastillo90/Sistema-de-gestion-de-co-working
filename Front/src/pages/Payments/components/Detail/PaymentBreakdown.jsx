import { Link } from 'react-router-dom';
import { generateInvoicePDF } from '../../../../utils/pdfHelper';

function PaymentBreakdown({
  space,
  cantidadHoras,
  invoice,
  payment,
  payDate,
  isPending,
  paySuccess,
  defaultCard,
  handlePay,
  paying,
  authUser
}) {
  return (
    <div className="premium-card mb-4">
      <div className="card-body p-4">
        <h6 className="fw-bold mb-4"><i className="fas fa-calculator me-2 text-primary"></i>Desglose del Cobro</h6>

        <div className="d-flex flex-column gap-2">
          <div className="d-flex justify-content-between py-2 border-bottom">
            <span className="text-muted">Espacio</span>
            <span className="fw-bold">{space?.nombre || '—'}</span>
          </div>
          <div className="d-flex justify-content-between py-2 border-bottom">
            <span className="text-muted">Duración</span>
            <span className="fw-bold">{cantidadHoras > 0 ? `${cantidadHoras} hrs` : '—'}</span>
          </div>
          {invoice && (
            <div className="d-flex justify-content-between py-2 border-bottom">
              <span className="text-muted">Tarifa por hora</span>
              <span className="fw-bold">${invoice.precio_por_hora?.toLocaleString()}/hr</span>
            </div>
          )}
          <div className="d-flex justify-content-between py-2 border-bottom">
            <span className="text-muted">Método de pago</span>
            <span className="fw-bold">
              <i className={`fas ${payment.metodo_pago?.toLowerCase().includes('tarjeta') ? 'fa-credit-card' : payment.metodo_pago?.toLowerCase() === 'transferencia' ? 'fa-university' : 'fa-money-bill'} me-1 text-muted`}></i>
              {payment.metodo_pago}
            </span>
          </div>
          <div className="d-flex justify-content-between py-2 border-bottom">
            <span className="text-muted">Fecha de pago</span>
            <span className="fw-bold">{payment.fecha_pago || payDate}</span>
          </div>
          <div className="d-flex justify-content-between py-3 mt-1">
            <span className="fw-bold fs-5">Total</span>
            <span className={`fw-bold fs-4 ${isPending ? 'text-danger' : 'text-success'}`}>
              ${payment.monto?.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Botón pagar si está pendiente */}
        {isPending && !paySuccess && (
          <div className="p-3 rounded-3 mt-3" style={{ background: 'rgba(209,32,38,0.05)', border: '1px dashed var(--primary-red)' }}>
            <div className="d-flex align-items-center gap-3 flex-wrap">
              <div className="flex-grow-1">
                <div className="fw-bold text-danger small"><i className="fas fa-exclamation-circle me-1"></i>Pago pendiente</div>
                {defaultCard ? (
                  <div className="text-muted small">Se cobrará a la tarjeta terminada en <strong>{defaultCard.last4}</strong> ({defaultCard.brand})</div>
                ) : (
                  <div className="text-muted small">No tienes tarjeta asociada. <Link to="/pagos" className="text-primary">Agregar tarjeta</Link></div>
                )}
              </div>
              {defaultCard && (
                <button className="btn-primary-red" onClick={handlePay} disabled={paying} style={{ whiteSpace: 'nowrap' }}>
                  {paying ? <><span className="spinner-border spinner-border-sm me-1"></span>Procesando...</> : <><i className="fas fa-lock me-1"></i>Pagar Ahora</>}
                </button>
              )}
            </div>
          </div>
        )}

        {(paySuccess || !isPending) && invoice && (
          <div className="d-flex gap-2 mt-3 flex-wrap">
            <button
              className="btn btn-outline-secondary"
              style={{ borderRadius: '10px' }}
              onClick={() => generateInvoicePDF(invoice, space || { nombre: 'Espacio' }, authUser, payment)}
            >
              <i className="fas fa-file-pdf me-2"></i>Descargar Boleta PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentBreakdown;
