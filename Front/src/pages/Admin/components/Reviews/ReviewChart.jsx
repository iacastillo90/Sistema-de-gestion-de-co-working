export function ReviewChart({ totalReviews, ratingCounts }) {
  return (
    <div className="premium-card h-100">
      <div className="card-body p-3">
        <div className="text-muted fw-bold mb-2 small"><i className="fas fa-chart-bar me-2"></i>Distribución</div>
        
        <div className="d-flex flex-column gap-1">
          {[5, 4, 3, 2, 1].map(stars => {
            const count = ratingCounts[stars];
            const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            return (
              <div key={stars} className="d-flex align-items-center gap-2" style={{ fontSize: '0.75rem' }}>
                <div style={{ width: '25px', textAlign: 'right' }}>{stars} <i className="fas fa-star text-warning"></i></div>
                <div className="progress flex-grow-1" style={{ height: '8px' }}>
                  <div className={`progress-bar ${stars >= 4 ? 'bg-success' : stars === 3 ? 'bg-warning' : 'bg-danger'}`} style={{ width: `${pct}%` }}></div>
                </div>
                <div style={{ width: '25px' }} className="text-muted">{count}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
