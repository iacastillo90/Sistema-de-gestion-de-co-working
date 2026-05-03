import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getReservations, getSpaces, getUsers } from '../../services/api';
import './Reservations.css';

import ReservationFilters from './components/List/ReservationFilters';
import ReservationCard from './components/List/ReservationCard';
import EmptyState from './components/List/EmptyState';

function Reservations() {
  const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
  const isAdmin = authUser.rol === 'admin';
  const navigate = useNavigate();
  
  const [reservations, setReservations] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Search & filter states
  const [searchText, setSearchText] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  async function load() {
    try {
      const [data, spacesData, usersData] = await Promise.all([
        getReservations(), 
        getSpaces(),
        isAdmin ? getUsers().catch(() => []) : Promise.resolve([])
      ]);
      setSpaces(spacesData);
      setUsers(usersData);
      setReservations(isAdmin ? data : data.filter(r => r.user_id === authUser.id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => { load(); }, []);

  function getSpace(spaceId) {
    return spaces.find(sp => sp._id === spaceId) || { nombre: 'Espacio', imagen: '', precio: 0 };
  }

  // Apply filters and sorting
  const filteredReservations = reservations
    .filter(r => {
      if (filterDate && r.fecha !== filterDate) return false;
      if (searchText.trim()) {
        const q = searchText.toLowerCase();
        const space = getSpace(r.space_id);
        const matchesNota = r.nota && r.nota.toLowerCase().includes(q);
        const matchesSpace = space.nombre.toLowerCase().includes(q);
        const matchesFecha = r.fecha.includes(q);
        const matchesEstado = r.estado.toLowerCase().includes(q);
        if (!matchesNota && !matchesSpace && !matchesFecha && !matchesEstado) return false;
      }
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.fecha);
      const dateB = new Date(b.fecha);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  const hasActiveFilters = searchText || filterDate;

  if (loading) return (
    <div className="loading-screen">
      <div className="spinner-border loading-spinner" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );

  return (
    <div>
      <div className="section-header d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div>
          <h2 className="section-title">
            <i className="fas fa-calendar-check section-icon"></i>
            {isAdmin ? 'Gestión de Reservas' : 'Mis Reservas'}
          </h2>
          <p className="section-subtitle">
            {filteredReservations.length} de {reservations.length} reserva{reservations.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link to="/reservas/nueva" className="btn-primary-red">
          <i className="fas fa-plus"></i>Nueva Reserva
        </Link>
      </div>

      <ReservationFilters 
        searchText={searchText} 
        setSearchText={setSearchText} 
        filterDate={filterDate} 
        setFilterDate={setFilterDate} 
        sortOrder={sortOrder} 
        setSortOrder={setSortOrder} 
        hasActiveFilters={hasActiveFilters} 
      />

      {error && <div className="alert alert-danger">{error}</div>}

      {filteredReservations.length === 0 ? (
        <EmptyState 
          reservationsCount={reservations.length} 
          setSearchText={setSearchText} 
          setFilterDate={setFilterDate} 
        />
      ) : (
        <div className="row g-4">
          {filteredReservations.map(res => (
            <ReservationCard 
              key={res._id} 
              res={res} 
              space={getSpace(res.space_id)} 
              users={users} 
              isAdmin={isAdmin} 
              navigate={navigate} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Reservations;