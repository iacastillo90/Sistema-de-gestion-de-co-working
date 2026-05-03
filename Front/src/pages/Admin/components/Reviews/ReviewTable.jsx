import { Link } from 'react-router-dom';

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <i key={i} className={`fas fa-star ${i <= rating ? 'text-warning' : 'text-secondary opacity-25'}`}></i>
    );
  }
  return stars;
};

export function ReviewTable({ filteredReviews, users, spaces, locations }) {
  if (filteredReviews.length === 0) {
    return (
      <div className="premium-card">
        <div className="empty-state p-5 text-center">
          <i className="fas fa-comment-slash text-muted mb-3" style={{ fontSize: '3rem' }}></i>
          <h5 className="fw-bold">No hay reseñas</h5>
          <p className="text-muted">No se encontraron opiniones con los filtros aplicados.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="premium-card overflow-hidden">
      <div className="admin-table-container">
        <table className="table admin-table premium-table align-middle mb-0">
          <thead>
            <tr>
              <th style={{ paddingLeft: '1.5rem' }}>ID</th>
              <th>Cliente</th>
              <th>Espacio / Sede</th>
              <th>Calificación</th>
              <th>Comentario</th>
              <th className="text-end" style={{ paddingRight: '1.5rem' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews.map(r => {
              const usr = users.find(u => u._id === r.user_id);
              const space = spaces.find(s => s._id === r.space_id);
              const loc = space ? locations.find(l => l._id === space.location_id || l._id === space.location_id?._id) : null;
              
              return (
                <tr key={r._id}>
                  <td style={{ paddingLeft: '1.5rem' }}>
                    <span className="text-muted small fw-mono">#{r._id.slice(-6)}</span>
                  </td>
                  <td>
                    <div className="fw-semibold text-dark">{usr?.nombre || 'Usuario Desconocido'}</div>
                    <div className="small text-muted">{usr?.email}</div>
                  </td>
                  <td>
                    <div className="fw-semibold">{space?.nombre || 'Espacio'}</div>
                    <div className="small text-muted">{loc?.name || 'Sede'}</div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-1">
                      {renderStars(Number(r.calificacion))}
                    </div>
                  </td>
                  <td>
                    <div className="text-truncate text-muted" style={{ maxWidth: '200px', fontSize: '0.9rem' }}>
                      "{r.comentario}"
                    </div>
                    <div className="small text-muted">{r.fecha}</div>
                  </td>
                  <td className="text-end" style={{ paddingRight: '1.5rem' }}>
                    <Link to={`/admin/reseñas/${r._id}`} className="btn btn-sm btn-outline-danger" title="Gestionar Reseña">
                      <i className="fas fa-eye me-1"></i>Gestionar
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { renderStars };
