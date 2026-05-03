import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getSupportTicketById,
  getPaymentById,
  getReservationById,
  getSpaceById,
  updateTicketStatus,
  respondTicket,
} from '../../services/api';
import './Support.css';

import { SupportDetailHeader } from './components/Detail/SupportDetailHeader';
import { MainColumn } from './components/Detail/MainColumn';
import { SidebarColumn } from './components/Detail/SidebarColumn';

function SupportDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
  const isAdmin = authUser.rol === 'admin';

  const [ticket, setTicket] = useState(null);
  const [payment, setPayment] = useState(null);
  const [reservation, setReservation] = useState(null);
  const [space, setSpace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Admin response
  const [responseText, setResponseText] = useState('');
  const [responseStatus, setResponseStatus] = useState('');
  const [responding, setResponding] = useState(false);

  async function loadData() {
    try {
      const t = await getSupportTicketById(id);
      setTicket(t);
      setResponseText(t.admin_response || '');
      setResponseStatus(t.status);

      // Load related payment if exists
      if (t.related_payment_id) {
        try {
          const p = await getPaymentById(t.related_payment_id);
          setPayment(p);
        } catch (_) { /* no payment found */ }
      }

      // Load related reservation if exists
      if (t.related_reservation_id) {
        try {
          const r = await getReservationById(t.related_reservation_id);
          setReservation(r);
          if (r.space_id) {
            try {
              const s = await getSpaceById(r.space_id);
              setSpace(s);
            } catch (_) { /* no space */ }
          }
        } catch (_) { /* no reservation */ }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); }, [id]);

  async function handleAdminRespond(e) {
    e.preventDefault();
    try {
      setResponding(true);
      await respondTicket(id, { admin_response: responseText, status: responseStatus });
      await loadData();
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setResponding(false);
    }
  }

  if (loading) return (
    <div className="loading-screen">
      <div className="spinner-border loading-spinner" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!ticket) return <div className="alert alert-warning">Ticket no encontrado</div>;

  const createdDate = new Date(ticket.createdAt).toLocaleDateString('es-CL', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <div>
      <SupportDetailHeader 
        ticket={ticket} 
        navigate={navigate} 
      />

      <div className="row g-4">
        <MainColumn 
          ticket={ticket} 
          createdDate={createdDate} 
          authUser={authUser} 
          isAdmin={isAdmin} 
          handleAdminRespond={handleAdminRespond} 
          responseText={responseText} 
          setResponseText={setResponseText} 
          responseStatus={responseStatus} 
          setResponseStatus={setResponseStatus} 
          responding={responding} 
        />

        <SidebarColumn 
          ticket={ticket} 
          payment={payment} 
          reservation={reservation} 
          space={space} 
        />
      </div>
    </div>
  );
}

export default SupportDetail;
