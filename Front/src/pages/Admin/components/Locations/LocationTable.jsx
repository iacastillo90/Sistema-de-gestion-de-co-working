const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80';

export function LocationTable({ locations, spacesPerLoc, openEdit, setDelConfirm, openCreate }) {
  if (locations.length === 0) {
    return (
      <div className="premium-card">
        <div className="empty-state p-5 text-center">
          <i className="fas fa-map-marker-alt text-muted mb-3" style={{ fontSize: '3rem' }}></i>
          <h5 className="fw-bold">No hay sedes registradas</h5>
          <p className="text-muted">Crea la primera sede para gestionar las ubicaciones de JAFFA CoWork.</p>
          <button className="btn-primary-red" onClick={openCreate}>
            <i className="fas fa-plus"></i>Crear primera sede
          </button>
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
              <th style={{ paddingLeft: '1.5rem', width: '300px' }}>Sede</th>
              <th>Ubicación</th>
              <th>Teléfono</th>
              <th className="text-center">Espacios</th>
              <th>Descripción</th>
              <th className="text-end" style={{ paddingRight: '1.5rem' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {spacesPerLoc.map(loc => (
              <tr key={loc._id}>
                <td style={{ paddingLeft: '1.5rem' }}>
                  <div className="d-flex align-items-center gap-3">
                    <div style={{ width: '52px', height: '52px', flexShrink: 0, borderRadius: '10px', overflow: 'hidden' }}>
                      <img
                        src={loc.imagen || PLACEHOLDER_IMG}
                        alt={loc.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={e => { e.target.src = PLACEHOLDER_IMG; }}
                      />
                    </div>
                    <div>
                      <div className="fw-bold">{loc.name}</div>
                      <div className="text-muted small font-monospace">#{loc._id.slice(-6)}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="fw-semibold small">{loc.city}</div>
                  <div className="text-muted small text-truncate" style={{ maxWidth: '160px' }}>{loc.address}</div>
                  <div className="text-muted" style={{ fontSize: '0.72rem' }}>{loc.country}</div>
                </td>
                <td className="text-muted small">{loc.phone || '—'}</td>
                <td className="text-center">
                  <span className={`badge fw-bold px-3 py-2 ${loc.spaceCount > 0 ? 'bg-success bg-opacity-15 text-white' : 'bg-secondary bg-opacity-15 text-secondary'}`} style={{ borderRadius: '8px', fontSize: '0.85rem' }}>
                    {loc.spaceCount}
                  </span>
                </td>
                <td>
                  <div className="text-muted small text-truncate" style={{ maxWidth: '180px' }}>
                    {loc.descripcion || <span className="fst-italic opacity-50">Sin descripción</span>}
                  </div>
                </td>
                <td className="text-end" style={{ paddingRight: '1.5rem' }}>
                  <div className="d-flex justify-content-end gap-2">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => openEdit(loc)}
                      title="Editar sede"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => setDelConfirm(loc)}
                      title="Eliminar sede"
                    >
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
