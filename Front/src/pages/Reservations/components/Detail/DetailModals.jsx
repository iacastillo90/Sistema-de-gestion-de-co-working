export function SupportModal({ 
  show, 
  onClose, 
  handleSupportSubmit, 
  supportMessage, 
  setSupportMessage, 
  supportSending 
}) {
  if (!show) return null;
  return (
    <div className="modal fade show d-block premium-modal" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold"><i className="fas fa-headset text-primary me-2"></i>Soporte para tu Reserva</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSupportSubmit}>
            <div className="modal-body p-4">
              <p className="text-muted small mb-3">
                ¿Necesitas catering especial, equipos extra, o tienes algún problema con tu reserva? Cuéntanos y te ayudaremos.
              </p>
              <label className="form-label-premium">Mensaje</label>
              <textarea 
                className="form-control-premium w-100" 
                rows="4" 
                placeholder="Escribe aquí tus necesidades..."
                value={supportMessage}
                onChange={e => setSupportMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
              <button type="submit" className="btn btn-primary" disabled={supportSending}>
                {supportSending ? 'Enviando...' : 'Enviar Solicitud'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export function CancelModal({ show, onClose, handleCancelConfirm, space, reservation }) {
  if (!show) return null;
  return (
    <div className="modal fade show d-block premium-modal" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ borderTop: '6px solid var(--primary-red)' }}>
          <div className="modal-body p-5 text-center">
            <div className="mb-4">
              <i className="fas fa-exclamation-triangle text-danger" style={{ fontSize: '4rem' }}></i>
            </div>
            <h4 className="fw-bold mb-3">¿Cancelar Reserva?</h4>
            <p className="text-muted mb-4">
              Estás a punto de cancelar tu reserva en <strong>{space.nombre}</strong> para el día <strong>{reservation.fecha}</strong>.<br/><br/>
              Esta acción no se puede deshacer y el espacio volverá a estar disponible para otros usuarios.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <button type="button" className="btn btn-light fw-bold px-4 py-2" onClick={onClose}>
                No, mantener
              </button>
              <button type="button" className="btn btn-danger fw-bold px-4 py-2" onClick={handleCancelConfirm}>
                Sí, cancelar reserva
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SupportSuccessModal({ show, onClose, space }) {
  if (!show) return null;
  return (
    <div className="modal fade show d-block premium-modal" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ borderTop: '6px solid var(--primary)' }}>
          <div className="modal-body p-5 text-center">
            <div className="mb-4">
              <i className="fas fa-check-circle text-primary" style={{ fontSize: '4rem' }}></i>
            </div>
            <h4 className="fw-bold mb-3">Mensaje Enviado</h4>
            <p className="text-muted mb-4">
              Tu solicitud ha sido enviada con éxito al equipo de JAFFA CoWork.<br/><br/>
              Pronto nos pondremos en contacto contigo a tu correo electrónico para gestionar los detalles de tu reserva en <strong>{space.nombre}</strong>.
            </p>
            <button type="button" className="btn btn-primary fw-bold px-5 py-2" onClick={onClose}>
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
