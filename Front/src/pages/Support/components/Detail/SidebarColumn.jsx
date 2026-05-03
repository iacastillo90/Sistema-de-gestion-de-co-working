import { Link } from 'react-router-dom';
import { StatusBadge } from '../Common/StatusBadge';

export function SidebarColumn({ ticket, payment, reservation, space }) {
  return (
    <div className="col-lg-4">
      {/* Info del ticket */}
      <div className="premium-card mb-4">
        <div className="card-body p-4">
          <h6 className="fw-bold mb-3"><i className="fas fa-info-circle me-2 text-primary"></i>Información del Ticket</h6>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex justify-content-between">
              <span className="text-muted small">ID</span>
              <span className="fw-bold small font-monospace">#{ticket._id.slice(-8).toUpperCase()}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="text-muted small">Estado</span>
              <StatusBadge status={ticket.status} />
            </div>
            <div className="d-flex justify-content-between">
              <span className="text-muted small">Creado</span>
              <span className="small">{new Date(ticket.createdAt).toLocaleDateString('es-CL')}</span>
            </div>
            {ticket.updatedAt !== ticket.createdAt && (
              <div className="d-flex justify-content-between">
                <span className="text-muted small">Actualizado</span>
                <span className="small">{new Date(ticket.updatedAt).toLocaleDateString('es-CL')}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pago relacionado */}
      {payment && (
        <div className="premium-card mb-4">
          <div className="card-body p-4">
            <h6 className="fw-bold mb-3"><i className="fas fa-credit-card me-2 text-success"></i>Pago Relacionado</h6>
            <div className="d-flex flex-column gap-2">
              <div className="d-flex justify-content-between">
                <span className="text-muted small">Monto</span>
                <span className="fw-bold text-success">${payment.monto?.toLocaleString?.() || payment.monto}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-muted small">Método</span>
                <span className="small">{payment.metodo_pago}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-muted small">Estado</span>
                <span className={`small fw-bold ${payment.estado === 'Completado' ? 'text-success' : 'text-warning'}`}>{payment.estado}</span>
              </div>
              <Link to={`/pagos/${payment._id}`} className="btn btn-sm btn-outline-secondary mt-2 w-100" style={{ borderRadius: '8px' }}>
                Ver Pago
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Reserva relacionada */}
      {reservation && (
        <div className="premium-card mb-4">
          <div className="card-body p-4">
            <h6 className="fw-bold mb-3"><i className="fas fa-calendar-check me-2 text-primary"></i>Reserva Relacionada</h6>
            <div className="d-flex flex-column gap-2">
              {space && (
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="text-muted small">Espacio</span>
                  <span className="fw-bold small text-truncate" style={{ maxWidth: '140px' }} title={space.nombre}>
                    {space.nombre}
                  </span>
                </div>
              )}
              <div className="d-flex justify-content-between">
                <span className="text-muted small">Fecha</span>
                <span className="small">{new Date(reservation.fecha).toLocaleDateString('es-CL')}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-muted small">Horario</span>
                <span className="small">{reservation.hora_inicio} - {reservation.hora_fin}</span>
              </div>
              <Link to={`/reservas/${reservation._id}`} className="btn btn-sm btn-outline-secondary mt-2 w-100" style={{ borderRadius: '8px' }}>
                Ver Reserva
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
