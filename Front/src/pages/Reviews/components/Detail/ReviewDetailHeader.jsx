export function ReviewDetailHeader({ review, canDelete, handleDelete, navigate }) {
  return (
    <div className="section-header d-flex justify-content-between align-items-start flex-wrap gap-3">
      <div>
        <h2 className="section-title"><i className="fas fa-star section-icon"></i>Detalle de Reseña</h2>
        <p className="section-subtitle">#{review._id.slice(-8).toUpperCase()}</p>
      </div>
      <div className="d-flex gap-2 flex-wrap">
        {canDelete && (
          <button className="btn btn-outline-danger" onClick={handleDelete} style={{ borderRadius: '8px', padding: '0.4rem 1rem' }}>
            <i className="fas fa-trash me-1"></i>Eliminar
          </button>
        )}
        <button className="btn btn-outline-secondary" onClick={() => navigate('/reseñas')} style={{ borderRadius: '8px', padding: '0.4rem 1rem' }}>
          <i className="fas fa-arrow-left me-2"></i>Volver
        </button>
      </div>
    </div>
  );
}
