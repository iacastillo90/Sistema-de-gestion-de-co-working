/**
 * SedeFeatures.jsx
 * Atomic component — Feature grid for a Sede page.
 * Props:
 *  - features {Array<{icon, title, desc}>}
 */
function SedeFeatures({ features = [] }) {
  return (
    <div className="row g-4 mt-4">
      {features.map((f, i) => (
        <div key={i} className="col-md-6">
          <div className="sede-feature-card">
            <div className="sede-feature-icon">
              <i className={`fas ${f.icon}`} />
            </div>
            <div className="sede-feature-title">{f.title}</div>
            <p className="sede-feature-desc">{f.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SedeFeatures;
