import { useEffect, useState } from 'react';
import { getSpaces, createSpace, updateSpace, deleteSpace, getLocations, createLocation } from '../../services/api';
import './Spaces.css';

import { SpacesHeader } from './components/List/SpacesHeader';
import { SpacesFilters } from './components/List/SpacesFilters';
import { SpaceCard } from './components/List/SpaceCard';
import { EmptyState } from './components/List/EmptyState';
import { SpaceModal } from './components/List/SpaceModal';

function Spaces() {
  const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
  const isAdmin = authUser.rol === 'admin';
  const [spaces, setSpaces] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    nombre: '', descripcion: '', imagen: '', capacidad: '', location_id: '', ubicacion: '', precio: '',
  });

  // UI state for creating a new location inline
  const [showNewLocation, setShowNewLocation] = useState(false);
  const [locForm, setLocForm] = useState({
    name: '', address: '', city: '', country: '', phone: ''
  });

  // Filters
  const [searchText, setSearchText] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  async function loadData() {
    try {
      const [spRes, locRes] = await Promise.all([
        getSpaces(),
        getLocations()
      ]);
      setSpaces(spRes);
      setLocations(locRes);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); }, []);

  function openCreate() {
    setEditing(null);
    setForm({ nombre: '', descripcion: '', imagen: '', capacidad: '', location_id: '', ubicacion: '', precio: '' });
    setShowNewLocation(false);
    setShowModal(true);
  }

  function openEdit(space) {
    setEditing(space);
    setForm({
      nombre: space.nombre, descripcion: space.descripcion, imagen: space.imagen,
      capacidad: space.capacidad,
      location_id: space.location_id?._id || '',
      ubicacion: space.ubicacion || '',
      precio: space.precio,
    });
    setShowNewLocation(false);
    setShowModal(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let finalLocationId = form.location_id;
      let finalUbicacion = form.ubicacion;

      // Si el usuario eligió crear una nueva sede al vuelo
      if (showNewLocation) {
        if (!locForm.name || !locForm.address || !locForm.city || !locForm.country) {
          setError('Completa todos los campos obligatorios de la nueva sede.');
          return;
        }
        const newLoc = await createLocation(locForm);
        finalLocationId = newLoc._id;
        finalUbicacion = newLoc.name;
        // Refrescar locaciones localmente
        setLocations([...locations, newLoc]);
      } else {
        // Obtenemos el nombre de la sede seleccionada para guardarlo por retrocompatibilidad
        const selectedLoc = locations.find(l => l._id === form.location_id);
        if (selectedLoc) finalUbicacion = selectedLoc.name;
      }

      if (!finalLocationId && !finalUbicacion) {
        setError('Debes seleccionar o crear una Sede.');
        return;
      }

      const payload = {
        ...form,
        capacidad: Number(form.capacidad),
        precio: Number(form.precio),
        location_id: finalLocationId,
        ubicacion: finalUbicacion // para retrocompatibilidad
      };

      if (editing) {
        await updateSpace(editing._id, payload);
      } else {
        await createSpace(payload);
      }

      setShowModal(false);
      setLocForm({ name: '', address: '', city: '', country: '', phone: '' });
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('¿Eliminar este espacio?')) return;
    try {
      await deleteSpace(id);
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  const filteredSpaces = spaces
    .filter(space => {
      if (searchText.trim()) {
        const q = searchText.toLowerCase();
        const loc = locations.find(l => l._id === (space.location_id?._id || space.location_id));
        const hits = [
          space.nombre,
          space.descripcion,
          space.ubicacion,
          loc?.name,
          loc?.city,
          loc?.country,
          loc?.address
        ].some(v => v && v.toLowerCase().includes(q));
        if (!hits) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.nombre.localeCompare(b.nombre);
      if (sortOrder === 'desc') return b.nombre.localeCompare(a.nombre);
      return 0;
    });

  if (loading) return (
    <div className="loading-screen">
      <div className="spinner-border loading-spinner" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );

  return (
    <div>
      <SpacesHeader 
        filteredSpacesLength={filteredSpaces.length} 
        totalAvailable={filteredSpaces.filter(s => s.disponibilidad).length} 
        isAdmin={isAdmin} 
        openCreate={openCreate} 
      />

      <SpacesFilters 
        searchText={searchText} 
        setSearchText={setSearchText} 
        sortOrder={sortOrder} 
        setSortOrder={setSortOrder} 
      />

      {error && <div className="alert alert-danger">{error}</div>}

      {filteredSpaces.length === 0 ? (
        <EmptyState isAdmin={isAdmin} openCreate={openCreate} />
      ) : (
        <div className="row g-4">
          {filteredSpaces.map(space => (
            <SpaceCard 
              key={space._id} 
              space={space} 
              isAdmin={isAdmin} 
              openEdit={openEdit} 
              handleDelete={handleDelete} 
            />
          ))}
        </div>
      )}

      <SpaceModal 
        showModal={showModal} 
        setShowModal={setShowModal} 
        editing={editing} 
        handleSubmit={handleSubmit} 
        form={form} 
        setForm={setForm} 
        locations={locations} 
        showNewLocation={showNewLocation} 
        setShowNewLocation={setShowNewLocation} 
        locForm={locForm} 
        setLocForm={setLocForm} 
      />
    </div>
  );
}

export default Spaces;