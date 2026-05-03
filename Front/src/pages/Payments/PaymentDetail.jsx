import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getPaymentById,
  getReservationById,
  getSpaceById,
  getInvoices,
  updatePayment,
  getCards,
  createSupportTicket,
} from '../../services/api';

import './Payments.css';

import SpaceSummary from './components/Detail/SpaceSummary';
import PaymentBreakdown from './components/Detail/PaymentBreakdown';
import PaymentStatus from './components/Detail/PaymentStatus';
import { SupportIssueModal, SupportSuccessModal } from './components/Detail/SupportModals';

function PaymentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');

  const [payment, setPayment] = useState(null);
  const [reservation, setReservation] = useState(null);
  const [space, setSpace] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paying, setPaying] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);

  // Support modal
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [supportMsg, setSupportMsg] = useState('');
  const [supportSending, setSupportSending] = useState(false);
  const [showSupportSuccess, setShowSupportSuccess] = useState(false);

  async function loadData() {
    try {
      setLoading(true);
      const pay = await getPaymentById(id);
      setPayment(pay);

      // Load reservation
      if (pay.reservation_id) {
        try {
          const res = await getReservationById(pay.reservation_id);
          setReservation(res);
          if (res.space_id) {
            try {
              const sp = await getSpaceById(res.space_id);
              setSpace(sp);
            } catch (_) {}
          }
        } catch (_) {}
      }

      // Load invoice linked to this payment
      try {
        const allInvoices = await getInvoices();
        const found = allInvoices.find(i => i.payment_id === pay._id);
        setInvoice(found || null);
      } catch (_) {}

      // Load cards
      try {
        const c = await getCards();
        setCards(c);
      } catch (_) {}

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); }, [id]);

  async function handlePay() {
    const defaultCard = cards.find(c => c.is_default) || cards[0];
    if (!defaultCard) {
      alert('Por favor, agrega una tarjeta en la sección de Pagos primero.');
      return;
    }
    try {
      setPaying(true);
      await updatePayment(id, {
        ...payment,
        estado: 'Completado',
        card_id: defaultCard._id,
        metodo_pago: `Tarjeta ${defaultCard.brand}`,
      });
      setPaySuccess(true);
      await loadData();
    } catch (err) {
      alert('Error al procesar pago: ' + err.message);
    } finally {
      setPaying(false);
    }
  }

  async function handleSendSupport(e) {
    e.preventDefault();
    if (!supportMsg.trim()) return;
    try {
      setSupportSending(true);
      await createSupportTicket({
        subject: `Consulta sobre Pago #${id.slice(-6).toUpperCase()}`,
        description: supportMsg,
        related_payment_id: id,
        related_reservation_id: payment?.reservation_id || null,
      });
      setShowSupportModal(false);
      setSupportMsg('');
      setShowSupportSuccess(true);
    } catch (err) {
      alert('Error enviando ticket: ' + err.message);
    } finally {
      setSupportSending(false);
    }
  }

  // Compute hours
  let cantidadHoras = 0;
  if (reservation?.hora_inicio && reservation?.hora_fin) {
    const start = new Date(`1970-01-01T${reservation.hora_inicio}`);
    const end   = new Date(`1970-01-01T${reservation.hora_fin}`);
    if (end > start) cantidadHoras = (end - start) / (1000 * 60 * 60);
  }

  const defaultCard = cards.find(c => c.is_default) || cards[0];

  if (loading) return (
    <div className="loading-screen">
      <div className="spinner-border loading-spinner" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );

  if (error || !payment) return (
    <div className="alert alert-danger">{error || 'Pago no encontrado'}</div>
  );

  const isPending   = payment.estado === 'Pendiente';
  const payDate     = new Date(payment.fecha_pago || payment.createdAt).toLocaleDateString('es-CL', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
  const createdDate = new Date(payment.createdAt).toLocaleDateString('es-CL', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <div>
      {/* Header */}
      <div className="section-header d-flex justify-content-between align-items-start flex-wrap gap-3">
        <div>
          <h2 className="section-title">
            <i className="fas fa-receipt section-icon"></i>Detalle del Pago
          </h2>
          <p className="section-subtitle">#{payment._id.slice(-8).toUpperCase()}</p>
        </div>
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate('/pagos')}
          style={{ padding: '0.4rem 1rem', borderRadius: '8px' }}
        >
          <i className="fas fa-arrow-left me-2"></i>Volver a Pagos
        </button>
      </div>

      <div className="row g-4">
        {/* ── Columna principal ────────────────────────────────── */}
        <div className="col-lg-8">
          <SpaceSummary 
            space={space} 
            reservation={reservation} 
            cantidadHoras={cantidadHoras} 
          />

          <PaymentBreakdown 
            space={space}
            cantidadHoras={cantidadHoras}
            invoice={invoice}
            payment={payment}
            payDate={payDate}
            isPending={isPending}
            paySuccess={paySuccess}
            defaultCard={defaultCard}
            handlePay={handlePay}
            paying={paying}
            authUser={authUser}
          />
        </div>

        {/* ── Columna lateral ──────────────────────────────────── */}
        <div className="col-lg-4">
          <PaymentStatus 
            payment={payment} 
            isPending={isPending} 
            createdDate={createdDate} 
            invoice={invoice} 
          />

          {/* Soporte rápido */}
          <div className="premium-card">
            <div className="card-body p-4 text-center">
              <i className="fas fa-headset text-primary fs-3 mb-2 d-block"></i>
              <h6 className="fw-bold mb-1">¿Tienes algún problema?</h6>
              <p className="text-muted small mb-3">Nuestro equipo te ayudará a resolver cualquier inconveniente con este pago.</p>
              <button className="btn btn-outline-danger w-100" style={{ borderRadius: '10px' }} onClick={() => setShowSupportModal(true)}>
                <i className="fas fa-ticket-alt me-2"></i>Abrir Ticket de Soporte
              </button>
            </div>
          </div>
        </div>
      </div>

      <SupportIssueModal 
        show={showSupportModal} 
        onClose={() => setShowSupportModal(false)} 
        handleSendSupport={handleSendSupport} 
        supportMsg={supportMsg} 
        setSupportMsg={setSupportMsg} 
        supportSending={supportSending} 
      />

      <SupportSuccessModal 
        show={showSupportSuccess} 
        onClose={() => setShowSupportSuccess(false)} 
        navigate={navigate} 
      />
    </div>
  );
}

export default PaymentDetail;
