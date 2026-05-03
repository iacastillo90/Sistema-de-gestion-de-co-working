import { Link } from 'react-router-dom';

function RegisterForm({ 
  nombre, 
  setNombre, 
  email, 
  setEmail, 
  password, 
  setPassword, 
  confirmPassword, 
  setConfirmPassword, 
  handleSubmit, 
  loading, 
  error 
}) {
  return (
    <>
      <h2>Crear Cuenta</h2>
      <p className="register-subtitle">
        Únete a JAFFA CoWork y comienza a trabajar diferente
      </p>

      {error && <div className="alert alert-danger py-2">{error}</div>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="reg-nombre" className="form-label">
          Nombre completo
        </label>
        <input
          type="text"
          id="reg-nombre"
          name="nombre"
          placeholder="Ingresa tu nombre"
          required
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="form-control-premium"
        />

        <label htmlFor="reg-email" className="form-label mt-2">
          Correo Electrónico
        </label>
        <input
          type="email"
          id="reg-email"
          name="email"
          placeholder="ejemplo@email.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control-premium"
        />

        <label htmlFor="reg-password" className="form-label mt-2">
          Contraseña
        </label>
        <input
          type="password"
          id="reg-password"
          name="password"
          placeholder="Mínimo 6 caracteres"
          required
          minLength="6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control-premium"
        />

        <label htmlFor="reg-confirm" className="form-label mt-2">
          Confirmar Contraseña
        </label>
        <input
          type="password"
          id="reg-confirm"
          name="confirmPassword"
          placeholder="Repite tu contraseña"
          required
          minLength="6"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="form-control-premium"
        />

        <button type="submit" disabled={loading} className="btn-primary-red mt-3">
          {loading ? (
            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
          ) : null}
          Registrarse
        </button>
      </form>

      <div className="signup-title">
        <p className="mt-3 mb-0">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-primary-red"><strong>Inicia sesión</strong></Link>
        </p>
      </div>
    </>
  );
}

export default RegisterForm;
