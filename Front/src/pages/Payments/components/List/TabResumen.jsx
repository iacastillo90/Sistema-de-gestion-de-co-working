function TabResumen({ totalPagado, totalPendiente, pagosCompletados, pagosPendientes, defaultCard, setActiveTab }) {
  return (
    <div className="row g-4 mb-4">
      <div className="col-md-4">
        <div className="bank-summary-card">
          <div className="bank-summary-label">Total Pagado</div>
          <div className="bank-summary-amount text-success">${totalPagado.toLocaleString()}</div>
          <div className="text-muted small"><i className="fas fa-check-circle me-1"></i>{pagosCompletados.length} transacciones exitosas</div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="bank-summary-card">
          <div className="bank-summary-label">Saldo Pendiente</div>
          <div className="bank-summary-amount text-danger">${totalPendiente.toLocaleString()}</div>
          <div className="text-muted small"><i className="fas fa-exclamation-circle me-1"></i>{pagosPendientes.length} pagos por realizar</div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="bank-summary-card d-flex flex-column justify-content-center align-items-center text-center">
          {defaultCard ? (
            <>
              <div className="bank-summary-label mb-2">Tarjeta Activa</div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <i className={`fab fa-cc-${defaultCard.brand.toLowerCase()} fa-2x text-primary`}></i>
                <span className="fw-bold fs-5">•••• {defaultCard.last4}</span>
              </div>
              <button className="btn btn-sm btn-outline-secondary mt-2" onClick={() => setActiveTab('tarjetas')}>Cambiar</button>
            </>
          ) : (
            <>
              <div className="bank-summary-label mb-2">Sin método de pago</div>
              <button className="btn-primary-red btn-sm mt-2" onClick={() => setActiveTab('tarjetas')}>
                <i className="fas fa-plus"></i> Agregar Tarjeta
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TabResumen;
