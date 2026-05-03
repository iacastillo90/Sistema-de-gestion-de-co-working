export function SpaceFilters({ searchText, setSearchText, filterLoc, setFilterLoc, locations }) {
  return (
    <div className="premium-card mb-4">
      <div className="card-body p-4">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label-premium small">Buscar</label>
            <input type="text" className="form-control" placeholder="Nombre del espacio o sede..."
              value={searchText} onChange={e => setSearchText(e.target.value)}
              style={{ borderRadius: '10px' }} />
          </div>
          <div className="col-md-4">
            <label className="form-label-premium small">Filtrar por Sede</label>
            <select className="form-select" value={filterLoc} onChange={e => setFilterLoc(e.target.value)} style={{ borderRadius: '10px' }}>
              <option value="">Todas las sedes</option>
              {locations.map(l => <option key={l._id} value={l._id}>{l.name}</option>)}
            </select>
          </div>
          <div className="col-md-2 d-flex align-items-end">
            <button className="btn btn-outline-secondary w-100" onClick={() => { setSearchText(''); setFilterLoc(''); }}
              style={{ borderRadius: '10px', height: '38px' }}>
              <i className="fas fa-times me-1"></i>Limpiar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
