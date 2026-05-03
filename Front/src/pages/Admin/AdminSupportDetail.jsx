import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getSupportTicketById,
  getPaymentById,
  getReservationById,
  getSpaceById,
  getUsers,
  respondTicket,
  updateTicketStatus,
} from '../../services/api';
import './Admin.css';

import { Toast } from './components/Common/Toast';
import { SupportSidebar, StatusBadge } from './components/SupportDetail/SupportSidebar';
import { SupportReplyForm } from './components/SupportDetail/SupportReplyForm';
import { SupportQuickActions } from './components/SupportDetail/SupportQuickActions';

function AdminSupportDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
  const isAdmin  = authUser.rol === 'admin';

  if (!isAdmin) return <div className="alert alert-danger">Acceso denegado.</div>;

  const [ticket,      setTicket]      = useState(null);
  const [payment,     setPayment]     = useState(null);
  const [reservation, setReservation] = useState(null);
  const [space,       setSpace]       = useState(null);
  const [client,      setClient]      = useState(null);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState('');
  const [submitting,  setSubmitting]  = useState(false);

  // Response form
  const [responseText,   setResponseText]   = useState('');
  const [responseStatus, setResponseStatus] = useState('Open');
  const [editingResp,    setEditingResp]    = useState(false);

  // Toast
  const [toast, setToast] = useState(null);
  function showToast(msg, type = 'success') {
    setToast({ msg, type });
  }

  async function loadData() {
    try {
      setLoading(true);
      const t = await getSupportTicketById(id);
      setTicket(t);
      setResponseText(t.admin_response || '');
      setResponseStatus(t.status);

      // Related payment
      if (t.related_payment_id) {
        try { setPayment(await getPaymentById(t.related_payment_id)); } catch (_) {}
      }
      // Related reservation + space
      if (t.related_reservation_id) {
        try {
          const r = await getReservationById(t.related_reservation_id);
          setReservation(r);
          if (r.space_id) {
            try { setSpace(await getSpaceById(r.space_id)); } catch (_) {}
          }
        } catch (_) {}
      }
      // Client info
      try {
        const users = await getUsers();
        const usr = users.find(u => u._id === t.user_id);
        setClient(usr || null);
      } catch (_) {}
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); }, [id]);

  async function handleSendResponse(e) {
    e.preventDefault();
    try {
      setSubmitting(true);
      await respondTicket(id, { admin_response: responseText, status: responseStatus });
      showToast('Respuesta enviada exitosamente.');
      setEditingResp(false);
      await loadData();
    } catch (err) {
      showToast('Error al enviar: ' + err.message, 'danger');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleStatusChange(newStatus) {
    try {
      setSubmitting(true);
      await updateTicketStatus(id, newStatus);
      showToast(`Estado cambiado a "${newStatus}".`);
      await loadData();
    } catch (err) {
      showToast('Error: ' + err.message, 'danger');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return (
    <div className="loading-screen">
      <div className="spinner-border loading-spinner" role="status"></div>
    </div>
  );
  if (error)   return <div className="alert alert-danger">{error}</div>;
  if (!ticket) return <div className="alert alert-warning">Ticket no encontrado.</div>;

  const createdDate = new Date(ticket.createdAt).toLocaleDateString('es-CL', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });

  return (
    <div>
      <div className="d-flex align-items-center mb-4 gap-3 flex-wrap">
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate('/admin/soporte')}
          style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0, flexShrink: 0 }}
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <div className="flex-grow-1">
          <h2 className="section-title mb-0">Ticket #{ticket._id.slice(-8).toUpperCase()}</h2>
          <p className="text-muted mb-0">Gestión y respuesta de solicitud de soporte.</p>
        </div>
        <StatusBadge status={ticket.status} />
      </div>

      <Toast toast={toast} setToast={setToast} />

      <div className="row g-4">
        <div className="col-lg-8">

          {/* Mensaje del cliente */}
          <div className="premium-card mb-4 border-top border-4" style={{ borderColor: '#6c757d !important' }}>
            <div className="card-body p-4 p-lg-5">
              <div className="d-flex justify-content-between align-items-start mb-4 gap-3 flex-wrap">
                <div>
                  <h4 className="fw-bold mb-1">{ticket.subject}</h4>
                  <small className="text-muted"><i className="fas fa-clock me-1"></i>{createdDate}</small>
                </div>
              </div>

              <div className="p-4 rounded-3 mb-0" style={{ background: 'rgba(108,117,125,0.07)', borderLeft: '4px solid #6c757d' }}>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <div className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '34px', height: '34px', fontSize: '0.85rem', flexShrink: 0 }}>
                    {(client?.nombre || client?.email || 'U').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="fw-bold small">{client?.nombre || 'Cliente'}</div>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>{client?.email}</div>
                  </div>
                </div>
                <p className="mb-0" style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{ticket.description}</p>
              </div>
            </div>
          </div>

          <SupportReplyForm 
            ticket={ticket} 
            client={client} 
            editingResp={editingResp} 
            setEditingResp={setEditingResp} 
            submitting={submitting} 
            responseText={responseText} 
            setResponseText={setResponseText} 
            responseStatus={responseStatus} 
            setResponseStatus={setResponseStatus} 
            handleSendResponse={handleSendResponse} 
          />

          <SupportQuickActions 
            ticket={ticket} 
            handleStatusChange={handleStatusChange} 
            submitting={submitting} 
          />

        </div>

        <SupportSidebar 
          client={client} 
          ticket={ticket} 
          payment={payment} 
          reservation={reservation} 
          space={space} 
        />
      </div>
    </div>
  );
}

export default AdminSupportDetail;
