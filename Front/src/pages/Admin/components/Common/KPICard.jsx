export function KPICard({ title, value, subtitle, icon, colorClass, borderClass, bgClass }) {
  return (
    <div className={`premium-card h-100 ${bgClass}`} style={{ borderLeft: `4px solid ${borderClass}` }}>
      <div className="card-body p-4">
        <div className={`${colorClass} fw-bold mb-1`}>
          <i className={`fas ${icon} me-2`}></i>{title}
        </div>
        <h2 className="fw-bold mb-0 text-dark">{value}</h2>
        <div className="text-muted small mt-1">{subtitle}</div>
      </div>
    </div>
  );
}
