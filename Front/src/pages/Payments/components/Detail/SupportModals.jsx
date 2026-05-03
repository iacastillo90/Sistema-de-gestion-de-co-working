import { useNavigate } from 'react-router-dom';

export function SupportIssueModal({ 
  show, 
  onClose, 
  handleSendSupport, 
  supportMsg, 
  setSupportMsg, 
  supportSending 
}) {
  if (!show) return null;

  return (
    <div className="modal fade show d-block premium-modal" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ borderTop: '6px solid var(--primary-red)' }}>
          <form onSubmit={handleSendSupport}>
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold"><i className="fas fa-headset me-2 text-danger"></i>Ticket de Soporte</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <p className="text-muted small mb-3">Tu consulta estará vinculada automáticamente a este pago para que nuestro equipo tenga todo el contexto.</p>
              <label className="form-label-premium">Describe tu problema o consulta</label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Ej: El pago aparece como pendiente pero ya realicé la transferencia..."
                value={supportMsg}
                onChange={e => setSupportMsg(e.target.value)}
                required
                style={{ borderRadius: '10px' }}
              ></textarea>
            </div>
            <div className="modal-footer border-0 pt-0">
              <button type="button" className="btn btn-light" onClick={onClose}>Cancelar</button>
              <button type="submit" className="btn btn-danger fw-bold px-4" disabled={supportSending}>
                {supportSending ? <><span className="spinner-border spinner-border-sm me-2"></span>Enviando...</> : <><i className="fas fa-paper-plane me-2"></i>Enviar</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export function SupportSuccessModal({ show, onClose, navigate }) {
  if (!show) return null;

  return (
    <div className="modal fade show d-block premium-modal" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
      <div className="modal-dialog modal-dialog-centered modal-sm">
        <div className="modal-content text-center p-4" style={{ borderTop: '6px solid #198754' }}>
          <i className="fas fa-check-circle text-success fs-1 mb-3"></i>
          <h5 className="fw-bold mb-2">¡Ticket Enviado!</h5>
          <p className="text-muted small mb-4">Nuestro equipo revisará tu caso y te responderá pronto a tu correo.</p>
          <div className="d-flex gap-2 justify-content-center">
            <button className="btn btn-outline-secondary" onClick={() => { onClose(); navigate('/soporte'); }}>
              Ver mis tickets
            </button>
            <button className="btn btn-success fw-bold px-4" onClick={onClose}>Entendido</button>
          </div>
        </div>
      </div>
    </div>
  );
}
