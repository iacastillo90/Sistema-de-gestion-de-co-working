import { Link } from 'react-router-dom';

function renderStars(n) {
  return (
    <div style={{ color: '#ffc107', fontSize: '0.9rem', letterSpacing: '1px' }}>
      {Array.from({ length: 5 }, (_, i) => (
        <i key={i} className={`fas fa-star ${i < n ? '' : 'text-muted opacity-25'}`}></i>
      ))}
    </div>
  );
}

export function SpaceTabsContent({ reservations, reviews }) {
  return (
    <div className="tab-content" id="spaceTabsContent">
      {/* Tab: Reservas */}
      <div className="tab-pane fade show active" id="res" role="tabpanel">
        <div className="premium-card overflow-hidden">
          {reservations.length === 0 ? (
            <div className="p-5 text-center">
              <i className="fas fa-calendar-times text-muted mb-3" style={{ fontSize: '3rem' }}></i>
              <h5 className="fw-bold">Sin reservas</h5>
              <p className="text-muted">Este espacio no tiene reservas registradas aún.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table premium-table align-middle mb-0">
                <thead>
                  <tr>
                    <th style={{ paddingLeft: '1.5rem' }}>Fecha</th>
                    <th>Horario</th>
                    <th>Estado</th>
                    <th className="text-end">Total</th>
                    <th className="text-center" style={{ paddingRight: '1.5rem' }}>Ver</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map(res => (
                    <tr key={res._id}>
                      <td style={{ paddingLeft: '1.5rem' }}>
                        <div className="fw-semibold">{res.fecha}</div>
                        <div className="text-muted small font-monospace">#{res._id.slice(-6)}</div>
                      </td>
                      <td>{res.hora_inicio} - {res.hora_fin}</td>
                      <td>
                        <span className={`badge text-white ${res.estado === 'Confirmada' ? 'bg-success' : res.estado === 'Pendiente' ? 'bg-warning' : 'bg-danger'} bg-opacity-15 text-${res.estado === 'Confirmada' ? 'success' : res.estado === 'Pendiente' ? 'warning' : 'danger'} fw-semibold px-2 py-1`}>
                          {res.estado}
                        </span>
                      </td>
                      <td className="text-end fw-bold">${Number(res.total || 0).toLocaleString()}</td>
                      <td className="text-center" style={{ paddingRight: '1.5rem' }}>
                        <Link to={`/admin/reservas/${res._id}`} className="btn btn-sm btn-outline-secondary">
                          <i className="fas fa-arrow-right"></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Tab: Reseñas */}
      <div className="tab-pane fade" id="rev" role="tabpanel">
        <div className="row g-4">
          {reviews.length === 0 ? (
            <div className="col-12">
              <div className="premium-card p-5 text-center">
                <i className="fas fa-comment-slash text-muted mb-3" style={{ fontSize: '3rem' }}></i>
                <h5 className="fw-bold">Sin reseñas</h5>
                <p className="text-muted">Aún no han evaluado este espacio.</p>
              </div>
            </div>
          ) : (
            reviews.map(rev => (
              <div className="col-12" key={rev._id}>
                <div className="premium-card p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      {renderStars(rev.calificacion)}
                      <div className="text-muted small mt-1">
                        {new Date(rev.createdAt).toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                    <Link to={`/admin/reseñas/${rev._id}`} className="btn btn-sm btn-outline-secondary">
                      Ver completa <i className="fas fa-arrow-right ms-1"></i>
                    </Link>
                  </div>
                  <p className="mb-0 text-dark fst-italic">"{rev.comentario}"</p>
                  {rev.admin_response && (
                    <div className="mt-3 p-3 rounded bg-light border-start border-3 border-danger small">
                      <strong className="d-block mb-1 text-danger"><i className="fas fa-reply me-1"></i>Respuesta JAFFA:</strong>
                      <span className="text-muted">{rev.admin_response}</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
