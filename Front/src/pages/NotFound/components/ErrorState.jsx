import { Link } from 'react-router-dom';

export function ErrorState() {
  return (
    <div className="not-found-container">
      <div className="not-found-icon-box">
        <i className="fas fa-ghost"></i>
      </div>
      <h1 className="not-found-title">404</h1>
      <h2 className="not-found-subtitle">¡Oops! Espacio no encontrado</h2>
      <p className="not-found-desc">
        Parece que el espacio o la página que estás buscando no existe, fue movido de lugar o tu sesión ha expirado.
      </p>
      <Link to="/" className="btn-primary-red px-5 py-3" style={{ fontSize: '1.1rem', borderRadius: '12px' }}>
        <i className="fas fa-home me-2"></i>Volver al Inicio
      </Link>
    </div>
  );
}
