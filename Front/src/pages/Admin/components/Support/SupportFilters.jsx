export function SupportFilters({ searchText, setSearchText, filterStatus, setFilterStatus }) {
  return (
    <div className="premium-card mb-4">
      <div className="card-body p-4">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label-premium small">Buscar por asunto o cliente</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nombre del cliente, asunto del ticket..."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label-premium small">Estado</label>
            <select
              className="form-select"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              style={{ borderRadius: '10px' }}
            >
              <option value="">Todos los estados</option>
              <option value="Open">Abierto</option>
              <option value="In Review">En Revisión</option>
              <option value="Resolved">Resuelto</option>
            </select>
          </div>
          <div className="col-md-2 d-flex align-items-end">
            <button
              className="btn btn-outline-secondary w-100"
              onClick={() => { setSearchText(''); setFilterStatus(''); }}
              style={{ borderRadius: '10px', height: '38px' }}
            >
              <i className="fas fa-times me-2"></i>Limpiar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
