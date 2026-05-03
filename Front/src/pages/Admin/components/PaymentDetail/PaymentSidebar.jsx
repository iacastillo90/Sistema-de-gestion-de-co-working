export function PaymentSidebar({ client }) {
  return (
    <div className="col-lg-4">
      <div className="premium-card mb-4 border-top border-4 border-info">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-3"><i className="fas fa-user-circle me-2 text-info"></i>Datos del Cliente</h5>
          {client ? (
            <div>
              <div className="mb-2"><small className="text-muted">Nombre:</small> <div className="fw-bold">{client.nombre}</div></div>
              <div className="mb-2"><small className="text-muted">Email:</small> <div>{client.email}</div></div>
              {client.telefono && <div className="mb-2"><small className="text-muted">Teléfono:</small> <div>{client.telefono}</div></div>}
              <div className="mb-3"><small className="text-muted">Rol en Sistema:</small> <div className="text-capitalize">{client.rol}</div></div>
              <div className="text-center mt-4">
                <a href={`mailto:${client.email}`} className="btn btn-sm btn-outline-info w-100">Contactar Cliente</a>
              </div>
            </div>
          ) : (
            <span className="text-muted">Cargando datos del cliente...</span>
          )}
        </div>
      </div>
    </div>
  );
}
