import { Link } from 'react-router-dom';
import { EstadoBadge } from './EstadoBadge';
import { StatCard } from './StatCard';

export function ClientDashboard({ stats, recentReservations, spaces, error, authUser, currentPage, setCurrentPage, itemsPerPage }) {
  const clientStats = [
    { label: 'Mis Reservas', value: stats?.totalReservations, icon: 'fa-calendar-check', color: '#0d6efd', bg: 'rgba(13,110,253,0.1)',  link: '/reservas' },
    { label: 'Activas',       value: stats?.activeReservations,icon: 'fa-check-circle',   color: '#198754', bg: 'rgba(25,135,84,0.1)',   link: '/reservas' },
    { label: 'Mis Pagos',    value: stats?.totalPayments,     icon: 'fa-credit-card',    color: '#6f42c1', bg: 'rgba(111,66,193,0.1)',  link: '/pagos'    },
    { label: 'Mis Reseñas',  value: stats?.totalReviews,      icon: 'fa-star',           color: '#fd7e14', bg: 'rgba(253,126,20,0.1)',  link: '/reseñas'  },
  ];

  return (
    <div>
      {/* Header */}
      <div className="section-header">
        <h2 className="section-title">
          <i className="fas fa-home section-icon"></i>
          ¡Bienvenido de nuevo! <span className="d-none d-md-inline">👋</span>
        </h2>
        <p className="section-subtitle">{authUser.email}</p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Action cards */}
      <div className="row g-3 mb-4">
        <div className="col-sm-6">
          <Link to="/reservas/nueva" className="action-card action-card-red">
            <div className="action-card-icon">
              <i className="fas fa-calendar-plus"></i>
            </div>
            <div>
              <p className="action-card-title">Reservar Espacio</p>
              <p className="action-card-subtitle">Encuentra tu lugar ideal para trabajar</p>
            </div>
            <i className="fas fa-arrow-right action-card-arrow"></i>
          </Link>
        </div>
        <div className="col-sm-6">
          <Link to="/espacios" className="action-card action-card-dark">
            <div className="action-card-icon">
              <i className="fas fa-building"></i>
            </div>
            <div>
              <p className="action-card-title">Explorar Espacios</p>
              <p className="action-card-subtitle">
                {stats ? `${stats.spacesDisponibles} disponibles ahora` : 'Cargando...'}
              </p>
            </div>
            <i className="fas fa-arrow-right action-card-arrow"></i>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="row g-3 mb-4">
        {clientStats.map((card, i) => (
          <div key={i} className="col-6 col-lg-3">
            <StatCard {...card} />
          </div>
        ))}
      </div>

      {/* Reservas recientes + Accesos rápidos */}
      <div className="row g-3">
        <div className="col-lg-8">
          <div className="premium-card h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold mb-0">
                  <i className="fas fa-history me-2 section-icon"></i>Mis Últimas Reservas
                </h6>
                <Link to="/reservas" className="btn-outline-red" style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem' }}>Ver todas</Link>
              </div>
              {recentReservations.length === 0 ? (
                <div className="empty-state">
                  <i className="fas fa-calendar-times empty-state-icon"></i>
                  <h5 className="empty-state-title">Aún no tienes reservas</h5>
                  <p className="empty-state-desc">Reserva un espacio y empieza a trabajar.</p>
                  <Link to="/reservas/nueva" className="btn-primary-red">
                    <i className="fas fa-plus"></i>Crear primera reserva
                  </Link>
                </div>
              ) : (
                <>
                  <div className="d-flex flex-column gap-2">
                    {recentReservations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(r => {
                      const space = spaces.find(s => s._id === r.space_id);
                      const spaceName = space ? space.nombre : 'Espacio Eliminado';
                      const locationName = space?.location_id?.name || space?.ubicacion || 'Sede Desconocida';
                      return (
                      <div key={r._id} className="d-flex align-items-center gap-3 p-3 rounded-3 bg-light">
                        <div className="icon-badge" style={{
                          width: '40px', height: '40px',
                          background: r.estado === 'Confirmada' ? 'rgba(25,135,84,0.1)' : 'rgba(108,117,125,0.1)',
                          color: r.estado === 'Confirmada' ? '#198754' : '#6c757d',
                        }}>
                          <i className={`fas ${r.estado === 'Confirmada' ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                        </div>
                        <div className="flex-grow-1 min-width-0">
                          <div className="fw-semibold text-truncate" style={{ fontSize: '0.875rem' }}>
                            {spaceName} <span className="text-muted fw-normal">| {locationName}</span>
                          </div>
                          <div className="info-row mt-1">
                            <i className="far fa-calendar"></i>{r.fecha}
                            <span style={{ opacity: 0.4 }}>·</span>
                            <i className="far fa-clock"></i>{r.hora_inicio} – {r.hora_fin}
                          </div>
                          {r.notas && (
                            <div className="mt-1 text-muted small text-truncate fst-italic" style={{ maxWidth: '100%' }}>
                              <i className="fas fa-sticky-note me-1"></i>"{r.notas}"
                            </div>
                          )}
                        </div>
                        <EstadoBadge estado={r.estado} />
                      </div>
                    )})}
                  </div>
                  
                  {Math.ceil(recentReservations.length / itemsPerPage) > 1 && (
                    <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top dashboard-pagination">
                      <span className="text-muted small">
                        Página {currentPage} de {Math.ceil(recentReservations.length / itemsPerPage)}
                      </span>
                      <div className="d-flex gap-2">
                        <button 
                          className="btn btn-sm btn-outline-secondary" 
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                        >
                          <i className="fas fa-chevron-left"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-secondary" 
                          onClick={() => setCurrentPage(prev => Math.min(Math.ceil(recentReservations.length / itemsPerPage), prev + 1))}
                          disabled={currentPage === Math.ceil(recentReservations.length / itemsPerPage)}
                        >
                          <i className="fas fa-chevron-right"></i>
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="premium-card h-100">
            <div className="card-body p-4">
              <h6 className="fw-bold mb-3">
                <i className="fas fa-compass me-2 section-icon"></i>Accesos Rápidos
              </h6>
              <div className="d-grid gap-2">
                <Link to="/reservas/nueva" className="btn-primary-red quick-action-btn">
                  <i className="fas fa-calendar-plus"></i>Nueva Reserva
                </Link>
                {[
                  { to: '/espacios', icon: 'fa-building',      label: 'Ver Espacios'  },
                  { to: '/reservas', icon: 'fa-calendar-check',label: 'Mis Reservas'  },
                  { to: '/pagos',    icon: 'fa-credit-card',   label: 'Mis Pagos'     },
                  { to: '/reseñas',  icon: 'fa-star',          label: 'Dejar Reseña'  },
                ].map(({ to, icon, label }) => (
                  <Link key={to} to={to} className="btn-outline-red quick-action-btn">
                    <i className={`fas ${icon}`}></i>{label}
                  </Link>
                ))}
              </div>

              {stats?.pendingPayments > 0 && (
                <div className="alert alert-warning mt-3 mb-0 py-2 px-3" style={{ borderRadius: '10px', fontSize: '0.82rem' }}>
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  Tienes <strong>{stats.pendingPayments}</strong> pago{stats.pendingPayments > 1 ? 's' : ''} pendiente{stats.pendingPayments > 1 ? 's' : ''}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
