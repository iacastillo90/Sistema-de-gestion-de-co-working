export function SupportReplyForm({
  ticket, client, editingResp, setEditingResp, submitting,
  responseText, setResponseText, responseStatus, setResponseStatus, handleSendResponse
}) {
  const templates = [
    { label: '✅ Resuelto',   status: 'Resolved',   text: `Hola ${client?.nombre?.split(' ')[0] || 'estimado cliente'}, hemos revisado tu caso y está completamente resuelto. Si tienes alguna duda adicional, no dudes en contactarnos. ¡Gracias por confiar en JAFFA CoWork!` },
    { label: '🔍 Revisando',  status: 'In Review',  text: `Hola ${client?.nombre?.split(' ')[0] || 'estimado cliente'}, hemos recibido tu ticket y lo estamos analizando. Te contactaremos lo antes posible con una solución. ¡Gracias por tu paciencia!` },
    { label: '🙏 Disculpa',   status: 'In Review',  text: `Hola ${client?.nombre?.split(' ')[0] || 'estimado cliente'}, lamentamos los inconvenientes causados. Nuestro equipo está trabajando en esto y te daremos una solución definitiva muy pronto.` },
    { label: '💡 Sugerencia', status: 'Resolved',   text: `Hola ${client?.nombre?.split(' ')[0] || 'estimado cliente'}, gracias por tu sugerencia. La hemos registrado y la evaluaremos para mejorar nuestros servicios. ¡Tu opinión es muy valiosa para nosotros!` },
  ];

  return (
    <>
      {ticket.admin_response && !editingResp && (
        <div className="premium-card mb-4 border-top border-4 border-success">
          <div className="card-body p-4 p-lg-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0"><i className="fas fa-reply text-success me-2"></i>Respuesta del Equipo JAFFA</h5>
              <button className="btn btn-sm btn-outline-success" onClick={() => setEditingResp(true)}>
                <i className="fas fa-edit me-1"></i>Editar
              </button>
            </div>
            <div className="p-4 rounded-3" style={{ background: 'rgba(25,135,84,0.06)', borderLeft: '4px solid #198754' }}>
              <p className="mb-0" style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{ticket.admin_response}</p>
            </div>
          </div>
        </div>
      )}

      {(!ticket.admin_response || editingResp) && (
        <div className="premium-card mb-4 border-top border-4 border-primary">
          <div className="card-body p-4 p-lg-5">
            <h5 className="fw-bold mb-3">
              <i className="fas fa-paper-plane text-primary me-2"></i>
              {ticket.admin_response ? 'Editar Respuesta' : 'Responder Ticket'}
            </h5>

            <div className="mb-3">
              <div className="small text-muted mb-2 fw-semibold">✨ Plantillas rápidas:</div>
              <div className="d-flex gap-2 flex-wrap">
                {templates.map(({ label, text, status }) => (
                  <button
                    key={label}
                    type="button"
                    className="btn btn-sm btn-light border"
                    style={{ fontSize: '0.78rem' }}
                    onClick={() => { setResponseText(text); setResponseStatus(status); }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSendResponse}>
              <textarea
                className="form-control mb-3"
                rows={6}
                value={responseText}
                onChange={e => setResponseText(e.target.value)}
                placeholder="Escribe tu respuesta al cliente aquí..."
                required
                style={{ borderRadius: '10px', resize: 'vertical' }}
              />
              <div className="d-flex gap-3 align-items-center flex-wrap">
                <div>
                  <label className="small text-muted fw-semibold d-block mb-1">Cambiar estado a:</label>
                  <select
                    className="form-select"
                    value={responseStatus}
                    onChange={e => setResponseStatus(e.target.value)}
                    style={{ borderRadius: '10px', minWidth: '180px' }}
                  >
                    <option value="Open">Abierto</option>
                    <option value="In Review">En Revisión</option>
                    <option value="Resolved">Resuelto</option>
                  </select>
                </div>
                <div className="d-flex gap-2 mt-auto">
                  <button type="submit" className="btn-primary-red px-4" disabled={submitting}>
                    {submitting
                      ? <><span className="spinner-border spinner-border-sm me-2"></span>Enviando...</>
                      : <><i className="fas fa-paper-plane me-2"></i>Enviar Respuesta Oficial</>
                    }
                  </button>
                  {editingResp && (
                    <button type="button" className="btn btn-light fw-bold px-4" onClick={() => { setEditingResp(false); setResponseText(ticket.admin_response || ''); }}>
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
