import { useEffect, useState } from 'react';
import { getSpaces, getReservations, getReviews, getPayments, getUsers, getLocations } from '../../services/api';
import './Dashboard.css';

import { AdminDashboard } from './components/AdminDashboard';
import { ClientDashboard } from './components/ClientDashboard';

function Dashboard() {
  const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
  const isAdmin = authUser.rol === 'admin';
  const [stats, setStats] = useState(null);
  const [recentReservations, setRecentReservations] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    async function loadStats() {
      try {
        const [spacesData, reservations, reviews, payments, users, locationsData] = await Promise.all([
          getSpaces(), 
          getReservations(), 
          getReviews(), 
          getPayments(),
          isAdmin ? getUsers().catch(() => []) : Promise.resolve([]),
          getLocations().catch(() => [])
        ]);
        setSpaces(spacesData);
        setLocations(locationsData);

        const propias = reservations.filter(r => r.user_id === authUser.id);
        const activas = propias.filter(r => r.estado === 'Confirmada');
        const reviewsPropias = reviews.filter(r => r.user_id === authUser.id);
        const pagosPropios = payments.filter(p => {
          const res = reservations.find(r => r._id === p.reservation_id);
          return res && res.user_id === authUser.id;
        });

        setStats({
          totalSpaces: spacesData.length,
          spacesDisponibles: spacesData.filter(s => s.disponibilidad).length,
          totalReservations: isAdmin ? reservations.length : propias.length,
          activeReservations: isAdmin
            ? reservations.filter(r => r.estado === 'Confirmada').length
            : activas.length,
          cancelledReservations: isAdmin
            ? reservations.filter(r => r.estado === 'Cancelada').length
            : propias.filter(r => r.estado === 'Cancelada').length,
          totalPayments: isAdmin ? payments.length : pagosPropios.length,
          pendingPayments: isAdmin
            ? payments.filter(p => p.estado === 'Pendiente').length
            : pagosPropios.filter(p => p.estado === 'Pendiente').length,
          completedPayments: isAdmin
            ? payments.filter(p => p.estado === 'Completado').length
            : pagosPropios.filter(p => p.estado === 'Completado').length,
          totalReviews: isAdmin ? reviews.length : reviewsPropias.length,
          totalUsers: isAdmin ? users.length : 0,
        });

        const recent = isAdmin
          ? reservations.slice().reverse()
          : propias.slice().reverse();
        setRecentReservations(recent);
      } catch (err) {
        setError(err.message);
      }
    }
    loadStats();
  }, []);

  if (isAdmin) {
    return (
      <AdminDashboard 
        stats={stats} 
        recentReservations={recentReservations} 
        spaces={spaces} 
        error={error} 
      />
    );
  }

  return (
    <ClientDashboard 
      stats={stats} 
      recentReservations={recentReservations} 
      spaces={spaces} 
      error={error} 
      authUser={authUser} 
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage} 
      itemsPerPage={itemsPerPage} 
    />
  );
}

export default Dashboard;