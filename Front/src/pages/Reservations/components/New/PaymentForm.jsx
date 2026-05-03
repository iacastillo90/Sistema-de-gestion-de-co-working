function PaymentForm({ 
  form, 
  setForm, 
  cards, 
  cantidadHoras, 
  montoTotal, 
  submitting, 
  navigate 
}) {
  return (
    <div className="premium-card h-100 d-flex flex-column">
      <div className="card-body p-4 p-lg-5 flex-grow-1">
        <h6 className="fw-bold mb-4">Método de Pago</h6>

        <div className="mb-4">
          <div className="form-check mb-3">
            <input className="form-check-input" type="radio" name="metodo" id="efectivo"
              checked={form.metodo_pago === 'Efectivo'}
              onChange={() => setForm({ ...form, metodo_pago: 'Efectivo' })} />
            <label className="form-check-label fw-bold" htmlFor="efectivo">
              <i className="fas fa-money-bill-wave me-2 text-success"></i>Efectivo (en sede)
            </label>
          </div>
          <div className="form-check mb-3">
            <input className="form-check-input" type="radio" name="metodo" id="transferencia"
              checked={form.metodo_pago === 'Transferencia'}
              onChange={() => setForm({ ...form, metodo_pago: 'Transferencia' })} />
            <label className="form-check-label fw-bold" htmlFor="transferencia">
              <i className="fas fa-university me-2 text-primary"></i>Transferencia
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="metodo" id="tarjeta"
              checked={form.metodo_pago === 'Tarjeta'}
              onChange={() => {
                const def = cards.find(c => c.is_default) || cards[0];
                setForm({ ...form, metodo_pago: 'Tarjeta', card_id: def ? def._id : '' });
              }} />
            <label className="form-check-label fw-bold" htmlFor="tarjeta">
              <i className="fas fa-credit-card me-2 text-danger"></i>Tarjeta Asociada
            </label>
          </div>
        </div>

        {form.metodo_pago === 'Tarjeta' && (
          <div className="mb-4 p-3 rounded-3" style={{ background: '#f8f9fa', border: '1px solid #e9ecef' }}>
            {cards.length > 0 ? (
              <>
                <label className="form-label-premium">Selecciona tu tarjeta</label>
                <select className="form-select-premium w-100" value={form.card_id} onChange={e => setForm({ ...form, card_id: e.target.value })}>
                  {cards.map(c => (
                    <option key={c._id} value={c._id}>
                      {c.brand} terminada en {c.last4}
                    </option>
                  ))}
                </select>
                <small className="text-muted d-block mt-2"><i className="fas fa-lock me-1"></i>Pago seguro y automático.</small>
              </>
            ) : (
              <div className="text-center">
                <p className="text-muted small mb-2">No tienes tarjetas guardadas.</p>
                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => navigate('/pagos')}>
                  Ir a agregar tarjeta
                </button>
              </div>
            )}
          </div>
        )}

        <hr className="my-4" />

        <h6 className="fw-bold mb-3">Resumen</h6>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-muted">Horas totales:</span>
          <span className="fw-bold">{cantidadHoras > 0 ? cantidadHoras.toFixed(1) : '-'} hrs</span>
        </div>
        <div className="d-flex justify-content-between mb-3">
          <span className="text-muted">Estado del pago:</span>
          {form.metodo_pago === 'Tarjeta' ? (
            <span className="badge-estado badge-confirmada">Cobro inmediato</span>
          ) : (
            <span className="badge-estado badge-pendiente">Quedará pendiente</span>
          )}
        </div>

        <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
          <span className="fw-bold">Total a Pagar</span>
          <span className="fs-3 fw-bold" style={{ color: 'var(--dark-text)' }}>
            ${montoTotal.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="p-4 p-lg-5 pt-0 mt-auto">
        <button
          type="submit"
          className="btn-primary-red w-100"
          disabled={submitting || (form.metodo_pago === 'Tarjeta' && !form.card_id)}
          style={{ justifyContent: 'center', padding: '1rem', fontSize: '1.05rem' }}
        >
          {submitting
            ? <><span className="spinner-border spinner-border-sm me-2"></span>Procesando...</>
            : form.metodo_pago === 'Tarjeta' ? <><i className="fas fa-lock"></i>Pagar y Reservar</> : <><i className="fas fa-check"></i>Confirmar Reserva</>
          }
        </button>
      </div>
    </div>
  );
}

export default PaymentForm;
