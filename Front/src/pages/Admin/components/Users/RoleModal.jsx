export function RoleModal({ modal, setModal, handleRoleChange, submitting }) {
  if (!modal.show || !modal.user) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ borderTop: `6px solid ${modal.newRol === 'admin' ? '#dc3545' : '#0d6efd'}` }}>
          <div className="modal-header border-0 pb-0">
            <button type="button" className="btn-close" onClick={() => setModal({ ...modal, show: false })}></button>
          </div>
          <div className="modal-body p-4 text-center">
            <div className="mb-3">
              {modal.newRol === 'admin'
                ? <i className="fas fa-shield-alt text-danger admin-modal-icon"></i>
                : <i className="fas fa-user text-primary admin-modal-icon"></i>
              }
            </div>
            <h4 className="fw-bold mb-2">
              {modal.newRol === 'admin' ? 'Promover a Administrador' : 'Revocar Acceso Admin'}
            </h4>
            <p className="text-muted mb-4">
              {modal.newRol === 'admin'
                ? <>¿Confirmas que deseas dar acceso de <strong>Administrador</strong> a <strong>{modal.user.nombre}</strong>? Tendrá acceso total al panel de control.</>
                : <>¿Confirmas que deseas quitarle el rol de <strong>Administrador</strong> a <strong>{modal.user.nombre}</strong>? Pasará a ser un cliente estándar.</>
              }
            </p>
            <div className="d-flex justify-content-center gap-3">
              <button className="btn btn-light fw-bold px-4 py-2" onClick={() => setModal({ ...modal, show: false })} disabled={submitting}>
                Cancelar
              </button>
              <button
                className={`btn btn-${modal.newRol === 'admin' ? 'danger' : 'primary'} text-white fw-bold px-4 py-2`}
                onClick={handleRoleChange}
                disabled={!!submitting}
              >
                {submitting ? 'Procesando...' : 'Sí, confirmar'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
