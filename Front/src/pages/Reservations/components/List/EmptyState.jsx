import { Link } from 'react-router-dom';

function EmptyState({ reservationsCount, setSearchText, setFilterDate }) {
  return (
    <div className="premium-card">
      <div className="empty-state">
        <i className="fas fa-calendar-times empty-state-icon"></i>
        {reservationsCount === 0 ? (
          <>
            <h5 className="empty-state-title">No tienes reservas aún</h5>
            <p className="empty-state-desc">Reserva un espacio y gestiona tu agenda aquí.</p>
            <Link to="/reservas/nueva" className="btn-primary-red">
              <i className="fas fa-plus"></i>Crear primera reserva
            </Link>
          </>
        ) : (
          <>
            <h5 className="empty-state-title">Sin resultados</h5>
            <p className="empty-state-desc">No se encontraron reservas con los filtros aplicados.</p>
            <button
              className="btn btn-outline-secondary"
              onClick={() => { setSearchText(''); setFilterDate(''); }}
              style={{ borderRadius: '10px' }}
            >
              <i className="fas fa-times me-1"></i>Limpiar filtros
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default EmptyState;
