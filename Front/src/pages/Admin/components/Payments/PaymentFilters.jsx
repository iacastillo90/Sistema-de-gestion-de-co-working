export function PaymentFilters({ searchText, setSearchText, filterEstado, setFilterEstado }) {
  return (
    <div className="premium-card mb-4">
      <div className="card-body p-4">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label-premium small">Buscar</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Nombre del cliente o ID del pago..."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label-premium small">Estado</label>
            <select 
              className="form-select"
              value={filterEstado}
              onChange={e => setFilterEstado(e.target.value)}
              style={{ borderRadius: '10px' }}
            >
              <option value="">Todos los estados</option>
              <option value="Completado">Completado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="En Revisión">En Revisión</option>
            </select>
          </div>
          <div className="col-md-2 d-flex align-items-end">
            <button className="btn btn-outline-secondary w-100" onClick={() => { setSearchText(''); setFilterEstado(''); }} style={{ borderRadius: '10px', height: '38px' }}>
              <i className="fas fa-times me-2"></i>Limpiar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
