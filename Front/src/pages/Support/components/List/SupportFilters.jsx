export function SupportFilters({ searchText, setSearchText, filterStatus, setFilterStatus }) {
  return (
    <div className="premium-card mb-4" style={{ overflow: 'visible' }}>
      <div className="card-body p-3 p-md-4">
        <div className="row g-3 align-items-end">
          <div className="col-md-6">
            <label className="form-label-premium small mb-1">
              <i className="fas fa-search me-1 text-primary"></i>Buscar
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por asunto o descripción..."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              style={{ borderRadius: '10px', border: '1px solid #e2e8f0', padding: '0.55rem 1rem' }}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label-premium small mb-1">
              <i className="fas fa-filter me-1 text-primary"></i>Estado
            </label>
            <select
              className="form-select"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              style={{ borderRadius: '10px', border: '1px solid #e2e8f0', padding: '0.55rem 1rem' }}
            >
              <option value="">Todos</option>
              <option value="Open">Abierto</option>
              <option value="In Review">En Revisión</option>
              <option value="Resolved">Resuelto</option>
            </select>
          </div>
          <div className="col-md-3 d-flex align-items-end">
            {(searchText || filterStatus) ? (
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => { setSearchText(''); setFilterStatus(''); }}
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
