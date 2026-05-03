/**
 * SedeColombia.jsx
 * Public landing page — Bogotá, Colombia sede.
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
  { value: '950', label: 'm² de espacio' },
  { value: '140', label: 'puestos de trabajo' },
  { value: '6', label: 'salas de reunión' },
  { value: '24/7', label: 'acceso disponible' },
];

const GALLERY = [
  { src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80', alt: 'Área coworking Colombia' },
  { src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=80', alt: 'Sala privada Colombia' },
  { src: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&q=80', alt: 'Lounge Colombia' },
];

const FEATURES = [
  { icon: 'fa-wifi', title: 'Fibra Óptica 1 Gbps', desc: 'Conectividad de alta velocidad con redundancia y soporte técnico en sitio de lunes a sábado.' },
  { icon: 'fa-shield-alt', title: 'Seguridad 24/7', desc: 'Sistema de videovigilancia, control de acceso con huella dactilar y personal de seguridad permanente.' },
  { icon: 'fa-leaf', title: 'Sede Sostenible', desc: 'Edificio con certificación EDGE, paneles solares en la terraza y sistema de reciclaje integrado.' },
  { icon: 'fa-utensils', title: 'Zona de Alimentación', desc: 'Cafetería propia con menú saludable, cocina equipada para miembros y terraza para almuerzo al aire libre.' },
  { icon: 'fa-child', title: 'Sala de Bienestar', desc: 'Espacio de descanso con sofás, zona de meditación y sala de lactancia para madres.' },
  { icon: 'fa-phone-alt', title: 'Cabinas Telefónicas', desc: '10 cabinas insonorizadas para llamadas privadas y videollamadas sin interrupciones.' },
];

const INFO_ROWS = [
  { icon: 'fa-map-pin', label: 'Dirección', value: 'Cra. 11 #93-16, Piso 5, El Chico, Bogotá D.C.' },
  { icon: 'fa-bus', label: 'Transporte', value: 'TransMilenio Calle 92 · 5 min a pie' },
  { icon: 'fa-clock', label: 'Horario Recepción', value: 'Lun–Vie: 07:30 – 20:00' },
  { icon: 'fa-phone', label: 'Teléfono', value: '+57 1 745 8900' },
  { icon: 'fa-envelope', label: 'Email', value: 'bogota@jaffacowork.co' },
];

// OpenStreetMap embed — Zona El Chico / Chapinero Alto, Bogotá
const MAP_SRC =
  'https://www.openstreetmap.org/export/embed.html?bbox=-74.0530,4.6700,-74.0330,4.6820&layer=mapnik&marker=4.6760,-74.0430';

/* ── Component ───────────────────────────────────────────────────────────── */
function SedeColombia() {
  return (
    <>
      {/* Hero — Distrito financiero / Centro empresarial de Bogotá */}
      <SedeHero
        bgImage="https://www.baltana.com/files/wallpapers-34/Bogota-Cityscape-Desktop-Wallpaper-122029.jpg"
        badge="Bogotá, Colombia"
        title="Sede El Chico"
        subtitle="Bogotá, Colombia"
        description="En el dinámico corredor empresarial de El Chico, Bogotá. Un hub estratégico para startups y corporativos que buscan escalar en el mercado latinoamericano."
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
                Conectados en el <span>corazón de Bogotá</span>
              </h2>
              <p className="text-muted mt-3 mb-4" style={{ lineHeight: 1.8 }}>
                Bogotá es el centro financiero y tecnológico de Colombia, y nuestra sede en El Chico
                refleja eso: un espacio moderno y colaborativo que atrae a los mejores talentos del país.
              </p>
              <p className="text-muted mb-4" style={{ lineHeight: 1.8 }}>
                Con más de 300 empresas miembros activas y eventos de networking semanales, JAFFA CoWork Bogotá
                es mucho más que una oficina — es una comunidad que impulsa tu crecimiento profesional.
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
        title="¿Listo para crecer en Colombia?"
        subtitle="Más de 300 empresas ya forman parte de la comunidad JAFFA CoWork Bogotá."
        primaryLabel="Comenzar ahora"
        secondaryHref="https://wa.me/573001234567"
      />
    </>
  );
}

export default SedeColombia;
