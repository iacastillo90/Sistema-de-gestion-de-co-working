import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  getReservationById, 
  getSpaceById, 
  getInvoices, 
  getPayments, 
  getUsers,
  getSupportTickets
} from '../../services/api';
import './Admin.css';

import { Toast } from './components/Common/Toast';
import { ReservationInfo } from './components/ReservationDetail/ReservationInfo';
import { ReservationTickets } from './components/ReservationDetail/ReservationTickets';
import { ReservationSidebar } from './components/ReservationDetail/ReservationSidebar';

function AdminReservationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
  const isAdmin = authUser.rol === 'admin';

  if (!isAdmin) {
    return <div className="alert alert-danger">Acceso denegado.</div>;
  }

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [reservation, setReservation] = useState(null);
  const [space, setSpace] = useState(null);
  const [payment, setPayment] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [client, setClient] = useState(null);
  const [tickets, setTickets] = useState([]);

  // Toast notification
  const [toast, setToast] = useState(null); 
  function showToast(msg, type = 'success') {
    setToast({ msg, type });
  }

  async function loadData() {
    try {
      const resData = await getReservationById(id);
      setReservation(resData);
      
      const spaceData = await getSpaceById(resData.space_id);
      setSpace(spaceData);

      const [allPayments, allInvoices, allUsers, allTickets] = await Promise.all([
        getPayments(),
        getInvoices().catch(() => []),
        getUsers().catch(() => []),
        getSupportTickets().catch(() => [])
      ]);
      
      const matchedPayment = allPayments.find(p => p.reservation_id === id);
      setPayment(matchedPayment);
      
      if (matchedPayment) {
        const matchedInvoice = allInvoices.find(i => i.payment_id === matchedPayment._id || i.reservation_id === id);
        setInvoice(matchedInvoice);
      }

      const matchedClient = allUsers.find(u => u._id === resData.user_id);
      setClient(matchedClient);

      const matchedTickets = allTickets.filter(t => t.related_reservation_id === id);
      setTickets(matchedTickets);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); }, [id]);

  if (loading) return (
    <div className="loading-screen">
      <div className="spinner-border loading-spinner" role="status"></div>
    </div>
  );

  if (!reservation || !space) return (
    <div className="alert alert-danger">No se encontró la reserva.</div>
  );

  let cantidadHoras = 0;
  if (reservation.hora_inicio && reservation.hora_fin) {
    const start = new Date(`1970-01-01T${reservation.hora_inicio}`);
    const end = new Date(`1970-01-01T${reservation.hora_fin}`);
    if (end > start) cantidadHoras = (end - start) / (1000 * 60 * 60);
  }

  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <button className="btn btn-outline-secondary me-3" onClick={() => navigate(-1)} style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0 }}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <div>
          <h2 className="section-title mb-0">Gestión de Reserva (Admin)</h2>
          <p className="text-muted mb-0">Vista detallada para administradores.</p>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <Toast toast={toast} setToast={setToast} />

      <div className="row g-4">
        <div className="col-lg-8">
          <ReservationInfo 
            reservation={reservation} 
            space={space} 
            cantidadHoras={cantidadHoras} 
          />
          
          <ReservationTickets tickets={tickets} />
        </div>

        <ReservationSidebar 
          client={client} 
          payment={payment} 
        />
      </div>
    </div>
  );
}

export default AdminReservationDetail;
