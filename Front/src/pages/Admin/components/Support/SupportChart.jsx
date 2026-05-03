export function SupportChart({ openCount, reviewCount, resolvedCount, total, resolvedPct }) {
  const chartData = [
    { label: 'Abiertos', count: openCount, pct: total > 0 ? (openCount / total) * 100 : 0, color: 'bg-danger' },
    { label: 'En Revisión', count: reviewCount, pct: total > 0 ? (reviewCount / total) * 100 : 0, color: 'bg-warning' },
    { label: 'Resueltos', count: resolvedCount, pct: total > 0 ? (resolvedCount / total) * 100 : 0, color: 'bg-success' },
  ];

  return (
    <div className="premium-card h-100">
      <div className="card-body p-4 d-flex flex-column justify-content-center">
        <div className="text-muted fw-bold mb-2 small"><i className="fas fa-chart-bar me-2"></i>Distribución</div>
        {chartData.map(({ label, count, pct, color }) => (
          <div key={label} className="d-flex align-items-center gap-2 mb-1" style={{ fontSize: '0.75rem' }}>
            <div style={{ width: '70px' }} className="text-muted text-truncate">{label}</div>
            <div className="progress flex-grow-1" style={{ height: '8px' }}>
              <div className={`progress-bar ${color}`} style={{ width: `${pct}%` }}></div>
            </div>
            <div style={{ width: '18px', textAlign: 'right' }} className="text-muted">{count}</div>
          </div>
        ))}
        <div className="mt-2 pt-2 border-top text-center">
          <span className="small fw-bold text-success">{resolvedPct}% resuelto</span>
        </div>
      </div>
    </div>
  );
}
