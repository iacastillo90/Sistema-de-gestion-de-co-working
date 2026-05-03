import { Link } from 'react-router-dom';

export function SpaceHero({ space }) {
  return (
    <div className="premium-card mb-4 overflow-hidden">
      <div className="row g-0">
        <div className="col-md-6">
          {space.imagen ? (
            <img
              src={space.imagen}
              alt={space.nombre}
              className="w-100 h-100"
              style={{ objectFit: 'cover', minHeight: '320px', maxHeight: '460px' }}
            />
          ) : (
            <div className="d-flex align-items-center justify-content-center bg-light" style={{ minHeight: '320px' }}>
              <i className="fas fa-image fa-4x text-muted"></i>
            </div>
          )}
        </div>
        <div className="col-md-6">
          <div className="card-body p-4 p-lg-5">
            <div className="d-flex justify-content-between align-items-start mb-3 flex-wrap gap-2">
              <h2 className="section-title" style={{ fontSize: '1.6rem' }}>{space.nombre}</h2>
              <span className={`badge-estado ${space.disponibilidad ? 'badge-disponible' : 'badge-no-disponible'}`}>
                <i className={`fas ${space.disponibilidad ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                {space.disponibilidad ? 'Disponible' : 'No disponible'}
              </span>
            </div>
            <p className="text-muted mb-4" style={{ lineHeight: '1.7' }}>{space.descripcion}</p>

            <div className="d-flex flex-column gap-3 mb-4">
              {[
                { icon: 'fa-users', label: 'Capacidad', val: `${space.capacidad} personas` },
                { icon: 'fa-dollar-sign', label: 'Precio', val: `$${space.precio?.toLocaleString?.() ?? space.precio} x Hora` },
                { icon: 'fa-map-marker-alt', label: 'Ubicación', val: space.location_id?.name || space.ubicacion },
              ].map(({ icon, label, val }) => (
                <div key={label} className="d-flex align-items-center gap-3">
                  <div className="stat-card-icon mb-0"
                    style={{ background: 'rgba(209,32,38,0.08)', color: 'var(--primary-red)', width: '44px', height: '44px' }}>
                    <i className={`fas ${icon}`}></i>
                  </div>
                  <div>
                    <small className="section-subtitle d-block">{label}</small>
                    <strong>{val}</strong>
                  </div>
                </div>
              ))}
            </div>

            {space.disponibilidad && (
              <Link to={`/reservas/nueva?spaceId=${space._id}`} className="btn-primary-red w-100" style={{ justifyContent: 'center', padding: '0.75rem' }}>
                <i className="fas fa-calendar-plus"></i>Reservar este espacio
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
