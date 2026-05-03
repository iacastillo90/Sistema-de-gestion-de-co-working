import { Link } from 'react-router-dom';

export function LoginForm({ 
  email, 
  setEmail, 
  password, 
  setPassword, 
  handleSubmit, 
  error, 
  loading 
}) {
  return (
    <div className="login-box">
      <h2>Iniciar Sesión</h2>
      {error && <div className="alert alert-danger py-2">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="email"><strong>Correo Electrónico</strong></label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Ingresa tu correo electrónico"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password"><strong>Contraseña </strong></label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Ingresa tu contraseña"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className="small text-muted mb-4">
          ¿Olvidaste tu contraseña?{' '}
          <a href="#" className="text-primary text-decoration-none"><strong>Presiona aquí</strong></a>
        </p>

        <button type="submit" disabled={loading}>
          {loading ? <span className="spinner-border spinner-border-sm me-2" role="status"></span> : <i className="fas fa-sign-in-alt me-2"></i>}
          Entrar
        </button>
      </form>
      
      <div className="signup-title">
        <p className="mt-3 mb-0">
          ¿No tienes cuenta? <Link to="/registro" className="text-primary text-decoration-none"><strong>Regístrate</strong></Link>
        </p>
      </div>
    </div>
  );
}
