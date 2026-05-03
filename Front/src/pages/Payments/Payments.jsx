import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getPayments, updatePayment, getReservations, getSpaces,
  getCards, addCard, setDefaultCard, removeCard,
  getSupportTickets, createSupportTicket,
  getInvoices
} from '../../services/api';

import './Payments.css';

import TabResumen from './components/List/TabResumen';
import TabHistorial from './components/List/TabHistorial';
import TabTarjetas from './components/List/TabTarjetas';
import TabSoporte from './components/List/TabSoporte';
import { CardModal, TicketModal, InvoiceModal } from './components/Common/Modals';

function Payments() {
  const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
  const isAdmin = authUser.rol === 'admin';
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('resumen');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [payments, setPayments] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [cards, setCards] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [invoices, setInvoices] = useState([]);

  // Modals state
  const [showCardModal, setShowCardModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [cardForm, setCardForm] = useState({ card_holder: '', last4: '', brand: 'Visa', exp_month: '', exp_year: '' });
  const [ticketForm, setTicketForm] = useState({ subject: '', description: '', related_payment_id: '' });

  async function loadData() {
    try {
      setLoading(true);
      const [pRes, rRes, cRes, tRes, iRes, sRes] = await Promise.all([
        getPayments(),
        getReservations(),
        getCards().catch(() => []),
        getSupportTickets().catch(() => []),
        getInvoices().catch(() => []),
        getSpaces().catch(() => [])
      ]);

      setReservations(rRes);
      setSpaces(sRes);
      setCards(cRes);
      setTickets(tRes);
      setInvoices(iRes);

      if (isAdmin) {
        setPayments(pRes);
      } else {
        const propias = rRes.filter(res => res.user_id === authUser.id).map(res => res._id);
        setPayments(pRes.filter(pay => propias.includes(pay.reservation_id)));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); }, []);

  // -- Handlers: Pagos --
  async function handlePayPending(pay) {
    const defaultCard = cards.find(c => c.is_default);
    if (!defaultCard) {
      alert("Por favor, agrega una tarjeta predeterminada primero.");
      setActiveTab('tarjetas');
      return;
    }

    if (!window.confirm(`¿Pagar $${pay.monto} con tarjeta terminada en ${defaultCard.last4}?`)) return;

    try {
      setSubmitting(true);
      await updatePayment(pay._id, {
        ...pay,
        estado: 'Completado',
        card_id: defaultCard._id,
        metodo_pago: `Tarjeta ${defaultCard.brand}`
      });
      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  // -- Handlers: Tarjetas --
  async function handleAddCard(e) {
    e.preventDefault();
    try {
      setSubmitting(true);
      await addCard(cardForm);
      setShowCardModal(false);
      setCardForm({ card_holder: '', last4: '', brand: 'Visa', exp_month: '', exp_year: '' });
      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleMakeDefault(id) {
    try {
      await setDefaultCard(id);
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDeleteCard(id) {
    if (!window.confirm("¿Eliminar esta tarjeta?")) return;
    try {
      await removeCard(id);
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  // -- Handlers: Soporte --
  async function handleCreateTicket(e) {
    e.preventDefault();
    try {
      setSubmitting(true);
      await createSupportTicket(ticketForm);
      setShowTicketModal(false);
      setTicketForm({ subject: '', description: '', related_payment_id: '' });
      setActiveTab('soporte');
      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  // Cálculos resumen
  const pagosCompletados = payments.filter(p => p.estado === 'Completado');
  const pagosPendientes = payments.filter(p => p.estado === 'Pendiente');
  const totalPagado = pagosCompletados.reduce((sum, p) => sum + Number(p.monto), 0);
  const totalPendiente = pagosPendientes.reduce((sum, p) => sum + Number(p.monto), 0);
  const defaultCard = cards.find(c => c.is_default);

  if (loading && payments.length === 0) return (
    <div className="loading-screen">
      <div className="spinner-border loading-spinner" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );

  return (
    <div>
      <div className="section-header">
        <h2 className="section-title">
          <i className="fas fa-university section-icon"></i>Centro de Pagos
        </h2>
        <p className="section-subtitle">Gestiona tus pagos, tarjetas y recibe soporte</p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Tabs Navigation */}
      <div className="tab-nav-banking">
        <button className={`tab-btn ${activeTab === 'resumen' ? 'active' : ''}`} onClick={() => setActiveTab('resumen')}>
          <i className="fas fa-chart-pie"></i> Resumen
        </button>
        <button className={`tab-btn ${activeTab === 'historial' ? 'active' : ''}`} onClick={() => setActiveTab('historial')}>
          <i className="fas fa-list"></i> Historial
          {pagosPendientes.length > 0 && <span className="tab-badge ms-2">{pagosPendientes.length}</span>}
        </button>
        <button className={`tab-btn ${activeTab === 'tarjetas' ? 'active' : ''}`} onClick={() => setActiveTab('tarjetas')}>
          <i className="fas fa-credit-card"></i> Tarjetas
          <span className="tab-badge ms-2">{cards.length}</span>
        </button>
        <button className={`tab-btn ${activeTab === 'soporte' ? 'active' : ''}`} onClick={() => setActiveTab('soporte')}>
          <i className="fas fa-headset"></i> Soporte
          {tickets.filter(t => t.status !== 'Resolved').length > 0 &&
            <span className="tab-badge ms-2">{tickets.filter(t => t.status !== 'Resolved').length}</span>
          }
        </button>
      </div>

      {/* TABS CONTENT */}
      {activeTab === 'resumen' && (
        <TabResumen 
          totalPagado={totalPagado} 
          totalPendiente={totalPendiente} 
          pagosCompletados={pagosCompletados} 
          pagosPendientes={pagosPendientes} 
          defaultCard={defaultCard} 
          setActiveTab={setActiveTab} 
        />
      )}

      {activeTab === 'historial' && (
        <TabHistorial 
          payments={payments} 
          reservations={reservations} 
          invoices={invoices} 
          isAdmin={isAdmin} 
          handlePayPending={handlePayPending} 
          submitting={submitting} 
          setSelectedInvoice={setSelectedInvoice} 
          setShowInvoiceModal={setShowInvoiceModal} 
          navigate={navigate} 
        />
      )}

      {activeTab === 'tarjetas' && (
        <TabTarjetas 
          cards={cards} 
          handleMakeDefault={handleMakeDefault} 
          handleDeleteCard={handleDeleteCard} 
          setShowCardModal={setShowCardModal} 
        />
      )}

      {activeTab === 'soporte' && (
        <TabSoporte 
          tickets={tickets} 
          reservations={reservations} 
          payments={payments} 
          spaces={spaces} 
          navigate={navigate} 
          setShowTicketModal={setShowTicketModal} 
        />
      )}

      {/* MODALS */}
      <CardModal 
        show={showCardModal} 
        onClose={() => setShowCardModal(false)} 
        cardForm={cardForm} 
        setCardForm={setCardForm} 
        handleAddCard={handleAddCard} 
        submitting={submitting} 
      />

      <TicketModal 
        show={showTicketModal} 
        onClose={() => setShowTicketModal(false)} 
        ticketForm={ticketForm} 
        setTicketForm={setTicketForm} 
        handleCreateTicket={handleCreateTicket} 
        payments={payments} 
        submitting={submitting} 
      />

      <InvoiceModal 
        show={showInvoiceModal} 
        onClose={() => setShowInvoiceModal(false)} 
        selectedInvoice={selectedInvoice} 
      />
    </div>
  );
}

export default Payments;