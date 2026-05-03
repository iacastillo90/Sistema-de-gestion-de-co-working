export function SecurityInfo() {
  return (
    <div className="col-lg-6 mt-4 mt-lg-0">
      <div className="premium-card h-100">
        <div className="card-body p-4 p-md-5 d-flex flex-column align-items-center justify-content-center text-center">
          <div className="security-icon-badge">
            <i className="fas fa-shield-alt"></i>
          </div>
          <h5 className="fw-bold mb-3">Privacidad y Seguridad</h5>
          <p className="text-muted mb-4" style={{ maxWidth: '300px' }}>
            Tu información está encriptada y almacenada de forma segura. Solo tú puedes modificar estos datos.
          </p>
          
          <div className="settings-info-box mt-auto">
            <div className="fw-bold mb-1" style={{ fontSize: '0.9rem' }}><i className="fas fa-info-circle me-1"></i>Sobre el Modo Oscuro</div>
            <div className="text-muted" style={{ fontSize: '0.8rem' }}>
              Puedes activar el modo oscuro desde el interruptor en la parte inferior del menú lateral en cualquier momento.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
