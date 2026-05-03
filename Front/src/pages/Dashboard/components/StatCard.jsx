import { Link } from 'react-router-dom';

export function StatCard({ label, value, icon, color, bg, link }) {
  const spinner = <span className="spinner-border spinner-border-sm text-secondary"></span>;
  
  const content = (
    <>
      <div className="stat-card-icon" style={{ background: bg }}>
        <i className={`fas ${icon}`} style={{ color: color }}></i>
      </div>
      <div className="stat-card-value">{value !== undefined && value !== null ? value : spinner}</div>
      <p className="stat-card-label">{label}</p>
    </>
  );

  if (link) {
    return <Link to={link} className="stat-card">{content}</Link>;
  }
  return <div className="stat-card">{content}</div>;
}

export function StatCardHorizontal({ label, value, icon, color, bg }) {
  const spinner = <span className="spinner-border spinner-border-sm text-secondary"></span>;

  return (
    <div className="stat-card">
      <div className="d-flex align-items-center gap-3">
        <div className="stat-card-icon mb-0" style={{ background: bg }}>
          <i className={`fas ${icon}`} style={{ color: color }}></i>
        </div>
        <div>
          <div className="stat-card-value" style={{ fontSize: '1.5rem' }}>
            {value !== undefined && value !== null ? value : spinner}
          </div>
          <p className="stat-card-label">{label}</p>
        </div>
      </div>
    </div>
  );
}
