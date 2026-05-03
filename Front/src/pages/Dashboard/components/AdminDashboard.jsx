import { Link } from 'react-router-dom';
import { EstadoBadge } from './EstadoBadge';
import { StatCard, StatCardHorizontal } from './StatCard';

export function AdminDashboard({ stats, recentReservations, spaces, error }) {
  const statsRow1 = [
    { label: 'Espacios', value: stats?.totalSpaces,       icon: 'fa-building',      color: '#D12026', bg: 'rgba(209,32,38,0.1)',   link: '/admin/espacios' },
    { label: 'Reservas',  value: stats?.totalReservations, icon: 'fa-calendar-check', color: '#0d6efd', bg: 'rgba(13,110,253,0.1)',  link: '/reservas' },
    { label: 'Reservas Activas',   value: stats?.activeReservations,icon: 'fa-check-circle',   color: '#198754', bg: 'rgba(25,135,84,0.1)',   link: '/reservas' },
    { label: 'Usuarios',  value: stats?.totalUsers,        icon: 'fa-users',          color: '#6f42c1', bg: 'rgba(111,66,193,0.1)',  link: '/admin/usuarios' },
  ];
  
  const statsRow2 = [
    { label: 'Pagos completados', value: stats?.completedPayments, icon: 'fa-check-double', color: '#198754', bg: 'rgba(25,135,84,0.1)'  },
    { label: 'Pagos pendientes',  value: stats?.pendingPayments,   icon: 'fa-clock',         color: '#856404', bg: 'rgba(255,193,7,0.12)' },
    { label: 'Reseñas',           value: stats?.totalReviews,      icon: 'fa-star',           color: '#fd7e14', bg: 'rgba(253,126,20,0.1)' },
    { label: 'Disponibles',       value: stats?.spacesDisponibles,  icon: 'fa-door-open',      color: '#20c997', bg: 'rgba(32,201,151,0.1)' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="section-header d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div>
          <h2 className="section-title">
            <i className="fas fa-crown section-icon"></i>
            Panel de Administración
          </h2>
          <p className="section-subtitle">Vista general del sistema JAFFA CoWork</p>
        </div>
        <div className="d-flex gap-2 flex-wrap">
          <Link to="/admin/espacios" className="btn-outline-red">
            <i className="fas fa-building"></i>Espacios
          </Link>
          <Link to="/admin/sedes" className="btn-outline-red">
            <i className="fas fa-map-marker-alt"></i>Sedes
          </Link>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Stats row 1 */}
      <div className="row g-3 mb-4">
        {statsRow1.map((card, i) => (
          <div key={i} className="col-6 col-lg-3">
            <StatCard {...card} />
          </div>
        ))}
      </div>

      {/* Stats row 2 */}
      <div className="row g-3 mb-4">
        {statsRow2.map((card, i) => (
          <div key={i} className="col-6 col-lg-3">
            <StatCardHorizontal {...card} />
          </div>
        ))}
      </div>

      {/* Últimas reservas + Acciones rápidas */}
      <div className="row g-3">
        <div className="col-lg-8">
          <div className="premium-card h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold mb-0">
                  <i className="fas fa-history me-2 section-icon"></i>Últimas Reservas
                </h6>
                <Link to="/reservas" className="btn-outline-red" style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem' }}>Ver todas</Link>
              </div>
              {recentReservations.length === 0 ? (
                <div className="empty-state">
                  <i className="fas fa-calendar-times empty-state-icon"></i>
                  <h5 className="empty-state-title">Sin reservas aún</h5>
                  <p className="empty-state-desc">No hay reservas registradas en el sistema.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table premium-table align-middle">
                    <thead>
                      <tr>
                        <th>Espacio</th>
                        <th>Fecha</th>
                        <th>Horario</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentReservations.slice(0, 5).map(r => {
                        const space = spaces.find(s => s._id === r.space_id);
                        const spaceName = space ? space.nombre : 'Espacio Eliminado';
                        const locationName = space?.location_id?.name || space?.ubicacion || '';
                        return (
                        <tr key={r._id}>
                          <td>
                            <div className="fw-semibold text-truncate" style={{ maxWidth: '200px' }}>{spaceName}</div>
                            {locationName && <div className="text-muted small text-truncate" style={{ maxWidth: '200px' }}>{locationName}</div>}
                          </td>
                          <td>{r.fecha}</td>
                          <td>{r.hora_inicio} – {r.hora_fin}</td>
                          <td><EstadoBadge estado={r.estado} /></td>
                        </tr>
                      )})}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="premium-card h-100">
            <div className="card-body p-4">
              <h6 className="fw-bold mb-3">
                <i className="fas fa-bolt me-2 section-icon"></i>Acciones Rápidas
              </h6>
              <div className="d-grid gap-2">
                {[
                  { to: '/admin/espacios',    icon: 'fa-plus-circle',    label: 'Gestionar Espacios'  },
                  { to: '/admin/sedes', icon: 'fa-map-marker-alt', label: 'Gestionar Sedes'     },
                  { to: '/reservas',    icon: 'fa-list',           label: 'Todas las Reservas'  },
                  { to: '/admin/pagos', icon: 'fa-credit-card',    label: 'Gestionar Pagos'     },
                  { to: '/admin/reseñas', icon: 'fa-star',         label: 'Ver Opiniones'       },
                ].map(({ to, icon, label }) => (
                  <Link key={to} to={to} className="btn-outline-red quick-action-btn">
                    <i className={`fas ${icon}`}></i>{label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
