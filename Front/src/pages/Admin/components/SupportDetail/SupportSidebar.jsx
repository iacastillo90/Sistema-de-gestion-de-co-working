import { Link } from 'react-router-dom';

function StatusBadge({ status }) {
  const map = {
    Open:        { cls: 'badge-estado badge-cancelada',  ico: 'fa-envelope-open', label: 'Abierto' },
    'In Review': { cls: 'badge-estado badge-pendiente',  ico: 'fa-search',        label: 'En Revisión' },
    Resolved:    { cls: 'badge-estado badge-confirmada', ico: 'fa-check-circle',  label: 'Resuelto' },
  };
  const s = map[status] || map.Open;
  return <span className={s.cls}><i className={`fas ${s.ico}`}></i>{s.label}</span>;
}

export function SupportSidebar({ client, ticket, payment, reservation, space }) {
  return (
    <div className="col-lg-4">
      {/* Info del cliente */}
      <div className="premium-card mb-4 border-top border-4 border-info">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-3"><i className="fas fa-user-circle me-2 text-info"></i>Cliente</h5>
          {client ? (
            <div>
              <div className="mb-2"><small className="text-muted">Nombre:</small><div className="fw-bold">{client.nombre}</div></div>
              <div className="mb-2"><small className="text-muted">Email:</small><div>{client.email}</div></div>
              {client.telefono && <div className="mb-2"><small className="text-muted">Teléfono:</small><div>{client.telefono}</div></div>}
              <div className="mb-3"><small className="text-muted">ID Sistema:</small><div className="small text-muted font-monospace">{client._id}</div></div>
              <a href={`mailto:${client.email}?subject=Re: ${ticket.subject}`} className="btn btn-sm btn-outline-info w-100">
                <i className="fas fa-envelope me-2"></i>Contactar por Email
              </a>
            </div>
          ) : (
            <span className="text-muted small">ID: {ticket.user_id}</span>
          )}
        </div>
      </div>

      {/* Info del ticket */}
      <div className="premium-card mb-4">
        <div className="card-body p-4">
          <h6 className="fw-bold mb-3"><i className="fas fa-info-circle me-2 text-primary"></i>Detalles del Ticket</h6>
          <div className="d-flex flex-column gap-2">
            <div className="d-flex justify-content-between">
              <span className="text-muted small">ID</span>
              <span className="small font-monospace fw-bold">#{ticket._id.slice(-8).toUpperCase()}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-muted small">Estado</span>
              <StatusBadge status={ticket.status} />
            </div>
            <div className="d-flex justify-content-between">
              <span className="text-muted small">Creado</span>
              <span className="small">{new Date(ticket.createdAt).toLocaleDateString('es-CL')}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="text-muted small">Actualizado</span>
              <span className="small">{new Date(ticket.updatedAt).toLocaleDateString('es-CL')}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="text-muted small">Respondido</span>
              <span className={`small fw-bold ${ticket.admin_response ? 'text-success' : 'text-danger'}`}>
                {ticket.admin_response ? 'Sí' : 'No'}
              </span>
            </div>
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
                <span className="fw-bold text-success">${payment.monto?.toLocaleString?.()}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-muted small">Método</span>
                <span className="small">{payment.metodo_pago}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-muted small">Estado</span>
                <span className={`small fw-bold ${payment.estado === 'Completado' ? 'text-success' : 'text-warning'}`}>{payment.estado}</span>
              </div>
            </div>
            <Link to={`/admin/pagos/${payment._id}`} className="btn btn-sm btn-outline-secondary mt-3 w-100">
              Ver Pago <i className="fas fa-arrow-right ms-1"></i>
            </Link>
          </div>
        </div>
      )}

      {/* Reserva relacionada */}
      {reservation && (
        <div className="premium-card mb-4">
          <div className="card-body p-4">
            <h6 className="fw-bold mb-3"><i className="fas fa-calendar-alt me-2 text-primary"></i>Reserva Relacionada</h6>
            {space?.imagen && (
              <img src={space.imagen} alt={space.nombre} className="w-100 rounded-3 mb-3" style={{ height: '90px', objectFit: 'cover' }} />
            )}
            {space && <div className="fw-bold mb-1">{space.nombre}</div>}
            <div className="d-flex flex-column gap-2 mt-2">
              <div className="d-flex justify-content-between">
                <span className="text-muted small">Fecha</span>
                <span className="small fw-bold">{reservation.fecha}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-muted small">Horario</span>
                <span className="small">{reservation.hora_inicio} – {reservation.hora_fin}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-muted small">Estado</span>
                <span className={`small fw-bold ${reservation.estado === 'Confirmada' ? 'text-success' : 'text-warning'}`}>{reservation.estado}</span>
              </div>
            </div>
            <Link to={`/admin/reservas/${reservation._id}`} className="btn btn-sm btn-outline-secondary mt-3 w-100">
              Ver Reserva <i className="fas fa-arrow-right ms-1"></i>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export { StatusBadge };
