import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  getReservationById, 
  getSpaceById, 
  getInvoices, 
  getPayments, 
  updateReservation,
  createSupportTicket
} from '../../services/api';
import './Reservations.css';

import ReservationInfo from './components/Detail/ReservationInfo';
import PaymentInfo from './components/Detail/PaymentInfo';
import { SupportModal, CancelModal, SupportSuccessModal } from './components/Detail/DetailModals';

function ReservationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [reservation, setReservation] = useState(null);
  const [space, setSpace] = useState(null);
  const [payment, setPayment] = useState(null);
  const [invoice, setInvoice] = useState(null);
  
  // State for support ticket modal
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSending, setSupportSending] = useState(false);

  // State for nota editing
  const [editingNota, setEditingNota] = useState(false);
  const [notaValue, setNotaValue] = useState('');

  // State for cancel modal
  const [showCancelModal, setShowCancelModal] = useState(false);

  // State for support success modal
  const [showSupportSuccessModal, setShowSupportSuccessModal] = useState(false);

  // Toast notification
  const [toast, setToast] = useState(null); // { msg, type: 'success'|'danger' }
  function showToast(msg, type = 'success') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function loadData() {
    try {
      const resData = await getReservationById(id);
      setReservation(resData);
      setNotaValue(resData.nota || '');
      
      const spaceData = await getSpaceById(resData.space_id);
      setSpace(spaceData);

      // Fetch payment and invoice to find the match
      const [allPayments, allInvoices] = await Promise.all([
        getPayments(),
        getInvoices().catch(() => [])
      ]);
      
      const matchedPayment = allPayments.find(p => p.reservation_id === id);
      setPayment(matchedPayment);
      
      if (matchedPayment) {
        const matchedInvoice = allInvoices.find(i => i.payment_id === matchedPayment._id || i.reservation_id === id);
        setInvoice(matchedInvoice);
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); }, [id]);

  async function handleSaveNota(valueToSave = notaValue) {
    try {
      await updateReservation(id, { ...reservation, nota: valueToSave });
      setReservation(prev => ({ ...prev, nota: valueToSave }));
      setEditingNota(false);
      if (valueToSave === '') {
        showToast('Nota eliminada correctamente.', 'success');
      } else if (reservation.nota) {
        showToast('Nota actualizada correctamente.', 'success');
      } else {
        showToast('Nota guardada correctamente.', 'success');
      }
    } catch (err) {
      showToast('Error guardando la nota: ' + err.message, 'danger');
    }
  }

  async function handleCancelConfirm() {
    try {
      await updateReservation(id, { ...reservation, estado: 'Cancelada' });
      await loadData();
      setShowCancelModal(false);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleSupportSubmit(e) {
    e.preventDefault();
    if (!supportMessage.trim()) return;
    try {
      setSupportSending(true);
      await createSupportTicket({
        subject: `Ayuda con Reserva en ${space?.nombre || 'Espacio'}`,
        description: supportMessage,
        related_payment_id: payment?._id || null,
        related_reservation_id: id
      });
      setShowSupportModal(false);
      setSupportMessage('');
      setShowSupportSuccessModal(true);
    } catch (err) {
      alert('Error enviando a soporte: ' + err.message);
    } finally {
      setSupportSending(false);
    }
  }

  if (loading) return (
    <div className="loading-screen">
      <div className="spinner-border loading-spinner" role="status"></div>
    </div>
  );

  if (!reservation || !space) return (
    <div className="alert alert-danger">No se encontró la reserva o no tienes acceso.</div>
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
          <h2 className="section-title mb-0">Detalle de Reserva</h2>
          <p className="text-muted mb-0">Gestiona los detalles, pago y facturación de este evento.</p>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Toast de notificación */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 9999,
            minWidth: '280px',
            maxWidth: '380px',
            animation: 'fadeInUp 0.3s ease',
          }}
        >
          <div
            className={`alert alert-${toast.type} d-flex align-items-center gap-3 shadow-lg mb-0`}
            style={{ borderRadius: '14px', border: 'none', padding: '1rem 1.25rem' }}
          >
            <div
              className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
              style={{
                width: '36px', height: '36px',
                background: toast.type === 'success' ? 'rgba(25,135,84,0.15)' : 'rgba(220,53,69,0.15)',
              }}
            >
              <i className={`fas ${toast.type === 'success' ? 'fa-check text-success' : 'fa-times text-danger'}`}></i>
            </div>
            <span className="fw-semibold" style={{ fontSize: '0.9rem' }}>{toast.msg}</span>
            <button
              className="btn-close ms-auto"
              style={{ fontSize: '0.7rem' }}
              onClick={() => setToast(null)}
            ></button>
          </div>
        </div>
      )}

      <div className="row g-4">
        {/* Columna Izquierda: Espacio y Detalles */}
        <div className="col-lg-7">
          <ReservationInfo 
            space={space} 
            reservation={reservation} 
            cantidadHoras={cantidadHoras} 
            editingNota={editingNota} 
            setEditingNota={setEditingNota} 
            notaValue={notaValue} 
            setNotaValue={setNotaValue} 
            handleSaveNota={handleSaveNota} 
          />
        </div>

        {/* Columna Derecha: Pago y Acciones */}
        <div className="col-lg-5">
          <PaymentInfo 
            payment={payment} 
            invoice={invoice} 
            space={space} 
            authUser={authUser} 
            reservation={reservation} 
            setShowSupportModal={setShowSupportModal} 
            setShowCancelModal={setShowCancelModal} 
          />
        </div>
      </div>

      <SupportModal 
        show={showSupportModal} 
        onClose={() => setShowSupportModal(false)} 
        handleSupportSubmit={handleSupportSubmit} 
        supportMessage={supportMessage} 
        setSupportMessage={setSupportMessage} 
        supportSending={supportSending} 
      />

      <CancelModal 
        show={showCancelModal} 
        onClose={() => setShowCancelModal(false)} 
        handleCancelConfirm={handleCancelConfirm} 
        space={space} 
        reservation={reservation} 
      />

      <SupportSuccessModal 
        show={showSupportSuccessModal} 
        onClose={() => setShowSupportSuccessModal(false)} 
        space={space} 
      />

    </div>
  );
}

export default ReservationDetail;
