function ReservationFilters({ 
  searchText, setSearchText, 
  filterDate, setFilterDate, 
  sortOrder, setSortOrder, 
  hasActiveFilters 
}) {
  return (
    <div className="premium-card mb-4" style={{ overflow: 'visible' }}>
      <div className="card-body p-3 p-md-4">
        <div className="row g-3 align-items-end">
          {/* Búsqueda por texto */}
          <div className="col-md-5">
            <label className="form-label-premium small mb-1">
              <i className="fas fa-search me-1 text-primary"></i>Buscar
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Nombre de sala, nota, estado..."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              style={{ borderRadius: '10px', border: '1px solid #e2e8f0', padding: '0.55rem 1rem' }}
            />
          </div>

          {/* Filtro por fecha */}
          <div className="col-md-3">
            <label className="form-label-premium small mb-1">
              <i className="fas fa-calendar-alt me-1 text-primary"></i>Fecha
            </label>
            <input
              type="date"
              className="form-control"
              value={filterDate}
              onChange={e => setFilterDate(e.target.value)}
              style={{ borderRadius: '10px', border: '1px solid #e2e8f0', padding: '0.55rem 1rem' }}
            />
          </div>

          {/* Ordenar por fecha */}
          <div className="col-md-2">
            <label className="form-label-premium small mb-1">
              <i className="fas fa-sort me-1 text-primary"></i>Ordenar
            </label>
            <select
              className="form-select"
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value)}
              style={{ borderRadius: '10px', border: '1px solid #e2e8f0', padding: '0.55rem 0.75rem', height: '42px' }}
            >
              <option value="desc">Más recientes</option>
              <option value="asc">Más antiguas</option>
            </select>
          </div>

          {/* Limpiar filtros */}
          <div className="col-md-2 d-flex align-items-end">
            {hasActiveFilters ? (
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => { setSearchText(''); setFilterDate(''); }}
                style={{ borderRadius: '10px', padding: '0.55rem 1rem' }}
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

export default ReservationFilters;
