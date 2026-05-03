export function EmptyState({ reviewsLength, setShowForm }) {
  return (
    <div className="premium-card">
      <div className="empty-state">
        <i className="fas fa-comment-slash empty-state-icon"></i>
        {reviewsLength === 0 ? (
          <>
            <h5 className="empty-state-title">Sin reseñas aún</h5>
            <p className="empty-state-desc">Sé el primero en compartir tu experiencia con la comunidad.</p>
            <button className="btn-primary-red" onClick={() => setShowForm(true)}><i className="fas fa-pen-to-square"></i>Escribir primera reseña</button>
          </>
        ) : (
          <>
            <h5 className="empty-state-title">Sin resultados</h5>
            <p className="empty-state-desc">No hay reseñas con los filtros aplicados.</p>
          </>
        )}
      </div>
    </div>
  );
}
