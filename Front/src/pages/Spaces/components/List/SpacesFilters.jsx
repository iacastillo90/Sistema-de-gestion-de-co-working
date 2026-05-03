export function SpacesFilters({ searchText, setSearchText, sortOrder, setSortOrder }) {
  return (
    <div className="premium-card mb-4" style={{ overflow: 'visible' }}>
      <div className="card-body p-3 p-md-4">
        <div className="row g-3 align-items-end">
          <div className="col-md-7">
            <label className="form-label-premium small mb-1">
              <i className="fas fa-search me-1 text-primary"></i>Buscar
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Nombre de espacio, sede, ciudad, país..."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              style={{ borderRadius: '10px', border: '1px solid #e2e8f0', padding: '0.55rem 1rem' }}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label-premium small mb-1">
              <i className="fas fa-sort me-1 text-primary"></i>Ordenar por Nombre
            </label>
            <select
              className="form-select"
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value)}
              style={{ borderRadius: '10px', border: '1px solid #e2e8f0', padding: '0.55rem 0.75rem', height: '42px' }}
            >
              <option value="asc">A - Z</option>
              <option value="desc">Z - A</option>
            </select>
          </div>
          <div className="col-md-2 d-flex align-items-end">
            {searchText ? (
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => setSearchText('')}
                style={{ borderRadius: '10px', padding: '0.55rem 1rem', height: '42px' }}
              >
                <i className="fas fa-times me-1"></i>Limpiar
              </button>
            ) : (
              <div className="text-muted small text-center w-100 py-2">
                <i className="fas fa-filter me-1"></i>Sin filtros
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
