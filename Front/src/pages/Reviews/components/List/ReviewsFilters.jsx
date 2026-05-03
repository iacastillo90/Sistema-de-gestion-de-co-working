export function ReviewsFilters({ 
  searchText, setSearchText, 
  filterRating, setFilterRating, 
  sortOrder, setSortOrder 
}) {
  return (
    <div className="premium-card mb-4">
      <div className="card-body p-3 p-md-4">
        <div className="row g-3 align-items-end">
          <div className="col-md-5">
            <label className="form-label-premium small mb-1"><i className="fas fa-search me-1 text-primary"></i>Buscar</label>
            <input type="text" className="form-control" placeholder="Sala, sede, ciudad, país, usuario..." value={searchText} onChange={e => setSearchText(e.target.value)} style={{ borderRadius: '10px', border: '1px solid #e2e8f0', padding: '0.55rem 1rem' }} />
          </div>
          <div className="col-md-3">
            <label className="form-label-premium small mb-1"><i className="fas fa-star me-1 text-primary"></i>Calificación</label>
            <select className="form-select" value={filterRating} onChange={e => setFilterRating(e.target.value)} style={{ borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <option value="">Todas</option>
              {[5,4,3,2,1].map(n => <option key={n} value={n}>{'★'.repeat(n)} ({n} estrella{n !== 1 ? 's' : ''})</option>)}
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-label-premium small mb-1"><i className="fas fa-sort me-1 text-primary"></i>Ordenar</label>
            <select className="form-select" value={sortOrder} onChange={e => setSortOrder(e.target.value)} style={{ borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <option value="desc">Más recientes</option>
              <option value="asc">Más antiguas</option>
            </select>
          </div>
          <div className="col-md-2 d-flex align-items-end">
            {(searchText || filterRating) ? (
              <button className="btn btn-outline-secondary w-100" onClick={() => { setSearchText(''); setFilterRating(''); }} style={{ borderRadius: '10px', padding: '0.55rem 1rem' }}>
                <i className="fas fa-times me-1"></i>Limpiar
              </button>
            ) : (
              <div className="text-muted small text-center w-100 py-2"><i className="fas fa-filter me-1"></i>Sin filtros</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
