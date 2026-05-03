export function ReviewFilters({ searchText, setSearchText, filterRating, setFilterRating }) {
  return (
    <div className="premium-card mb-4">
      <div className="card-body p-4">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label-premium small">Buscar</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Nombre del cliente, espacio o ID..."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label-premium small">Filtrar por Calificación</label>
            <select 
              className="form-select"
              value={filterRating}
              onChange={e => setFilterRating(e.target.value)}
              style={{ borderRadius: '10px' }}
            >
              <option value="">Todas las estrellas</option>
              <option value="5">5 Estrellas (Excelente)</option>
              <option value="4">4 Estrellas (Bueno)</option>
              <option value="3">3 Estrellas (Regular)</option>
              <option value="2">2 Estrellas (Malo)</option>
              <option value="1">1 Estrella (Pésimo)</option>
            </select>
          </div>
          <div className="col-md-2 d-flex align-items-end">
            <button className="btn btn-outline-secondary w-100" onClick={() => { setSearchText(''); setFilterRating(''); }} style={{ borderRadius: '10px', height: '38px' }}>
              <i className="fas fa-times me-2"></i>Limpiar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
