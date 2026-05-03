import { Link } from 'react-router-dom';

export function ReservationTickets({ tickets }) {
  return (
    <div className="premium-card mb-4">
      <div className="card-body p-4">
        <h5 className="fw-bold mb-3"><i className="fas fa-headset me-2 text-primary"></i>Tickets de Soporte Relacionados</h5>
        {tickets.length === 0 ? (
          <p className="text-muted mb-0">No hay tickets de soporte para esta reserva.</p>
        ) : (
          <div className="list-group">
            {tickets.map(t => (
              <Link key={t._id} to={`/admin/soporte/${t._id}`} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center p-3">
                <div>
                  <div className="fw-bold mb-1">Ticket: #{t._id.slice(-6)}</div>
                  <div className="small text-muted">{t.subject}</div>
                </div>
                <span className={`badge ${t.status === 'Abierto' ? 'bg-danger' : 'bg-success'}`}>{t.status}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
