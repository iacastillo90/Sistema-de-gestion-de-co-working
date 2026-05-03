function HeroMemberships({ totalSpaces, totalLocations }) {
  return (
    <section className="hero-memberships d-flex align-items-center text-white">
      <div className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-7">
            <div className="hero-badge">
              <i className="fas fa-building"></i>
              JAFFA CoWork — Espacios Profesionales
            </div>
            <h1 className="display-4 fw-bold mb-4" style={{ lineHeight: 1.15 }}>
              Espacios que se{' '}
              <span className="text-danger">adaptan</span> a tu ritmo
            </h1>
            <p className="lead mb-5" style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '520px' }}>
              Desde escritorios flex hasta oficinas privadas. Encuentra el espacio
              ideal para freelancers, startups y equipos que necesitan crecer.
            </p>
            <div className="d-flex gap-3 flex-wrap">
              <a href="#espacios" className="btn btn-danger btn-lg px-4 fw-bold">
                <i className="fas fa-search me-2"></i>Ver Espacios
              </a>
              <a href="/reservas/nueva" className="btn btn-outline-light btn-lg px-4 fw-bold">
                <i className="fas fa-calendar-plus me-2"></i>Reservar Ahora
              </a>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="row g-3">
              <div className="col-6">
                <div className="hero-stat">
                  <div className="hero-stat-value text-danger">{totalSpaces ?? '—'}</div>
                  <div className="hero-stat-label">Espacios Disponibles</div>
                </div>
              </div>
              <div className="col-6">
                <div className="hero-stat">
                  <div className="hero-stat-value text-danger">{totalLocations ?? '—'}</div>
                  <div className="hero-stat-label">Sedes</div>
                </div>
              </div>
              <div className="col-6">
                <div className="hero-stat">
                  <div className="hero-stat-value text-danger">4</div>
                  <div className="hero-stat-label">Tipos de Espacio</div>
                </div>
              </div>
              <div className="col-6">
                <div className="hero-stat">
                  <div className="hero-stat-value text-danger">24/7</div>
                  <div className="hero-stat-label">Disponibilidad</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroMemberships;
