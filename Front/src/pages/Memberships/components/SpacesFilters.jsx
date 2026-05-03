const TIPO_OPTIONS = [
  { value: '',           label: 'Todos',       icon: 'fa-th-large' },
  { value: 'sala',       label: 'Salas',       icon: 'fa-users' },
  { value: 'oficina',    label: 'Oficinas',    icon: 'fa-building' },
  { value: 'escritorio', label: 'Escritorios', icon: 'fa-desktop' },
  { value: 'coworking',  label: 'Coworking',   icon: 'fa-laptop-house' },
];

function SpacesFilters({ activeFilter, setActiveFilter, total, filtered }) {
  return (
    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
      <div>
        <h2 className="memberships-section-title">Nuestros <span className="text-danger">Espacios</span></h2>
        <p className="memberships-results-count">
          Mostrando {filtered} de {total} espacio{total !== 1 ? 's' : ''} disponibles
        </p>
      </div>
      <div className="spaces-filter-tabs">
        {TIPO_OPTIONS.map(({ value, label, icon }) => (
          <button
            key={value}
            className={`filter-tab-btn ${activeFilter === value ? 'active' : ''}`}
            onClick={() => setActiveFilter(value)}
          >
            <i className={`fas ${icon}`}></i>{label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SpacesFilters;
