import { Link } from 'react-router-dom';

function EstadoBadge({ estado }) {
  const config = {
    Pendiente: { cls: 'badge-estado badge-cancelada', ico: 'fa-clock' },
    'En Revisión': { cls: 'badge-estado badge-pendiente', ico: 'fa-search' },
    Completado: { cls: 'badge-estado badge-confirmada', ico: 'fa-check-double' },
  };
  const { cls, ico } = config[estado] || config.Pendiente;
  return (
    <span className={cls}>
      <i className={`fas ${ico}`}></i>{estado}
    </span>
  );
}

export function PaymentTable({ filteredPayments, reservations, users, spaces }) {
  if (filteredPayments.length === 0) {
    return (
      <div className="premium-card">
        <div className="empty-state p-5 text-center">
          <i className="fas fa-file-invoice-dollar text-muted mb-3" style={{ fontSize: '3rem' }}></i>
          <h5 className="fw-bold">No hay registros</h5>
          <p className="text-muted">No se encontraron pagos con los filtros aplicados.</p>
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
              <th style={{ paddingLeft: '1.5rem' }}>ID Pago</th>
              <th>Cliente</th>
              <th>Reserva</th>
              <th>Monto</th>
              <th>Método</th>
              <th>Estado</th>
              <th className="text-end" style={{ paddingRight: '1.5rem' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map(p => {
              const res = reservations.find(r => r._id === p.reservation_id);
              const usr = res ? users.find(u => u._id === res.user_id) : null;
              const space = res ? spaces.find(s => s._id === res.space_id) : null;
              
              return (
                <tr key={p._id}>
                  <td style={{ paddingLeft: '1.5rem' }}>
                    <span className="text-muted small fw-mono">#{p._id.slice(-6)}</span>
                  </td>
                  <td>
                    <div className="fw-semibold text-dark">{usr?.nombre || 'Usuario Desconocido'}</div>
                    <div className="small text-muted">{usr?.email}</div>
                  </td>
                  <td>
                    <div className="fw-semibold">{space?.nombre || 'Espacio'}</div>
                    <div className="small text-muted">{res?.fecha}</div>
                  </td>
                  <td>
                    <span className="fw-bold text-success">${p.monto.toLocaleString()}</span>
                  </td>
                  <td>{p.metodo_pago}</td>
                  <td><EstadoBadge estado={p.estado} /></td>
                  <td className="text-end" style={{ paddingRight: '1.5rem' }}>
                    <Link to={`/admin/pagos/${p._id}`} className="btn btn-sm btn-outline-danger" title="Ver Detalle">
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
