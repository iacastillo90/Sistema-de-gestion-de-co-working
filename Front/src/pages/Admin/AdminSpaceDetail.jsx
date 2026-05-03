import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getSpaceById, getLocations, getReservations, getReviews,
  updateSpace, deleteSpace
} from '../../services/api';
import './Admin.css';

import { Toast } from './components/Common/Toast';
import { SpaceModal } from './components/Spaces/SpaceModal';
import { DeleteModal } from './components/Spaces/DeleteModal';
import { SpaceTabsContent } from './components/SpaceDetail/SpaceTabsContent';
import { SpaceSidebar } from './components/SpaceDetail/SpaceSidebar';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80';

function TipoBadge({ tipo }) {
  const map = {
    sala:      { cls: 'bg-primary',   label: 'Sala'          },
    oficina:   { cls: 'bg-success',   label: 'Oficina'       },
    escritorio:{ cls: 'bg-warning',   label: 'Escritorio'    },
    coworking: { cls: 'bg-info',      label: 'Coworking'     },
  };
  const t = tipo?.toLowerCase();
  const { cls, label } = map[t] || { cls: 'bg-secondary', label: tipo || 'Espacio' };
  return (
    <span className={`badge ${cls} bg-opacity-15 fw-semibold px-2 py-1`}
      style={{ borderRadius: '8px', fontSize: '0.85rem', color: 'inherit' }}>
      {label}
    </span>
  );
}

function AdminSpaceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [space,        setSpace]        = useState(null);
  const [location,     setLocation]     = useState(null);
  const [reservations, setReservations] = useState([]);
  const [reviews,      setReviews]      = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState('');

  // Modals
  const [showEdit,  setShowEdit]  = useState(false);
  const [submitting,setSubmitting]= useState(false);
  const [delConfirm,setDelConfirm]= useState(null);
  const [form, setForm] = useState({
    nombre: '', descripcion: '', imagen: '', capacidad: '',
    location_id: '', ubicacion: '', precio: '', tipo: ''
  });
  const [allLocations, setAllLocations] = useState([]);

  // Toast
  const [toast, setToast] = useState(null);
  function showToast(msg, type = 'success') {
    setToast({ msg, type });
  }

  async function loadData() {
    try {
      setLoading(true);
      const [spRes, locsRes, resRes, revRes] = await Promise.all([
        getSpaceById(id),
        getLocations(),
        getReservations().catch(() => []),
        getReviews().catch(() => [])
      ]);
      setSpace(spRes);
      setAllLocations(locsRes);
      
      const locId = spRes.location_id?._id || spRes.location_id;
      setLocation(locsRes.find(l => l._id === locId) || null);
      
      setReservations(resRes.filter(r => r.space_id === id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      setReviews(revRes.filter(r => r.space_id === id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); }, [id]);

  function openEdit() {
    setForm({
      nombre: space.nombre || '', descripcion: space.descripcion || '',
      imagen: space.imagen || '', capacidad: space.capacidad || '',
      location_id: space.location_id?._id || space.location_id || '',
      ubicacion: space.ubicacion || '', precio: space.precio || '', tipo: space.tipo || ''
    });
    setShowEdit(true);
  }

  async function handleEditSubmit(e) {
    e.preventDefault();
    try {
      setSubmitting(true);
      const loc = allLocations.find(l => l._id === form.location_id);
      const payload = { ...form, capacidad: Number(form.capacidad), precio: Number(form.precio), ubicacion: loc?.name || form.ubicacion };
      await updateSpace(id, payload);
      showToast('Espacio actualizado correctamente.');
      setShowEdit(false);
      await loadData();
    } catch (err) {
      showToast('Error al actualizar: ' + err.message, 'danger');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    try {
      await deleteSpace(id);
      navigate('/admin/espacios');
    } catch (err) {
      showToast('Error al eliminar: ' + err.message, 'danger');
      setDelConfirm(null);
    }
  }

  if (loading) return (
    <div className="loading-screen">
      <div className="spinner-border loading-spinner" role="status"></div>
    </div>
  );
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!space) return <div className="alert alert-warning">Espacio no encontrado.</div>;

  // KPIs
  const totalEarnings = reservations
    .filter(r => r.estado === 'Confirmada')
    .reduce((acc, curr) => acc + (Number(curr.total) || 0), 0);
  
  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + Number(r.calificacion), 0) / reviews.length).toFixed(1) 
    : '—';

  return (
    <div>
      <div className="d-flex align-items-center mb-4 gap-3 flex-wrap">
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate('/admin/espacios')}
          style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0, flexShrink: 0 }}
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <div className="flex-grow-1">
          <h2 className="section-title mb-0">Detalle de Espacio</h2>
          <p className="text-muted mb-0 font-monospace small">#{space._id.toUpperCase()}</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary fw-bold" onClick={openEdit}>
            <i className="fas fa-edit me-2"></i>Editar
          </button>
          <button className="btn btn-outline-danger fw-bold" onClick={() => setDelConfirm(space)}>
            <i className="fas fa-trash me-2"></i>Eliminar
          </button>
        </div>
      </div>

      <Toast toast={toast} setToast={setToast} />

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="premium-card mb-4 overflow-hidden">
            <div style={{ position: 'relative', height: '300px' }}>
              <img 
                src={space.imagen || PLACEHOLDER} 
                alt={space.nombre} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => { e.target.src = PLACEHOLDER; }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent 60%)' }}></div>
              <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem', color: '#fff' }}>
                <div className="d-flex align-items-center gap-3 mb-2">
                  <TipoBadge tipo={space.tipo} />
                  <span className="badge bg-dark bg-opacity-75 text-white border border-secondary border-opacity-50">
                    <i className="fas fa-map-marker-alt me-2 text-danger"></i>
                    {location?.name || space.ubicacion}
                  </span>
                </div>
                <h1 className="fw-bold mb-1" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{space.nombre}</h1>
              </div>
            </div>
            
            <div className="card-body p-4 p-lg-5">
              <div className="row g-4 mb-4 pb-4 border-bottom">
                <div className="col-sm-4">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', fontSize: '1.2rem' }}>
                      <i className="fas fa-users"></i>
                    </div>
                    <div>
                      <div className="text-muted small fw-semibold">Capacidad</div>
                      <div className="fw-bold fs-5">{space.capacidad} <span className="fs-6 text-muted fw-normal">pers.</span></div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', fontSize: '1.2rem' }}>
                      <i className="fas fa-dollar-sign"></i>
                    </div>
                    <div>
                      <div className="text-muted small fw-semibold">Precio Base</div>
                      <div className="fw-bold fs-5">${Number(space.precio).toLocaleString()} <span className="fs-6 text-muted fw-normal">/hr</span></div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-warning bg-opacity-10 text-warning rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', fontSize: '1.2rem' }}>
                      <i className="fas fa-star"></i>
                    </div>
                    <div>
                      <div className="text-muted small fw-semibold">Calificación Media</div>
                      <div className="fw-bold fs-5">{avgRating} <span className="fs-6 text-muted fw-normal">/ 5.0</span></div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="fw-bold mb-3">Acerca de este espacio</h5>
                <p className="text-muted" style={{ lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                  {space.descripcion || <span className="fst-italic opacity-50">No hay descripción disponible para este espacio.</span>}
                </p>
              </div>
            </div>
          </div>

          <ul className="nav nav-pills mb-4 gap-2" id="spaceTabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active fw-bold" id="res-tab" data-bs-toggle="pill" data-bs-target="#res" type="button" role="tab" style={{ borderRadius: '10px' }}>
                <i className="fas fa-calendar-alt me-2"></i>Historial de Reservas ({reservations.length})
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link fw-bold" id="rev-tab" data-bs-toggle="pill" data-bs-target="#rev" type="button" role="tab" style={{ borderRadius: '10px' }}>
                <i className="fas fa-star me-2"></i>Reseñas ({reviews.length})
              </button>
            </li>
          </ul>

          <SpaceTabsContent reservations={reservations} reviews={reviews} />
        </div>

        <SpaceSidebar 
          reservations={reservations} 
          reviews={reviews} 
          totalEarnings={totalEarnings} 
          location={location} 
        />
      </div>

      <SpaceModal 
        showModal={showEdit} 
        setShowModal={setShowEdit} 
        editing={space} 
        handleSubmit={handleEditSubmit} 
        form={form} 
        setForm={setForm} 
        locations={allLocations} 
        submitting={submitting} 
      />

      <DeleteModal 
        delConfirm={delConfirm} 
        setDelConfirm={setDelConfirm} 
        handleDelete={handleDelete} 
      />
    </div>
  );
}

export default AdminSpaceDetail;
