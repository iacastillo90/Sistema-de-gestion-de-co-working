import { Link } from 'react-router-dom';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80';

function TipoBadge({ tipo }) {
  const map = {
    sala: { cls: 'bg-primary', label: 'Sala' },
    oficina: { cls: 'bg-success', label: 'Oficina' },
    escritorio: { cls: 'bg-warning', label: 'Escritorio' },
    coworking: { cls: 'bg-info', label: 'Coworking' },
  };
  const t = tipo?.toLowerCase();
  const { cls, label } = map[t] || { cls: 'bg-secondary text-white', label: tipo || 'Espacio' };
  return (
    <span className={`badge ${cls} bg-opacity-15 fw-semibold px-2 py-1`}
      style={{ borderRadius: '8px', fontSize: '0.72rem', color: 'inherit' }}>
      {label}
    </span>
  );
}

export function SpaceTable({ filteredSpaces, openEdit, setDelConfirm }) {
  if (filteredSpaces.length === 0) {
    return (
      <div className="premium-card overflow-hidden">
        <div className="empty-state p-5 text-center">
          <i className="fas fa-th-large text-muted mb-3" style={{ fontSize: '3rem' }}></i>
          <h5 className="fw-bold">Sin espacios</h5>
          <p className="text-muted">No hay espacios con los filtros aplicados.</p>
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
              <th style={{ paddingLeft: '1.5rem', minWidth: '240px' }}>Espacio</th>
              <th>Sede</th>
              <th>Tipo</th>
              <th className="text-center">Cap.</th>
              <th className="text-center">Precio</th>
              <th className="text-center">Reservas</th>
              <th className="text-center">Rating</th>
              <th className="text-end" style={{ paddingRight: '1.5rem' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredSpaces.map(sp => (
              <tr key={sp._id}>
                <td style={{ paddingLeft: '1.5rem' }}>
                  <div className="d-flex align-items-center gap-3">
                    <div style={{ width: '52px', height: '52px', flexShrink: 0, borderRadius: '10px', overflow: 'hidden' }}>
                      <img src={sp.imagen || PLACEHOLDER} alt={sp.nombre}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={e => { e.target.src = PLACEHOLDER; }} />
                    </div>
                    <div>
                      <div className="fw-bold">{sp.nombre}</div>
                      <div className="text-muted small font-monospace">#{sp._id.slice(-6)}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="small fw-semibold">{sp.locName}</div>
                </td>
                <td><TipoBadge tipo={sp.tipo} /></td>
                <td className="text-center">
                  <span className="badge bg-primary bg-opacity-10 text-primary fw-semibold" style={{ borderRadius: '8px' }}>
                    {sp.capacidad} <i className="fas fa-user ms-1" style={{ fontSize: '0.65rem' }}></i>
                  </span>
                </td>
                <td className="text-center fw-bold text-success">${Number(sp.precio).toLocaleString()}</td>
                <td className="text-center">
                  <span className={`badge fw-semibold ${sp.resCount > 0 ? 'bg-success bg-opacity-15 text-white' : 'bg-secondary bg-opacity-15 text-white'}`}
                    style={{ borderRadius: '8px' }}>
                    {sp.resCount}
                  </span>
                </td>
                <td className="text-center">
                  {sp.avgRating
                    ? <span className="small fw-bold text-warning"><i className="fas fa-star me-1"></i>{sp.avgRating}</span>
                    : <span className="text-muted small">—</span>
                  }
                </td>
                <td className="text-end" style={{ paddingRight: '1.5rem' }}>
                  <div className="d-flex justify-content-end gap-2">
                    <Link to={`/admin/espacios/${sp._id}`} className="btn btn-sm btn-outline-primary" title="Ver detalle">
                      <i className="fas fa-eye"></i>
                    </Link>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => openEdit(sp)} title="Editar">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => setDelConfirm(sp)} title="Eliminar">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
