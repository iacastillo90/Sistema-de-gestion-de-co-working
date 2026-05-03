import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getSpaces, createReservation, createPayment, createInvoice, getCards, getReservations } from '../../services/api';
import './Reservations.css';

import SpaceDetailsForm from './components/New/SpaceDetailsForm';
import PaymentForm from './components/New/PaymentForm';
import SuccessModal from './components/New/SuccessModal';

function NewReservation() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');

  const [spaces, setSpaces] = useState([]);
  const [cards, setCards] = useState([]);
  const [allReservations, setAllReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  // UI States for Success Modals
  const [successModal, setSuccessModal] = useState(null); // 'Tarjeta' o 'Pendiente'
  const [completedData, setCompletedData] = useState(null);

  const [form, setForm] = useState({
    space_id: searchParams.get('spaceId') || '',
    fecha: '',
    hora_inicio: '',
    hora_fin: '',
    nota: '',
    metodo_pago: 'Efectivo', // Efectivo, Transferencia, Tarjeta
    card_id: '',
  });

  useEffect(() => {
    async function load() {
      try {
        const [spacesData, cardsData, reservationsData] = await Promise.all([
          getSpaces(),
          getCards().catch(() => []),
          getReservations().catch(() => [])
        ]);
        setSpaces(spacesData.filter(s => s.disponibilidad));
        setCards(cardsData);
        setAllReservations(reservationsData);
        const defaultCard = cardsData.find(c => c.is_default) || cardsData[0];
        if (defaultCard) {
          setForm(prev => ({ ...prev, card_id: defaultCard._id }));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const selectedSpace = spaces.find(s => s._id === form.space_id);

  const timeOptions = [];
  for (let i = 6; i <= 22; i++) {
    const h = i.toString().padStart(2, '0');
    timeOptions.push(`${h}:00`);
    timeOptions.push(`${h}:30`);
  }

  // Get occupied times for the selected space and date
  const occupiedTimes = new Set();
  if (form.space_id && form.fecha) {
    const reservationsOnDay = allReservations.filter(r => 
      r.space_id === form.space_id && 
      r.fecha === form.fecha && 
      r.estado !== 'Cancelada'
    );
    
    reservationsOnDay.forEach(r => {
      // Parse DB times into minutes since midnight
      const [sh, sm] = r.hora_inicio.split(':').map(Number);
      const startMins = sh * 60 + sm;
      const [eh, em] = r.hora_fin.split(':').map(Number);
      const endMins = eh * 60 + em;

      // For every 30-min slot in timeOptions, if it falls inside the reservation, mark it occupied
      timeOptions.forEach(t => {
        const [th, tm] = t.split(':').map(Number);
        const tMins = th * 60 + tm;
        // A time slot is occupied if its start time falls within an existing reservation
        // Overlap condition: startMins < slotEnd && endMins > slotStart
        if (startMins < (tMins + 30) && endMins > tMins) {
          occupiedTimes.add(t);
        }
      });
    });
  }

  let cantidadHoras = 0;
  let montoTotal = 0;

  if (form.hora_inicio && form.hora_fin && selectedSpace) {
    const start = new Date(`1970-01-01T${form.hora_inicio}`);
    const end = new Date(`1970-01-01T${form.hora_fin}`);
    if (end > start) {
      cantidadHoras = (end - start) / (1000 * 60 * 60);
      const tarifaPorHora = selectedSpace.precio ? Math.round(selectedSpace.precio) : 5;
      montoTotal = Math.round(cantidadHoras * tarifaPorHora);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!form.space_id || !form.fecha || !form.hora_inicio || !form.hora_fin) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (cantidadHoras <= 0) {
      setError('La hora de fin debe ser mayor a la hora de inicio.');
      return;
    }

    if (form.metodo_pago === 'Tarjeta' && !form.card_id) {
      setError('Debes seleccionar una tarjeta asociada.');
      return;
    }

    try {
      setSubmitting(true);

      // 1. Crear Reserva
      const reservation = await createReservation({
        user_id: authUser.id,
        space_id: form.space_id,
        fecha: form.fecha,
        hora_inicio: form.hora_inicio,
        hora_fin: form.hora_fin,
        nota: form.nota,
        estado: 'Confirmada',
      });

      // 2. Crear Pago
      const esTarjeta = form.metodo_pago === 'Tarjeta';
      const selectedCard = esTarjeta ? cards.find(c => c._id === form.card_id) : null;

      const paymentData = {
        reservation_id: reservation._id,
        monto: montoTotal,
        metodo_pago: esTarjeta ? `Tarjeta ${selectedCard?.brand}` : form.metodo_pago,
        fecha_pago: new Date().toISOString().split('T')[0],
        estado: esTarjeta ? 'Completado' : 'Pendiente',
      };

      if (esTarjeta) {
        paymentData.card_id = selectedCard._id;
      }

      const payment = await createPayment(paymentData);

      let invoice = null;
      // 3. Generar Factura si el pago fue con tarjeta (Completado)
      if (esTarjeta) {
        invoice = await createInvoice({
          reservation_id: reservation._id,
          payment_id: payment._id,
          descripcion: `Reserva de espacio: ${selectedSpace.nombre}`,
          cantidad_horas: cantidadHoras,
          precio_por_hora: selectedSpace.precio ? Math.round(selectedSpace.precio) : 5,
          monto_total: montoTotal,
        });
      }

      setCompletedData({ reservation, payment, invoice, space: selectedSpace });
      setSuccessModal(esTarjeta ? 'Tarjeta' : 'Pendiente');

    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  }

  if (loading) return (
    <div className="loading-screen">
      <div className="spinner-border loading-spinner" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );

  return (
    <div>
      <div className="section-header d-flex justify-content-between align-items-start flex-wrap gap-3">
        <div>
          <h2 className="section-title">
            <i className="fas fa-calendar-plus section-icon"></i>Nueva Reserva
          </h2>
          <p className="section-subtitle">Completa los datos y procede al pago del espacio</p>
        </div>
        <button 
          className="btn btn-outline-secondary" 
          onClick={() => navigate('/dashboard')}
          style={{ padding: '0.4rem 1rem', borderRadius: '8px' }}
        >
          <i className="fas fa-arrow-left me-2"></i>Volver al Dashboard
        </button>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          {error && <div className="alert alert-danger py-2 mb-4">
            <i className="fas fa-exclamation-circle me-2"></i>{error}
          </div>}

          <form onSubmit={handleSubmit} className="row g-4">
            <div className="col-md-7">
              <SpaceDetailsForm 
                form={form} 
                setForm={setForm} 
                spaces={spaces} 
                selectedSpace={selectedSpace} 
                timeOptions={timeOptions} 
                occupiedTimes={occupiedTimes} 
              />
            </div>

            <div className="col-md-5">
              <PaymentForm 
                form={form} 
                setForm={setForm} 
                cards={cards} 
                cantidadHoras={cantidadHoras} 
                montoTotal={montoTotal} 
                submitting={submitting} 
                navigate={navigate} 
              />
            </div>
          </form>
        </div>
      </div>

      <SuccessModal 
        successModal={successModal} 
        completedData={completedData} 
        authUser={authUser} 
        navigate={navigate} 
      />
    </div>
  );
}

export default NewReservation;