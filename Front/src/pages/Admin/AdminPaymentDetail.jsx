import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  getPayments, 
  updatePayment, 
  getReservations, 
  getSpaces, 
  getUsers,
  getInvoices
} from '../../services/api';
import './Admin.css';

import { Toast } from './components/Common/Toast';
import { PaymentDetailCard } from './components/PaymentDetail/PaymentDetailCard';
import { PaymentActions } from './components/PaymentDetail/PaymentActions';
import { PaymentSidebar } from './components/PaymentDetail/PaymentSidebar';

function AdminPaymentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
  const isAdmin = authUser.rol === 'admin';

  if (!isAdmin) {
    return <div className="alert alert-danger">Acceso denegado.</div>;
  }

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [payment, setPayment] = useState(null);
  const [reservation, setReservation] = useState(null);
  const [space, setSpace] = useState(null);
  const [client, setClient] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [modalConfig, setModalConfig] = useState({ show: false, title: '', message: '', action: null, confirmText: 'Confirmar', variant: 'primary' });

  // Toast
  const [toast, setToast] = useState(null); 
  function showToast(msg, type = 'success') {
    setToast({ msg, type });
  }

  async function loadData() {
    try {
      setLoading(true);
      const [allPayments, allInvoices, allReservations, allSpaces, allUsers] = await Promise.all([
        getPayments(),
        getInvoices().catch(() => []),
        getReservations(),
        getSpaces().catch(() => []),
        getUsers().catch(() => [])
      ]);
      
      const matchedPayment = allPayments.find(p => p._id === id);
      if (!matchedPayment) throw new Error("Pago no encontrado");
      setPayment(matchedPayment);
      
      const matchedInvoice = allInvoices.find(i => i.payment_id === id);
      setInvoice(matchedInvoice);

      const matchedReservation = allReservations.find(r => r._id === matchedPayment.reservation_id);
      setReservation(matchedReservation);

      if (matchedReservation) {
        const matchedSpace = allSpaces.find(s => s._id === matchedReservation.space_id);
        setSpace(matchedSpace);

        const matchedClient = allUsers.find(u => u._id === matchedReservation.user_id);
        setClient(matchedClient);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); }, [id]);

  function promptMarkAsPaid() {
    let msg = '¿Estás seguro de marcar este pago como completado? Esto confirmará que el dinero fue recibido.';
    if (payment.metodo_pago?.toLowerCase().includes('transferencia')) {
      msg = '¿Estás seguro de marcar esta transferencia como completada? Asegúrate de haber verificado los fondos en la cuenta bancaria.';
    }
    setModalConfig({
      show: true,
      title: 'Confirmar Pago',
      message: msg,
      action: async () => {
        try {
          setSubmitting(true);
          await updatePayment(id, { ...payment, estado: 'Completado' });
          showToast('Pago marcado como completado exitosamente.');
          await loadData();
        } catch (err) {
          showToast('Error al actualizar el pago: ' + err.message, 'danger');
        } finally {
          setSubmitting(false);
          setModalConfig(prev => ({ ...prev, show: false }));
        }
      },
      confirmText: 'Sí, marcar como Completado',
      variant: 'success'
    });
  }

  function promptMarkAsPending() {
    setModalConfig({
      show: true,
      title: 'Revertir Estado',
      message: '¿Seguro que quieres revertir el estado de este pago?',
      action: async () => {
        try {
          setSubmitting(true);
          await updatePayment(id, { ...payment, estado: 'Pendiente' });
          showToast('Pago revertido a pendiente.');
          await loadData();
        } catch (err) {
          showToast('Error al actualizar el pago: ' + err.message, 'danger');
        } finally {
          setSubmitting(false);
          setModalConfig(prev => ({ ...prev, show: false }));
        }
      },
      confirmText: 'Sí, revertir a Pendiente',
      variant: 'warning'
    });
  }

  function promptMarkAsInReview() {
    setModalConfig({
      show: true,
      title: 'Pasar a Revisión',
      message: '¿Indicar que esta transferencia está siendo verificada? El cliente verá que su pago está en proceso de validación.',
      action: async () => {
        try {
          setSubmitting(true);
          await updatePayment(id, { ...payment, estado: 'En Revisión' });
          showToast('Pago marcado en revisión.');
          await loadData();
        } catch (err) {
          showToast('Error al actualizar el pago: ' + err.message, 'danger');
        } finally {
          setSubmitting(false);
          setModalConfig(prev => ({ ...prev, show: false }));
        }
      },
      confirmText: 'Sí, pasar a En Revisión',
      variant: 'info'
    });
  }

  if (loading) return (
    <div className="loading-screen">
      <div className="spinner-border loading-spinner" role="status"></div>
    </div>
  );

  if (!payment) return (
    <div className="alert alert-danger">No se encontró el pago.</div>
  );

  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <button className="btn btn-outline-secondary me-3" onClick={() => navigate(-1)} style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0 }}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <div>
          <h2 className="section-title mb-0">Gestión de Pago #{payment._id.slice(-6)}</h2>
          <p className="text-muted mb-0">Vista administrativa detallada del estado financiero.</p>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <Toast toast={toast} setToast={setToast} />

      <div className="row g-4">
        <div className="col-lg-8">
          <PaymentDetailCard 
            payment={payment} 
            invoice={invoice} 
            reservation={reservation} 
            space={space} 
            client={client} 
          />

          <PaymentActions 
            payment={payment} 
            client={client} 
            space={space} 
            submitting={submitting} 
            promptMarkAsInReview={promptMarkAsInReview} 
            promptMarkAsPaid={promptMarkAsPaid} 
            promptMarkAsPending={promptMarkAsPending} 
          />
        </div>

        <PaymentSidebar client={client} />
      </div>

      {/* Modal Reutilizable de Confirmación */}
      {modalConfig.show && (
        <div className="modal fade show d-block premium-modal" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ borderTop: `6px solid var(--bs-${modalConfig.variant})` }}>
              <div className="modal-header border-0 pb-0">
                <button type="button" className="btn-close" onClick={() => setModalConfig({ ...modalConfig, show: false })}></button>
              </div>
              <div className="modal-body p-4 text-center">
                <div className="mb-4">
                  {modalConfig.variant === 'warning' && <i className="fas fa-exclamation-triangle text-warning" style={{ fontSize: '4rem' }}></i>}
                  {modalConfig.variant === 'success' && <i className="fas fa-check-circle text-success" style={{ fontSize: '4rem' }}></i>}
                  {modalConfig.variant === 'info' && <i className="fas fa-info-circle text-info" style={{ fontSize: '4rem' }}></i>}
                </div>
                <h4 className="fw-bold mb-3">{modalConfig.title}</h4>
                <p className="text-muted mb-4">{modalConfig.message}</p>
                <div className="d-flex justify-content-center gap-3">
                  <button type="button" className="btn btn-light fw-bold px-4 py-2" onClick={() => setModalConfig({ ...modalConfig, show: false })} disabled={submitting}>
                    Cancelar
                  </button>
                  <button type="button" className={`btn btn-${modalConfig.variant} text-${modalConfig.variant === 'warning' ? 'dark' : 'white'} fw-bold px-4 py-2`} onClick={modalConfig.action} disabled={submitting}>
                    {submitting ? 'Procesando...' : modalConfig.confirmText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default AdminPaymentDetail;
