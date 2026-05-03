/**
 * SedeEEUU.jsx
 * Public landing page — Miami, Florida (USA) sede.
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
  { value: '2.100', label: 'sq ft of space' },
  { value: '250', label: 'workstations' },
  { value: '12', label: 'meeting rooms' },
  { value: '24/7', label: 'access available' },
];

const GALLERY = [
  { src: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80', alt: 'JAFFA CoWork Miami main area' },
  { src: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80', alt: 'Private office Miami' },
  { src: 'https://pub-62662c345a7146c8a362bcab121eb716.r2.dev/images/cbf79e585ef09105/original.webp', alt: 'Rooftop lounge Miami' },
];

const FEATURES = [
  { icon: 'fa-wifi', title: 'Gigabit Internet', desc: 'Enterprise-grade fiber with 99.9% uptime SLA, on-site IT support and dedicated VLAN for each private office.' },
  { icon: 'fa-shield-alt', title: 'Biometric Access 24/7', desc: 'Fingerprint + card access, HD CCTV coverage, and secure package handling for all members.' },
  { icon: 'fa-building', title: 'Class A Building', desc: 'LEED Gold-certified building with panoramic city views, EV charging stations and valet parking.' },
  { icon: 'fa-coffee', title: 'Barista Bar & Kitchen', desc: 'Complimentary specialty coffee, a fully-stocked kitchen and a rooftop lounge perfect for informal meetings.' },
  { icon: 'fa-headphones', title: 'Podcast & Recording Studio', desc: 'Professional acoustic room for podcasts, webinars and content creation — bookable by the hour.' },
  { icon: 'fa-heartbeat', title: 'Wellness Center', desc: 'On-site yoga every Tue & Thu, plus a quiet room for meditation and mental recharge.' },
];

const INFO_ROWS = [
  { icon: 'fa-map-pin', label: 'Address', value: '1221 Brickell Ave, Suite 900, Miami, FL 33131' },
  { icon: 'fa-subway', label: 'Transport', value: 'Metromover Brickell · 2 min walk' },
  { icon: 'fa-clock', label: 'Reception Hours', value: 'Mon–Fri: 08:00 – 19:00 ET' },
  { icon: 'fa-phone', label: 'Phone', value: '+1 (305) 555 0192' },
  { icon: 'fa-envelope', label: 'Email', value: 'miami@jaffacowork.us' },
];

// OpenStreetMap embed — Brickell financial district, Miami, FL
const MAP_SRC =
  'https://www.openstreetmap.org/export/embed.html?bbox=-80.1970,25.7580,-80.1840,25.7680&layer=mapnik&marker=25.7630,-80.1910';

/* ── Component ───────────────────────────────────────────────────────────── */
function SedeEEUU() {
  return (
    <>
      {/* Hero — Brickell Avenue / Miami financial skyline */}
      <SedeHero
        bgImage="https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?w=1600&q=80"
        badge="Miami, United States"
        title="Brickell Avenue"
        subtitle="Miami, Florida"
        description="In the heart of Miami's financial district. Our flagship US location bridges Latin American businesses with North American markets — the perfect launchpad to go global."
        stats={STATS}
      />

      {/* Sobre la sede */}
      <section className="sede-section">
        <div className="container">
          <div className="row g-4 g-lg-5 align-items-start">
            <div className="col-lg-8">
              <p className="sede-section-label">
                <i className="fas fa-building me-2" />Our Location
              </p>
              <h2 className="sede-section-title">
                Your gateway to <span>the US market</span>
              </h2>
              <p className="text-muted mt-3 mb-4" style={{ lineHeight: 1.8 }}>
                JAFFA CoWork Miami is strategically positioned in Brickell, the most dynamic financial
                district in South Florida. With direct access to major banks, law firms and tech companies,
                it's the ideal base for expanding your business into the United States.
              </p>
              <p className="text-muted mb-4" style={{ lineHeight: 1.8 }}>
                Our bilingual team speaks English and Spanish, making the transition seamless for
                Latin American companies entering the US market. We also offer virtual office services,
                business address registration and mail handling.
              </p>

              <SedeGallery images={GALLERY} />
              <SedeFeatures features={FEATURES} />
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <SedeInfoCard
                heading="Information"
                rows={INFO_ROWS}
                mapSrc={MAP_SRC}
                ctaLabel="Book a space"
              />
            </div>
          </div>
        </div>
      </section>

      <SedeCTA
        title="Ready to go global from Miami?"
        subtitle="Join 600+ professionals and companies already growing with JAFFA CoWork USA."
        primaryLabel="Get started"
        secondaryHref="https://wa.me/13055550192"
        secondaryLabel="Talk to an advisor"
      />
    </>
  );
}

export default SedeEEUU;
