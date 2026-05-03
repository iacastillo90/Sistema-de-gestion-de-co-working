export function SpacesHeader({ filteredSpacesLength, totalAvailable, isAdmin, openCreate }) {
  return (
    <div className="section-header d-flex justify-content-between align-items-center flex-wrap gap-3">
      <div>
        <h2 className="section-title">
          <i className="fas fa-building section-icon"></i>Nuestros Espacios
        </h2>
        <p className="section-subtitle">
          {totalAvailable} de {filteredSpacesLength} disponibles
        </p>
      </div>
      {isAdmin && (
        <button className="btn-primary-red" onClick={openCreate}>
          <i className="fas fa-plus"></i>Nuevo Espacio
        </button>
      )}
    </div>
  );
}
