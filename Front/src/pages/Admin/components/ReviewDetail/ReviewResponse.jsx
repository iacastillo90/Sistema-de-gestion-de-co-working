export function ReviewResponse({
  review, client, editingResponse, setEditingResponse,
  respuestaText, setRespuestaText, handleSaveResponse, submitting
}) {
  const quickReplies = [
    { label: 'Gracias', text: `¡Gracias por tu reseña, ${client?.nombre?.split(' ')[0] || 'estimado cliente'}! Nos alegra mucho conocer tu experiencia con nosotros. ¡Esperamos verte pronto en JAFFA CoWork! 🙌` },
    { label: 'Disculpa', text: `Lamentamos mucho que tu experiencia no haya sido la ideal, ${client?.nombre?.split(' ')[0] || 'estimado cliente'}. Hemos tomado nota de tu feedback y trabajaremos para mejorar. ¡Gracias por ayudarnos a crecer!` },
    { label: 'Sugerencia', text: `Gracias por tu comentario. Te invitamos a visitar nuestra web o contactarnos directamente para conocer nuestras nuevas mejoras. ¡Esperamos poder superar tus expectativas en tu próxima visita!` },
  ];

  return (
    <div className="premium-card mb-4 border-top border-4 border-success">
      <div className="card-body p-4 p-lg-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">
            <i className="fas fa-reply text-success me-2"></i>Respuesta Oficial de JAFFA
          </h5>
          {!editingResponse && (
            <button className="btn btn-sm btn-outline-success fw-bold" onClick={() => setEditingResponse(true)}>
              <i className={`fas ${review.respuesta_admin ? 'fa-edit' : 'fa-plus'} me-1`}></i>
              {review.respuesta_admin ? 'Editar Respuesta' : 'Agregar Respuesta'}
            </button>
          )}
        </div>

        {!editingResponse ? (
          review.respuesta_admin ? (
            <div className="p-4 rounded" style={{ background: 'linear-gradient(135deg, rgba(25,135,84,0.08), rgba(25,135,84,0.03))', borderLeft: '4px solid #198754' }}>
              <p className="mb-2" style={{ lineHeight: '1.7' }}>{review.respuesta_admin}</p>
              <small className="text-muted"><i className="fas fa-clock me-1"></i>Respondido el {review.fecha_respuesta} por el equipo de JAFFA CoWork</small>
            </div>
          ) : (
            <div className="text-center py-4 text-muted">
              <i className="fas fa-comment-dots mb-2" style={{ fontSize: '2rem', opacity: 0.4 }}></i>
              <p className="mb-0 small">Aún no has respondido esta reseña. Responder muestra al cliente que su opinión importa.</p>
            </div>
          )
        ) : (
          <div>
            <div className="mb-2 d-flex gap-2 flex-wrap">
              {quickReplies.map(({ label, text }) => (
                <button key={label} type="button" className="btn btn-sm btn-light border" onClick={() => setRespuestaText(text)} style={{ fontSize: '0.75rem' }}>
                  ✨ {label}
                </button>
              ))}
            </div>
            <textarea
              className="form-control mb-3"
              rows={5}
              value={respuestaText}
              onChange={e => setRespuestaText(e.target.value)}
              placeholder="Escribe la respuesta oficial de JAFFA CoWork a esta reseña..."
              style={{ borderRadius: '10px', resize: 'vertical' }}
            />
            <div className="d-flex gap-2">
              <button className="btn btn-success fw-bold px-4" onClick={handleSaveResponse} disabled={submitting}>
                <i className="fas fa-save me-2"></i>{submitting ? 'Guardando...' : 'Guardar Respuesta'}
              </button>
              <button className="btn btn-light fw-bold px-4" onClick={() => { setEditingResponse(false); setRespuestaText(review.respuesta_admin || ''); }}>
                Cancelar
              </button>
              {review.respuesta_admin && (
                <button className="btn btn-outline-danger fw-bold px-4" onClick={() => { setRespuestaText(''); handleSaveResponse(); }}>
                  <i className="fas fa-times me-1"></i>Borrar Respuesta
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
