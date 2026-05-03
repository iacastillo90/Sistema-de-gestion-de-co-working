import { useEffect, useState } from 'react';
import { getLocations, getSpaces, createLocation, updateLocation, deleteLocation } from '../../services/api';
import './Admin.css';

import { AdminHeader } from './components/Common/AdminHeader';
import { KPICard } from './components/Common/KPICard';
import { Toast } from './components/Common/Toast';
import { LocationTable } from './components/Locations/LocationTable';
import { LocationModal } from './components/Locations/LocationModal';
import { DeleteLocationModal } from './components/Locations/DeleteLocationModal';

function AdminLocations() {
  const [locations, setLocations] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [delConfirm, setDelConfirm] = useState(null); // location to delete
  const [form, setForm] = useState({
    name: '', address: '', city: '', country: '', phone: '', imagen: '', descripcion: ''
  });

  // Toast
  const [toast, setToast] = useState(null);
  function showToast(msg, type = 'success') {
    setToast({ msg, type });
  }

  async function load() {
    try {
      const [lRes, sRes] = await Promise.all([getLocations(), getSpaces().catch(() => [])]);
      setLocations(lRes);
      setSpaces(sRes);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); }, []);

  function openCreate() {
    setEditing(null);
    setForm({ name: '', address: '', city: '', country: '', phone: '', imagen: '', descripcion: '' });
    setShowModal(true);
  }

  function openEdit(loc) {
    setEditing(loc);
    setForm({
      name: loc.name || '', address: loc.address || '', city: loc.city || '',
      country: loc.country || '', phone: loc.phone || '',
      imagen: loc.imagen || '', descripcion: loc.descripcion || ''
    });
    setShowModal(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setSubmitting(true);
      const payload = { ...form, imagen: form.imagen || null, descripcion: form.descripcion || null };
      if (editing) {
        await updateLocation(editing._id, payload);
        showToast('Sede actualizada correctamente.');
      } else {
        await createLocation(payload);
        showToast('Sede creada correctamente.');
      }
      setShowModal(false);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    try {
      await deleteLocation(delConfirm._id);
      setDelConfirm(null);
      showToast('Sede eliminada.', 'warning');
      await load();
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

  // ── KPIs ──────────────────────────────────────────────────────────────────
  const totalSpaces = spaces.length;
  const spacesPerLoc = locations.map(loc => ({
    ...loc,
    spaceCount: spaces.filter(s => s.location_id === loc._id || s.location_id?._id === loc._id).length,
  }));

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <AdminHeader 
          title="Gestión de Sedes" 
          subtitle={`${locations.length} sede${locations.length !== 1 ? 's' : ''} · ${totalSpaces} espacio${totalSpaces !== 1 ? 's' : ''} en total`} 
          icon="fa-map-marker-alt" 
        />
        <button className="btn-primary-red" onClick={openCreate}>
          <i className="fas fa-plus"></i>Nueva Sede
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <KPICard 
            title="Total Sedes" 
            value={locations.length} 
            subtitle="Ubicaciones activas" 
            icon="fa-map-marker-alt" 
            colorClass="text-primary" 
            borderClass="#0d6efd" 
            bgClass="bg-primary bg-opacity-10" 
          />
        </div>
        <div className="col-md-4">
          <KPICard 
            title="Espacios Totales" 
            value={totalSpaces} 
            subtitle="Distribuidos en todas las sedes" 
            icon="fa-th-large" 
            colorClass="text-success" 
            borderClass="#198754" 
            bgClass="bg-success bg-opacity-10" 
          />
        </div>
        <div className="col-md-4">
          <KPICard 
            title="Promedio / Sede" 
            value={locations.length > 0 ? (totalSpaces / locations.length).toFixed(1) : '—'} 
            subtitle="Espacios por sede" 
            icon="fa-chart-pie" 
            colorClass="text-warning text-dark" 
            borderClass="#ffc107" 
            bgClass="bg-warning bg-opacity-10" 
          />
        </div>
      </div>

      <LocationTable 
        locations={locations} 
        spacesPerLoc={spacesPerLoc} 
        openEdit={openEdit} 
        setDelConfirm={setDelConfirm} 
        openCreate={openCreate} 
      />

      <Toast toast={toast} setToast={setToast} />

      <LocationModal 
        showModal={showModal} 
        setShowModal={setShowModal} 
        editing={editing} 
        handleSubmit={handleSubmit} 
        form={form} 
        setForm={setForm} 
        submitting={submitting} 
      />

      <DeleteLocationModal 
        delConfirm={delConfirm} 
        setDelConfirm={setDelConfirm} 
        handleDelete={handleDelete} 
      />
    </div>
  );
}

export default AdminLocations;