import { Link } from 'react-router-dom';

export function SpaceCard({ space, isAdmin, openEdit, handleDelete }) {
  return (
    <div className="col-md-6 col-lg-4">
      <div className="space-card h-100">
        {space.imagen && (
          <img src={space.imagen} alt={space.nombre} />
        )}
        <div className="card-body d-flex flex-column p-4">
          <div className="d-flex justify-content-between align-items-start mb-2 gap-2">
            <h5 className="fw-bold mb-0">{space.nombre}</h5>
            <span className={`badge-estado ${space.disponibilidad ? 'badge-disponible' : 'badge-no-disponible'}`}>
              <i className={`fas ${space.disponibilidad ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
              {space.disponibilidad ? 'Disponible' : 'No disponible'}
            </span>
          </div>
          <p className="text-muted small flex-grow-1">{space.descripcion}</p>
          <div className="d-flex gap-3 mb-3 flex-wrap">
            <span className="info-row">
              <i className="fas fa-users"></i>{space.capacidad} pers.
            </span>
            <span className="info-row">
              <i className="fas fa-dollar-sign"></i>${space.precio?.toLocaleString?.() ?? space.precio} x Hora
            </span>
            <span className="info-row">
              <i className="fas fa-map-marker-alt"></i>
              {space.location_id?.name || space.ubicacion}
            </span>
          </div>
          <div className="d-flex gap-2 mt-auto">
            <Link to={`/espacios/${space._id}`} className="btn-outline-red flex-grow-1" style={{ justifyContent: 'center', padding: '0.45rem 1rem' }}>
              Ver detalle
            </Link>
            {isAdmin && (
              <>
                <button className="btn btn-outline-secondary btn-sm" onClick={() => openEdit(space)} title="Editar">
                  <i className="fas fa-edit"></i>
                </button>
                <button className="btn btn-sm" onClick={() => handleDelete(space._id)} title="Eliminar"
                  style={{ border: '1.5px solid #dee2e6', color: '#D12026', background: 'transparent' }}>
                  <i className="fas fa-trash"></i>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
