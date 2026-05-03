import { Stars } from '../Common/Stars';

export function ReviewsHeader({ 
  filteredCount, 
  totalCount, 
  avgRating, 
  showForm, 
  setShowForm, 
  reviewsLength, 
  dist 
}) {
  return (
    <>
      <div className="section-header d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div>
          <h2 className="section-title">
            <i className="fas fa-star section-icon"></i>Reseñas de la Comunidad
          </h2>
          <p className="section-subtitle">
            {filteredCount} de {totalCount} reseña{totalCount !== 1 ? 's' : ''}
            {avgRating && <span className="ms-2">· Promedio: <strong style={{ color: '#ffc107' }}>{avgRating}</strong> <i className="fas fa-star star-filled" style={{ fontSize: '0.75rem' }}></i></span>}
          </p>
        </div>
        <button className="btn-primary-red" onClick={() => setShowForm(v => !v)}>
          <i className={`fas ${showForm ? 'fa-times' : 'fa-pen-to-square'}`}></i>
          {showForm ? 'Cancelar' : 'Escribir reseña'}
        </button>
      </div>

      {reviewsLength > 0 && (
        <div className="premium-card mb-4">
          <div className="card-body p-4">
            <div className="row align-items-center g-4">
              <div className="col-auto text-center">
                <div style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1, color: '#ffc107' }}>{avgRating}</div>
                <Stars n={Math.round(Number(avgRating))} size="1.1rem" />
                <div className="text-muted small mt-1">{reviewsLength} reseñas</div>
              </div>
              <div className="col">
                {dist.map(({ n, count }) => (
                  <div key={n} className="d-flex align-items-center gap-2 mb-1">
                    <span className="text-muted small" style={{ width: '14px' }}>{n}</span>
                    <i className="fas fa-star star-filled" style={{ fontSize: '0.7rem' }}></i>
                    <div className="flex-grow-1 bg-light rounded" style={{ height: '8px' }}>
                      <div className="rounded" style={{ height: '8px', background: '#ffc107', width: reviewsLength ? `${(count / reviewsLength) * 100}%` : '0%', transition: 'width 0.5s' }}></div>
                    </div>
                    <span className="text-muted small" style={{ width: '20px' }}>{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
