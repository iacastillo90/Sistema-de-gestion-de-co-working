function RolBadge({ rol }) {
  const isAdmin = rol === 'admin';
  return (
    <span
      className={`badge fw-semibold px-2 py-1 ${isAdmin ? 'bg-danger bg-opacity-15 text-white' : 'bg-primary bg-opacity-15 text-white'}`}
      style={{ borderRadius: '8px', fontSize: '0.75rem' }}
    >
      <i className={`fas ${isAdmin ? 'fa-shield-alt' : 'fa-user'} me-1`}></i>
      {isAdmin ? 'Administrador' : 'Cliente'}
    </span>
  );
}

export function UserTable({ filteredUsers, currentUserId, setModal, submitting }) {
  if (filteredUsers.length === 0) {
    return (
      <div className="premium-card">
        <div className="empty-state p-5 text-center">
          <i className="fas fa-users text-muted mb-3" style={{ fontSize: '3rem' }}></i>
          <h5 className="fw-bold">Sin resultados</h5>
          <p className="text-muted">No se encontraron usuarios con los filtros aplicados.</p>
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
              <th style={{ paddingLeft: '1.5rem' }}>Usuario</th>
              <th>Email</th>
              <th>Rol Actual</th>
              <th className="text-end" style={{ paddingRight: '1.5rem' }}>Cambiar Rol</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(u => {
              const isSelf = u._id === currentUserId;
              const initial = (u.nombre || u.email || 'U').charAt(0).toUpperCase();
              const hue = parseInt((u._id || '').slice(-6), 16) % 360;

              return (
                <tr key={u._id}>
                  <td style={{ paddingLeft: '1.5rem' }}>
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="admin-avatar"
                        style={{ background: `hsl(${hue}, 50%, 52%)` }}
                      >
                        {initial}
                      </div>
                      <div>
                        <div className="fw-semibold">
                          {u.nombre}
                          {isSelf && <span className="badge bg-secondary bg-opacity-15 text-white ms-2 small">Tú</span>}
                        </div>
                        <div className="small text-muted font-monospace">#{u._id.slice(-6)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-muted small">{u.email}</td>
                  <td><RolBadge rol={u.rol} /></td>
                  <td className="text-end" style={{ paddingRight: '1.5rem' }}>
                    {isSelf ? (
                      <span className="text-muted small fst-italic">Tu propia cuenta</span>
                    ) : (
                      <div className="d-flex gap-2 justify-content-end">
                        {u.rol !== 'admin' ? (
                          <button
                            className="btn btn-sm btn-outline-danger fw-bold"
                            onClick={() => setModal({ show: true, user: u, newRol: 'admin' })}
                            disabled={submitting === u._id}
                          >
                            <i className="fas fa-shield-alt me-1"></i>Hacer Admin
                          </button>
                        ) : (
                          <button
                            className="btn btn-sm btn-outline-primary fw-bold"
                            onClick={() => setModal({ show: true, user: u, newRol: 'user' })}
                            disabled={submitting === u._id}
                          >
                            <i className="fas fa-user me-1"></i>Quitar Admin
                          </button>
                        )}
                      </div>
                    )}
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
