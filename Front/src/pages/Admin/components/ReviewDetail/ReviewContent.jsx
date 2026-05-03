import { Link } from 'react-router-dom';
import { renderStars } from '../Reviews/ReviewTable';

export function ReviewContent({ review, space, location }) {
  return (
    <div className="premium-card mb-4 border-top border-4 border-warning">
      <div className="card-body p-4 p-lg-5">
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h4 className="fw-bold mb-1">Opinión del Cliente</h4>
            <div className="text-muted small">Fecha de publicación: {review.fecha}</div>
          </div>
          <div className="d-flex gap-1">
            {renderStars(Number(review.calificacion))}
          </div>
        </div>

        <div className="p-4 bg-light rounded mb-4" style={{ borderLeft: '4px solid var(--bs-warning)' }}>
          <p className="fs-5 mb-0 font-italic">"{review.comentario}"</p>
        </div>

        <hr className="my-4" />

        <h5 className="fw-bold mb-3"><i className="fas fa-building text-primary me-2"></i>Espacio Evaluado</h5>
        {space ? (
          <div className="p-3 bg-light rounded d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <div className="fw-bold fs-5">{space.nombre}</div>
              <div className="text-muted small">
                <i className="fas fa-map-marker-alt me-1"></i>{location?.name || 'Sede'} | {space.capacidad} personas
              </div>
            </div>
            <Link to={`/admin/espacios/${space._id}`} className="btn btn-outline-secondary btn-sm">
              Ver Espacio <i className="fas fa-arrow-right ms-1"></i>
            </Link>
          </div>
        ) : (
          <div className="alert alert-warning mb-0">No se encontró el espacio asociado.</div>
        )}
      </div>
    </div>
  );
}
