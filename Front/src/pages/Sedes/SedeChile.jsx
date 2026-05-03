/**
 * SedeChile.jsx
 * Public landing page — Santiago, Chile sede.
 * Uses atomic components from ./components/
 */
import './components/Sede.css';
import SedeHero from './components/SedeHero';
import SedeGallery from './components/SedeGallery';
import SedeFeatures from './components/SedeFeatures';
import SedeInfoCard from './components/SedeInfoCard';
import SedeCTA from './components/SedeCTA';

/* ── Data ────────────────────────────────────────────────────────────────── */
const STATS = [
  { value: '1.200', label: 'm² de espacio' },
  { value: '180', label: 'puestos de trabajo' },
  { value: '8', label: 'salas de reunión' },
  { value: '24/7', label: 'acceso disponible' },
];

const GALLERY = [
  { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', alt: 'Área coworking principal Chile' },
  { src: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&q=80', alt: 'Sala de reuniones Chile' },
  { src: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=400&q=80', alt: 'Lounge Chile' },
];

const FEATURES = [
  { icon: 'fa-wifi', title: 'Internet Fibra 1 Gbps', desc: 'Conectividad de alta velocidad redundante con cobertura en toda la sede, respaldada por enlace secundario.' },
  { icon: 'fa-snowflake', title: 'Climatización Inteligente', desc: 'Sistema de aire acondicionado centralizado con control por zonas y sensores de temperatura en cada sala.' },
  { icon: 'fa-lock', title: 'Acceso Seguro 24/7', desc: 'Control de acceso biométrico y tarjeta magnética. Seguridad perimetral y CCTV con grabación en la nube.' },
  { icon: 'fa-coffee', title: 'Cafetería & Lounge', desc: 'Zona de descanso con café de especialidad, snacks saludables y área de relajación con vista al exterior.' },
  { icon: 'fa-car', title: 'Estacionamiento', desc: 'Estacionamiento privado con 40 plazas para miembros y espacios de bicicletas con duchas disponibles.' },
  { icon: 'fa-print', title: 'Zona de Impresión', desc: 'Impresoras multifuncionales a color y en blanco y negro, escáneres y fotocopiadoras disponibles las 24h.' },
];

const INFO_ROWS = [
  { icon: 'fa-map-pin', label: 'Dirección', value: 'Av. El Bosque Norte 0177, Piso 3, Providencia, Santiago' },
  { icon: 'fa-subway', label: 'Transporte', value: 'Metro El Golf (L1) · 3 min a pie' },
  { icon: 'fa-clock', label: 'Horario Recepción', value: 'Lun–Vie: 08:00 – 20:00' },
  { icon: 'fa-phone', label: 'Teléfono', value: '+56 2 2345 6789' },
  { icon: 'fa-envelope', label: 'Email', value: 'santiago@jaffacowork.cl' },
];

// OpenStreetMap embed — Providencia, Santiago de Chile
const MAP_SRC =
  'https://www.openstreetmap.org/export/embed.html?bbox=-70.6200,-33.4190,-70.5900,-33.4030&layer=mapnik&marker=-33.4100,-70.6050';

/* ── Component ───────────────────────────────────────────────────────────── */
function SedeChile() {
  return (
    <>
      {/* Hero — Vista aérea del barrio El Golf / Costanera Center, Santiago */}
      <SedeHero
        bgImage="https://wallpapercat.com/w/full/8/c/5/718404-2560x1440-desktop-hd-santiago-chile-wallpaper-image.jpg"
        badge="Santiago, Chile"
        title="Sede Providencia"
        subtitle="Santiago de Chile"
        description="En el corazón de Providencia, a pasos del metro El Golf. Un espacio diseñado para profesionales que exigen lo mejor: conectividad total, diseño premium y comunidad activa."
        stats={STATS}
      />

      {/* Sobre la sede */}
      <section className="sede-section">
        <div className="container">
          <div className="row g-4 g-lg-5 align-items-start">
            <div className="col-lg-8">
              <p className="sede-section-label">
                <i className="fas fa-building me-2" />Nuestra Sede
              </p>
              <h2 className="sede-section-title">
                El espacio ideal para <span>crecer en Chile</span>
              </h2>
              <p className="text-muted mt-3 mb-4" style={{ lineHeight: 1.8 }}>
                Nuestra sede en Providencia es el punto de encuentro de la comunidad
                emprendedora y corporativa de Santiago. Con más de 1.200 m² distribuidos
                en 3 pisos, ofrecemos desde escritorios flexibles hasta oficinas privadas
                completamente amobladas y personalizables.
              </p>
              <p className="text-muted mb-4" style={{ lineHeight: 1.8 }}>
                El edificio cuenta con certificación LEED y está equipado con la más
                moderna infraestructura tecnológica. Cada espacio está diseñado para
                maximizar la productividad, la creatividad y el bienestar de nuestros miembros.
              </p>

              <SedeGallery images={GALLERY} />
              <SedeFeatures features={FEATURES} />
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <SedeInfoCard
                heading="Información"
                rows={INFO_ROWS}
                mapSrc={MAP_SRC}
                ctaLabel="Reservar un espacio"
              />
            </div>
          </div>
        </div>
      </section>

      <SedeCTA
        title="¿Listo para trabajar en Santiago?"
        subtitle="Únete a más de 500 profesionales que ya confían en JAFFA CoWork Chile."
        primaryLabel="Comenzar ahora"
        secondaryHref="https://wa.me/56912345678"
      />
    </>
  );
}

export default SedeChile;
