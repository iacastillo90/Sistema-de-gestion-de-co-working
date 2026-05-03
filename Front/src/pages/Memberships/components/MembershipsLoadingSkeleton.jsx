function MembershipsLoadingSkeleton() {
  return (
    <div className="row g-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="col-12 col-sm-6 col-xl-4">
          <div className="skeleton-card">
            <div className="skeleton" style={{ height: '210px', borderRadius: 0 }} />
            <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div className="skeleton" style={{ height: '14px', width: '40%' }} />
              <div className="skeleton" style={{ height: '20px', width: '75%' }} />
              <div className="skeleton" style={{ height: '14px', width: '55%' }} />
              <div className="skeleton" style={{ height: '14px', width: '60%' }} />
              <div className="skeleton" style={{ height: '14px', width: '50%' }} />
              <div className="skeleton" style={{ height: '14px', width: '45%' }} />
            </div>
            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
              <div className="skeleton" style={{ height: '38px', borderRadius: '10px' }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MembershipsLoadingSkeleton;
