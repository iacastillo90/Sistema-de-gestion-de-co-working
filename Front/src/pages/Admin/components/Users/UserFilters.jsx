export function UserFilters({ searchText, setSearch, filterRol, setFilter }) {
  return (
    <div className="premium-card mb-4">
      <div className="card-body p-4">
        <div className="row g-3">
          <div className="col-md-7">
            <label className="form-label-premium small">Buscar usuario</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nombre o email..."
              value={searchText}
              onChange={e => setSearch(e.target.value)}
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label-premium small">Rol</label>
            <select
              className="form-select"
              value={filterRol}
              onChange={e => setFilter(e.target.value)}
              style={{ borderRadius: '10px' }}
            >
              <option value="">Todos los roles</option>
              <option value="admin">Administrador</option>
              <option value="user">Cliente</option>
            </select>
          </div>
          <div className="col-md-2 d-flex align-items-end">
            <button
              className="btn btn-outline-secondary w-100"
              onClick={() => { setSearch(''); setFilter(''); }}
              style={{ borderRadius: '10px', height: '38px' }}
            >
              <i className="fas fa-times me-1"></i>Limpiar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
