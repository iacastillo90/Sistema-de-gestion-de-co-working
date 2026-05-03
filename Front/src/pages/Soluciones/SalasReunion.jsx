import { Link } from 'react-router-dom';
import '../Sedes/components/Sede.css';

const SALAS = [
  {
    img: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=600&q=80',
    nombre: 'Sala Andes',
    capacidad: 8,
    tipo: 'Reuniones ejecutivas',
    precio: 25000,
    amenidades: ['Proyector 4K', 'Videoconferencia HD', 'Pizarrón inteligente', 'Climatización individual', 'Café incluido'],
  },
  {
    img: 'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=600&q=80',
    nombre: 'Sala Patagonia',
    capacidad: 16,
    tipo: 'Talleres & workshops',
    precio: 45000,
    amenidades: ['Pantalla dual 75"', 'Sistema de audio profesional', 'Mesas modulares', 'Acceso a impresoras', 'Catering disponible'],
  },
  {
    img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80',
    nombre: 'Sala Atacama',
    capacidad: 4,
    tipo: 'Reuniones rápidas',
    precio: 12000,
    amenidades: ['TV 55" con HDMI', 'Pizarrón blanco', 'WiFi dedicado', 'Ventilación', 'Luz natural'],
  },
  {
    img: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=600&q=80',
    nombre: 'Auditorio CoWork',
    capacidad: 80,
    tipo: 'Eventos & presentaciones',
    precio: 180000,
    amenidades: ['Escenario con podio', 'Sistema de audio envolvente', 'Proyección en pantalla gigante', 'Cabina de transmisión', 'Streaming en vivo'],
  },
  {
    img: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&q=80',
    nombre: 'Sala Brickell',
    capacidad: 12,
    tipo: 'Board meetings',
    precio: 60000,
    amenidades: ['Mesa de directorio', 'Monitor 85" 4K', 'Videoconferencia Zoom Room', 'Servicio de catering', 'Parking incluido'],
  },
  {
    img: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&q=80',
    nombre: 'Cabina Focus',
    capacidad: 1,
    tipo: 'Llamadas & concentración',
    precio: 5000,
    amenidades: ['Insonorizada', 'Escritorio + silla ergonómica', 'Cargador inalámbrico', 'Luz ajustable', 'WiFi privado'],
  },
];

const BENEFICIOS = [
  { icon: 'fa-calendar-check', title: 'Reserva en segundos', desc: 'Consulta disponibilidad y reserva desde la plataforma en tiempo real, sin llamadas ni esperas.' },
  { icon: 'fa-clock', title: 'Flexibilidad total', desc: 'Reserva por hora, medio día o día completo. Cancela con hasta 2 horas de anticipación sin costo.' },
  { icon: 'fa-headset', title: 'Soporte técnico incluido', desc: 'Nuestro equipo está disponible para configurar el equipo A/V antes de cada reunión.' },
  { icon: 'fa-shield-alt', title: 'Privacidad garantizada', desc: 'Acceso exclusivo durante tu reserva. Sin interrupciones, sin ruido, con confidencialidad total.' },
];

function SalasReunion() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="sede-hero">
        <div
          className="sede-hero-bg"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=1600&q=80')" }}
        />
        <div className="sede-hero-overlay" />
        <div className="container sede-hero-content">
          <div className="row">
            <div className="col-lg-9">
              <div className="sede-hero-badge"><i className="fas fa-users"></i>Soluciones JAFFA CoWork</div>
            <h1>Salas de Reunión<br /><span style={{ color: '#ff6b6b' }}>Profesionales</span></h1>
            <p className="lead" style={{ color: 'rgba(255,255,255,0.82)', maxWidth: '580px' }}>
              Desde cabinas de concentración hasta auditorios para 80 personas.
              Cada sala está equipada con tecnología de punta para que tu reunión
              sea impecable, sin importar el tamaño.
            </p>
            <div className="sede-hero-stats">
              <div className="sede-stat"><div className="sede-stat-value">18</div><div className="sede-stat-label">salas disponibles</div></div>
              <div className="sede-stat"><div className="sede-stat-value">1–80</div><div className="sede-stat-label">capacidad personas</div></div>
              <div className="sede-stat"><div className="sede-stat-value">3</div><div className="sede-stat-label">sedes disponibles</div></div>
              <div className="sede-stat"><div className="sede-stat-value">24/7</div><div className="sede-stat-label">disponibilidad</div></div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Salas Grid ────────────────────────────────────────────────────── */}
      <section className="sede-section">
        <div className="container">
          <div className="text-center mb-5">
            <p className="text-danger fw-bold small text-uppercase mb-2"><i className="fas fa-door-open me-2"></i>Nuestros espacios</p>
            <h2 className="sede-section-title">Encuentra la sala <span>perfecta para ti</span></h2>
            <p className="text-muted" style={{ maxWidth: '500px', margin: '0 auto' }}>
              Todos los espacios incluyen WiFi de alta velocidad, aire acondicionado y están disponibles en las 3 sedes.
            </p>
          </div>

          <div className="row g-4">
            {SALAS.map((sala, i) => (
              <div 
                key={i} 
                className="col-12 col-md-6 col-lg-4"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="sala-card">
                  <div className="sala-card-img-wrapper">
                    <img src={sala.img} alt={sala.nombre} className="sala-card-img" />
                  </div>
                  <div className="sala-card-body">
                    <div className="sala-capacity-badge">
                      <i className="fas fa-users"></i>
                      {sala.capacidad === 1 ? '1 persona' : `Hasta ${sala.capacidad} personas`}
                    </div>
                    <h4 className="fw-bold mb-1">{sala.nombre}</h4>
                    <p className="text-muted small mb-2">{sala.tipo}</p>
                    <p className="fw-bold text-danger mb-0" style={{ fontSize: '1.1rem' }}>
                      ${Number(sala.precio).toLocaleString('es-CL')} <span className="text-muted fw-normal" style={{ fontSize: '0.8rem' }}>/ hora</span>
                    </p>
                    <ul className="sala-amenities">
                      {sala.amenidades.map((a, j) => (
                        <li key={j}><i className="fas fa-check-circle"></i>{a}</li>
                      ))}
                    </ul>
                    <Link
                      to="/registro"
                      className="btn-primary-red w-100 mt-4"
                    >
                      <i className="fas fa-calendar-plus me-2"></i>Reservar sala
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Beneficios ────────────────────────────────────────────────────── */}
      <section className="sede-section sede-section-alt">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="sede-section-title">¿Por qué reservar con <span>JAFFA CoWork?</span></h2>
          </div>
          <div className="row g-4">
            {BENEFICIOS.map((b, i) => (
              <div key={i} className="col-md-6 col-lg-3">
                <div className="sede-feature-card text-center">
                  <div className="sede-feature-icon mx-auto"><i className={`fas ${b.icon}`}></i></div>
                  <div className="sede-feature-title">{b.title}</div>
                  <p className="sede-feature-desc">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="sede-cta">
        <div className="container">
          <h2>¿Necesitas una sala ahora?</h2>
          <p>Regístrate gratis y reserva tu primera sala con un 20% de descuento.</p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/registro" className="btn-sede-cta"><i className="fas fa-rocket"></i>Registrarme gratis</Link>
            <Link to="/membresias" className="btn-sede-cta-outline"><i className="fas fa-th-large"></i>Ver membresías</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default SalasReunion;
