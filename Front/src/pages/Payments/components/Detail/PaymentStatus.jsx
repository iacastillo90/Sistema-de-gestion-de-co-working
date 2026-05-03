function PaymentStatus({ payment, isPending, createdDate, invoice }) {
  return (
    <>
      {/* Estado del pago */}
      <div className="premium-card mb-4">
        <div className="card-body p-4">
          <h6 className="fw-bold mb-3"><i className="fas fa-info-circle me-2 text-primary"></i>Estado del Pago</h6>
          <div className="text-center py-2">
            <div className={`rounded-circle d-inline-flex align-items-center justify-content-center mb-3`}
              style={{ width: '64px', height: '64px', background: isPending ? 'rgba(220,53,69,0.1)' : 'rgba(25,135,84,0.1)' }}>
              <i className={`fas ${isPending ? 'fa-clock text-danger' : 'fa-check-circle text-success'} fs-2`}></i>
            </div>
            <div className={`fw-bold fs-5 ${isPending ? 'text-danger' : 'text-success'}`}>{payment.estado}</div>
            <div className="text-muted small mt-1">{isPending ? 'Este pago aún no ha sido procesado' : 'Pago procesado exitosamente'}</div>
          </div>

          <hr />
          <div className="d-flex flex-column gap-2">
            <div className="d-flex justify-content-between">
              <span className="text-muted small">ID de Pago</span>
              <span className="fw-bold small font-monospace">#{payment._id.slice(-8).toUpperCase()}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="text-muted small">Generado el</span>
              <span className="small">{createdDate}</span>
            </div>
            {invoice && (
              <div className="d-flex justify-content-between">
                <span className="text-muted small">Boleta</span>
                <span className="small text-success fw-bold"><i className="fas fa-check me-1"></i>Emitida</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Método de pago */}
      <div className="premium-card mb-4">
        <div className="card-body p-4">
          <h6 className="fw-bold mb-3"><i className="fas fa-credit-card me-2 text-primary"></i>Método de Pago</h6>
          <div className="d-flex align-items-center gap-3">
            <div className="rounded-circle bg-light d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
              <i className={`fas ${payment.metodo_pago?.toLowerCase().includes('tarjeta') ? 'fa-credit-card text-primary' : payment.metodo_pago?.toLowerCase() === 'transferencia' ? 'fa-university text-info' : 'fa-money-bill-wave text-success'} fs-5`}></i>
            </div>
            <div>
              <div className="fw-bold">{payment.metodo_pago}</div>
              {payment.metodo_pago?.toLowerCase() === 'transferencia' && (
                <small className="text-muted">Banco de Chile · Cuenta Cte. 123456</small>
              )}
              {payment.metodo_pago?.toLowerCase() === 'efectivo' && (
                <small className="text-muted">Pagar en cualquiera de nuestras sedes</small>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentStatus;
