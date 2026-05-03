import { Link } from 'react-router-dom';

function StatusBadge({ status }) {
  const map = {
    Open: { cls: 'badge-estado badge-cancelada', ico: 'fa-envelope-open', label: 'Abierto' },
    'In Review': { cls: 'badge-estado badge-pendiente', ico: 'fa-search', label: 'En Revisión' },
    Resolved: { cls: 'badge-estado badge-confirmada', ico: 'fa-check-circle', label: 'Resuelto' },
  };
  const s = map[status] || map.Open;
  return <span className={s.cls}><i className={`fas ${s.ico}`}></i>{s.label}</span>;
}

export function SupportTable({ filteredTickets, users }) {
  if (filteredTickets.length === 0) {
    return (
      <div className="premium-card">
        <div className="empty-state p-5 text-center">
          <i className="fas fa-headset text-muted mb-3" style={{ fontSize: '3rem' }}></i>
          <h5 className="fw-bold">Sin tickets</h5>
          <p className="text-muted">No se encontraron tickets con los filtros aplicados.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="premium-card overflow-hidden">
      <div className="admin-table-container">
        <table className="table premium-table admin-table align-middle mb-0">
          <thead>
            <tr>
              <th style={{ paddingLeft: '1.5rem' }}>ID</th>
              <th>Cliente</th>
              <th>Asunto</th>
              <th>Estado</th>
              <th>Respondido</th>
              <th>Fecha</th>
              <th className="text-end" style={{ paddingRight: '1.5rem' }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map(t => {
              const usr = users.find(u => u._id === t.user_id);
              const createdDate = new Date(t.createdAt).toLocaleDateString('es-CL');
              return (
                <tr key={t._id}>
                  <td style={{ paddingLeft: '1.5rem' }}>
                    <span className="text-muted small font-monospace">#{t._id.slice(-6).toUpperCase()}</span>
                  </td>
                  <td>
                    <div className="fw-semibold">{usr?.nombre || 'Usuario'}</div>
                    <div className="small text-muted">{usr?.email}</div>
                  </td>
                  <td>
                    <div className="fw-semibold text-truncate" style={{ maxWidth: '200px' }}>{t.subject}</div>
                    <div className="small text-muted text-truncate" style={{ maxWidth: '200px' }}>{t.description}</div>
                  </td>
                  <td><StatusBadge status={t.status} /></td>
                  <td>
                    {t.admin_response
                      ? <span className="badge bg-success bg-opacity-15 text-white fw-semibold px-2 py-1"><i className="fas fa-check me-1"></i>Sí</span>
                      : <span className="badge bg-secondary bg-opacity-15 text-white fw-semibold px-2 py-1"><i className="fas fa-minus me-1"></i>No</span>
                    }
                  </td>
                  <td className="small text-muted">{createdDate}</td>
                  <td className="text-end" style={{ paddingRight: '1.5rem' }}>
                    <Link to={`/admin/soporte/${t._id}`} className="btn btn-sm btn-outline-danger">
                      <i className="fas fa-reply me-1"></i>Gestionar
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
