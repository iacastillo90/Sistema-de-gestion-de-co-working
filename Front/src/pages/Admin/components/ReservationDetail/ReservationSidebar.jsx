import { Link } from 'react-router-dom';

export function ReservationSidebar({ client, payment }) {
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
              <div className="mt-3 text-center">
                <a href={`mailto:${client.email}`} className="btn btn-sm btn-outline-info w-100">Contactar</a>
              </div>
            </div>
          ) : (
            <span className="text-muted">Cargando datos del cliente...</span>
          )}
        </div>
      </div>

      <div className="premium-card mb-4 border-top border-4 border-success">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-3"><i className="fas fa-wallet me-2 text-success"></i>Estado de Pago</h5>
          {payment ? (
            <>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Monto:</span>
                <span className="fw-bold fs-5">${payment.monto.toLocaleString()}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Método:</span>
                <span>{payment.metodo_pago}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Estado:</span>
                <span className={`badge ${payment.estado === 'Completado' ? 'bg-success' : 'bg-warning text-dark'}`}>
                  {payment.estado}
                </span>
              </div>
              <div className="d-grid gap-2">
                <Link to={`/admin/pagos/${payment._id}`} className="btn btn-outline-secondary btn-sm">Ver Pago</Link>
              </div>
            </>
          ) : (
            <p className="text-muted">No hay pago registrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}
