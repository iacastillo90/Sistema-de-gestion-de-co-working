import { useNavigate } from 'react-router-dom';

function RegisterSuccess() {
  const navigate = useNavigate();

  return (
    <div className="register-success">
      <div className="success-icon">
        <i className="fas fa-check-circle"></i>
      </div>
      <h3>¡Registro Exitoso!</h3>
      <p>Tu cuenta ha sido creada correctamente.</p>
      <p className="text-muted small">Ya puedes iniciar sesión con tus credenciales.</p>
      <button
        type="button"
        className="btn-outline-primary-red mt-3"
        onClick={() => navigate('/login')}
      >
        <i className="fas fa-sign-in-alt me-2"></i>
        Ir al Login
      </button>
    </div>
  );
}

export default RegisterSuccess;
