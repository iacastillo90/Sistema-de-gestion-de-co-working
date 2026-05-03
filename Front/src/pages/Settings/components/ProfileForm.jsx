export function ProfileForm({ 
  form, 
  setForm, 
  handleSubmit, 
  loading, 
  error, 
  success, 
  initial, 
  authUser 
}) {
  return (
    <div className="col-lg-6">
      <div className="premium-card">
        <div className="card-body p-4 p-md-5">
          
          <div className="d-flex align-items-center gap-4 mb-4 pb-4 border-bottom">
            <div className="profile-initial-bg">
              {initial}
            </div>
            <div>
              <h4 className="fw-bold mb-1">{form.nombre || 'Tu Perfil'}</h4>
              <div className="text-muted">{authUser.rol === 'admin' ? 'Administrador' : 'Usuario Estandar'}</div>
            </div>
          </div>

          {error && <div className="alert alert-danger mb-4">{error}</div>}
          {success && <div className="alert alert-success mb-4">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label-premium">Nombre Completo</label>
              <input 
                type="text" 
                className="form-control-premium w-100" 
                value={form.nombre}
                onChange={e => setForm({...form, nombre: e.target.value})}
                required
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label-premium">Correo Electrónico</label>
              <input 
                type="email" 
                className="form-control-premium w-100" 
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label-premium">Nueva Contraseña <span className="text-muted fw-normal" style={{fontSize: '0.8rem'}}>(Opcional)</span></label>
              <input 
                type="password" 
                className="form-control-premium w-100" 
                placeholder="Déjalo en blanco para mantener la actual"
                value={form.password}
                onChange={e => setForm({...form, password: e.target.value})}
              />
            </div>

            <button type="submit" className="btn-primary-red w-100" disabled={loading} style={{ padding: '0.75rem' }}>
              {loading ? (
                <><span className="spinner-border spinner-border-sm me-2"></span>Guardando...</>
              ) : (
                <><i className="fas fa-save me-2"></i>Guardar Cambios</>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
