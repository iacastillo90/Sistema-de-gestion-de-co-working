import { Link } from 'react-router-dom';

/**
 * SedeCTA.jsx
 * Atomic component — Full-width CTA banner at the bottom of every Sede page.
 * Props:
 *  - title       {string}
 *  - subtitle    {string}
 *  - primaryLabel  {string}
 *  - primaryTo     {string}  React Router path
 *  - secondaryLabel {string}
 *  - secondaryHref  {string}  External URL (WhatsApp, etc.)
 */
function SedeCTA({
  title,
  subtitle,
  primaryLabel = 'Comenzar ahora',
  primaryTo = '/registro',
  secondaryLabel = 'Hablar con un asesor',
  secondaryHref = 'https://wa.me/56912345678',
}) {
  return (
    <section className="sede-cta">
      <div className="container">
        <h2>{title}</h2>
        <p>{subtitle}</p>
        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <Link to={primaryTo} className="btn-sede-cta">
            <i className="fas fa-rocket" />
            {primaryLabel}
          </Link>
          <a
            href={secondaryHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sede-cta-outline"
          >
            <i className="fab fa-whatsapp" />
            {secondaryLabel}
          </a>
        </div>
      </div>
    </section>
  );
}

export default SedeCTA;
