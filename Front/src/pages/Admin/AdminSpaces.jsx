import { useEffect, useState } from 'react';
import {
  getSpaces, createSpace, updateSpace, deleteSpace,
  getLocations, getReservations, getReviews
} from '../../services/api';
import './Admin.css';

import { AdminHeader } from './components/Common/AdminHeader';
import { KPICard } from './components/Common/KPICard';
import { Toast } from './components/Common/Toast';
import { SpaceFilters } from './components/Spaces/SpaceFilters';
import { SpaceTable } from './components/Spaces/SpaceTable';
import { SpaceModal } from './components/Spaces/SpaceModal';
import { DeleteModal } from './components/Spaces/DeleteModal';

function AdminSpaces() {
  const [spaces, setSpaces] = useState([]);
  const [locations, setLocations] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modal CRUD
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [delConfirm, setDelConfirm] = useState(null);
  const [form, setForm] = useState({
    nombre: '', descripcion: '', imagen: '', capacidad: '',
    location_id: '', ubicacion: '', precio: '', tipo: ''
  });

  // Filters
  const [searchText, setSearchText] = useState('');
  const [filterLoc, setFilterLoc] = useState('');

  // Toast
  const [toast, setToast] = useState(null);
  function showToast(msg, type = 'success') {
    setToast({ msg, type });
  }

  async function loadData() {
    try {
      const [sRes, lRes, rRes, revRes] = await Promise.all([
        getSpaces(),
        getLocations(),
        getReservations().catch(() => []),
        getReviews().catch(() => []),
      ]);
      setSpaces(sRes);
      setLocations(lRes);
      setReservations(rRes);
      setReviews(revRes);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { loadData(); }, []);

  function openCreate() {
    setEditing(null);
    setForm({ nombre: '', descripcion: '', imagen: '', capacidad: '', location_id: '', ubicacion: '', precio: '', tipo: '' });
    setShowModal(true);
  }

  function openEdit(sp) {
    setEditing(sp);
    setForm({
      nombre: sp.nombre || '', descripcion: sp.descripcion || '',
      imagen: sp.imagen || '', capacidad: sp.capacidad || '',
      location_id: sp.location_id?._id || sp.location_id || '',
      ubicacion: sp.ubicacion || '', precio: sp.precio || '', tipo: sp.tipo || ''
    });
    setShowModal(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setSubmitting(true);
      const loc = locations.find(l => l._id === form.location_id);
      const payload = { ...form, capacidad: Number(form.capacidad), precio: Number(form.precio), ubicacion: loc?.name || form.ubicacion };
      if (editing) {
        await updateSpace(editing._id, payload);
        showToast('Espacio actualizado.');
      } else {
        await createSpace(payload);
        showToast('Espacio creado.');
      }
      setShowModal(false);
      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    try {
      await deleteSpace(delConfirm._id);
      setDelConfirm(null);
      showToast('Espacio eliminado.', 'warning');
      await loadData();
    } catch (err) {
      showToast('Error: ' + err.message, 'danger');
      setDelConfirm(null);
    }
  }

  if (loading) return (
    <div className="loading-screen">
      <div className="spinner-border loading-spinner" role="status"></div>
    </div>
  );

  // ── KPIs ──────────────────────────────────────────────────────────────────
  const totalCapacidad = spaces.reduce((s, sp) => s + Number(sp.capacidad || 0), 0);
  const avgPrecio = spaces.length > 0 ? (spaces.reduce((s, sp) => s + Number(sp.precio || 0), 0) / spaces.length).toFixed(0) : 0;

  // ── Enrich spaces with stats ───────────────────────────────────────────────
  const enriched = spaces.map(sp => {
    const spReviews = reviews.filter(r => r.space_id === sp._id);
    const avgRating = spReviews.length > 0 ? (spReviews.reduce((s, r) => s + Number(r.calificacion), 0) / spReviews.length).toFixed(1) : null;
    const resCount = reservations.filter(r => r.space_id === sp._id).length;
    const loc = locations.find(l => l._id === (sp.location_id?._id || sp.location_id));
    return { ...sp, avgRating, reviewCount: spReviews.length, resCount, locName: loc?.name || sp.ubicacion || '—' };
  });

  // ── Filter ────────────────────────────────────────────────────────────────
  const filtered = enriched.filter(sp => {
    if (filterLoc && (sp.location_id?._id || sp.location_id) !== filterLoc) return false;
    if (searchText) {
      const q = searchText.toLowerCase();
      return sp.nombre.toLowerCase().includes(q) || sp.locName.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <AdminHeader 
          title="Gestión de Espacios" 
          subtitle={`${spaces.length} espacio${spaces.length !== 1 ? 's' : ''} registrados`} 
          icon="fa-th-large" 
        />
        <button className="btn-primary-red" onClick={openCreate}>
          <i className="fas fa-plus"></i>Nuevo Espacio
        </button>
      </div>

      {error && <div className="alert alert-danger mb-4">{error}</div>}

      {/* ── KPI Cards ──────────────────────────────────────────────────────── */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <KPICard 
            title="Total Espacios" 
            value={spaces.length} 
            subtitle={`En ${locations.length} sedes`} 
            icon="fa-th-large" 
            colorClass="text-primary" 
            borderClass="#0d6efd" 
            bgClass="bg-primary bg-opacity-10" 
          />
        </div>
        <div className="col-md-4">
          <KPICard 
            title="Capacidad Total" 
            value={totalCapacidad} 
            subtitle="Personas simultáneas" 
            icon="fa-users" 
            colorClass="text-success" 
            borderClass="#198754" 
            bgClass="bg-success bg-opacity-10" 
          />
        </div>
        <div className="col-md-4">
          <KPICard 
            title="Precio Promedio" 
            value={`$${Number(avgPrecio).toLocaleString()}`} 
            subtitle="Por hora / sesión" 
            icon="fa-dollar-sign" 
            colorClass="text-warning" 
            borderClass="#ffc107" 
            bgClass="bg-warning bg-opacity-10" 
          />
        </div>
      </div>

      <SpaceFilters 
        searchText={searchText} 
        setSearchText={setSearchText} 
        filterLoc={filterLoc} 
        setFilterLoc={setFilterLoc} 
        locations={locations} 
      />

      <SpaceTable 
        filteredSpaces={filtered} 
        openEdit={openEdit} 
        setDelConfirm={setDelConfirm} 
      />

      <Toast toast={toast} setToast={setToast} />

      <SpaceModal 
        showModal={showModal} 
        setShowModal={setShowModal} 
        editing={editing} 
        handleSubmit={handleSubmit} 
        form={form} 
        setForm={setForm} 
        locations={locations} 
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

export default AdminSpaces;
