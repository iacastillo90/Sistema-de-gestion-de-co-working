import { Link } from 'react-router-dom';
import { generateInvoicePDF } from '../../../../utils/pdfHelper';

export function EstadoBadge({ estado }) {
  const config = {
    Pendiente: { cls: 'badge-estado badge-cancelada', ico: 'fa-clock' },
    'En Revisión': { cls: 'badge-estado badge-pendiente', ico: 'fa-search' },
    Completado: { cls: 'badge-estado badge-confirmada', ico: 'fa-check-double' },
  };
  const { cls, ico } = config[estado] || config.Pendiente;
  return (
    <span className={cls}>
      <i className={`fas ${ico}`}></i>{estado}
    </span>
  );
}

export function PaymentDetailCard({ payment, invoice, reservation, space, client }) {
  return (
    <div className="premium-card mb-4 border-top border-4 border-primary">
      <div className="card-body p-4 p-lg-5">
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h4 className="fw-bold mb-1">Detalles de la Transacción</h4>
            <div className="text-muted small">ID Sistema: {payment._id}</div>
          </div>
          <EstadoBadge estado={payment.estado} />
        </div>

        <div className="row g-4 mb-4">
          <div className="col-sm-6 col-md-4">
            <small className="text-muted d-block mb-1">Monto a Cobrar</small>
            <h2 className={`fw-bold mb-0 ${payment.estado === 'Completado' ? 'text-success' : 'text-dark'}`}>
              ${payment.monto.toLocaleString()}
            </h2>
          </div>
          <div className="col-sm-6 col-md-4">
            <small className="text-muted d-block mb-1">Método de Pago</small>
            <div className="fw-bold fs-5">{payment.metodo_pago}</div>
          </div>
          <div className="col-sm-12 col-md-4">
            <small className="text-muted d-block mb-1">Boleta / Factura</small>
            {invoice ? (
              <button 
                className="btn btn-sm btn-outline-primary"
                onClick={() => generateInvoicePDF(invoice, space, client, payment)}
              >
                <i className="fas fa-file-pdf me-2"></i>Descargar Boleta
              </button>
            ) : (
              <div className="text-muted fst-italic small">Boleta no generada aún (se genera al completar)</div>
            )}
          </div>
        </div>

        <hr className="my-4" />

        <h5 className="fw-bold mb-3"><i className="fas fa-calendar-check text-primary me-2"></i>Reserva Asociada</h5>
        {reservation ? (
          <div className="p-3 bg-light rounded d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <div className="fw-bold fs-5">{space?.nombre || 'Espacio'}</div>
              <div className="text-muted small">
                <i className="far fa-calendar me-1"></i>{reservation.fecha} | 
                <i className="far fa-clock ms-2 me-1"></i>{reservation.hora_inicio} - {reservation.hora_fin}
              </div>
            </div>
            <Link to={`/admin/reservas/${reservation._id}`} className="btn btn-outline-secondary btn-sm">
              Ver Reserva <i className="fas fa-arrow-right ms-1"></i>
            </Link>
          </div>
        ) : (
          <div className="alert alert-warning mb-0">No se encontró la reserva asociada (puede haber sido eliminada).</div>
        )}
      </div>
    </div>
  );
}
