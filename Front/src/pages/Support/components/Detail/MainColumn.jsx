import { StatusBadge } from '../Common/StatusBadge';

export function MainColumn({ 
  ticket, 
  createdDate, 
  authUser, 
  isAdmin, 
  handleAdminRespond, 
  responseText, 
  setResponseText, 
  responseStatus, 
  setResponseStatus, 
  responding 
}) {
  return (
    <div className="col-lg-8">
      <div className="premium-card">
        <div className="card-body p-4 p-lg-5">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-start mb-4 gap-3">
            <div>
              <h4 className="fw-bold mb-1">{ticket.subject}</h4>
              <small className="text-muted"><i className="fas fa-clock me-1"></i>{createdDate}</small>
            </div>
            <StatusBadge status={ticket.status} />
          </div>

          {/* Mensaje del usuario */}
          <div className="p-4 rounded-3 mb-4 support-msg-box">
            <div className="d-flex align-items-center gap-2 mb-2">
              <div className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', fontSize: '0.8rem' }}>
                {(authUser.email || 'U').charAt(0).toUpperCase()}
              </div>
              <strong className="small">Tu Mensaje</strong>
            </div>
            <p className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>{ticket.description}</p>
          </div>

          {/* Respuesta del Admin */}
          {ticket.admin_response && (
            <div className="p-4 rounded-3 mb-4 support-admin-reply">
              <div className="d-flex align-items-center gap-2 mb-2">
                <div className="text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', fontSize: '0.8rem', background: 'var(--primary-red)' }}>
                  J
                </div>
                <strong className="small" style={{ color: 'var(--primary-red)' }}>Respuesta del Equipo JAFFA</strong>
              </div>
              <p className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>{ticket.admin_response}</p>
            </div>
          )}

          {!ticket.admin_response && ticket.status === 'Open' && !isAdmin && (
            <div className="p-4 rounded-3 text-center support-wait-box">
              <i className="fas fa-hourglass-half text-warning fs-3 mb-2 d-block"></i>
              <p className="text-muted mb-0">Tu ticket está siendo revisado por el equipo de JAFFA CoWork. Recibirás una respuesta pronto a tu correo electrónico.</p>
            </div>
          )}

          {/* Admin response form */}
          {isAdmin && (
            <div className="p-4 rounded-3 mt-4 support-form-box">
              <h6 className="fw-bold mb-3"><i className="fas fa-reply me-2 text-primary"></i>Responder al Usuario</h6>
              <form onSubmit={handleAdminRespond}>
                <textarea
                  className="form-control mb-3"
                  rows="4"
                  placeholder="Escribe tu respuesta al usuario..."
                  value={responseText}
                  onChange={e => setResponseText(e.target.value)}
                  required
                  style={{ borderRadius: '10px' }}
                ></textarea>
                <div className="d-flex gap-3 align-items-center">
                  <select
                    className="form-select"
                    value={responseStatus}
                    onChange={e => setResponseStatus(e.target.value)}
                    style={{ borderRadius: '10px', maxWidth: '200px' }}
                  >
                    <option value="Open">Abierto</option>
                    <option value="In Review">En Revisión</option>
                    <option value="Resolved">Resuelto</option>
                  </select>
                  <button type="submit" className="btn btn-primary fw-bold px-4" disabled={responding}>
                    {responding ? 'Enviando...' : <><i className="fas fa-paper-plane me-2"></i>Enviar Respuesta</>}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
