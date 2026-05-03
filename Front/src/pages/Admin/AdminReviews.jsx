import { useEffect, useState } from 'react';
import { getReviews, getSpaces, getUsers, getLocations } from '../../services/api';
import './Admin.css';

import { AdminHeader } from './components/Common/AdminHeader';
import { KPICard } from './components/Common/KPICard';
import { ReviewChart } from './components/Reviews/ReviewChart';
import { ReviewFilters } from './components/Reviews/ReviewFilters';
import { ReviewTable, renderStars } from './components/Reviews/ReviewTable';

function AdminReviews() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [reviews, setReviews] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [users, setUsers] = useState([]);
  const [locations, setLocations] = useState([]);

  // Search/Filter
  const [searchText, setSearchText] = useState('');
  const [filterRating, setFilterRating] = useState('');

  async function loadData() {
    try {
      const [revRes, spaRes, usrRes, locRes] = await Promise.all([
        getReviews(),
        getSpaces().catch(() => []),
        getUsers().catch(() => []),
        getLocations().catch(() => [])
      ]);
      setReviews(revRes);
      setSpaces(spaRes);
      setUsers(usrRes);
      setLocations(locRes);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); }, []);

  if (loading) return (
    <div className="loading-screen">
      <div className="spinner-border loading-spinner" role="status"></div>
    </div>
  );

  // Calcs
  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0 ? (reviews.reduce((acc, r) => acc + Number(r.calificacion), 0) / totalReviews).toFixed(1) : 0;
  
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach(r => {
    const cal = Math.floor(r.calificacion);
    if (ratingCounts[cal] !== undefined) ratingCounts[cal]++;
  });

  // Filter logic
  const filtered = reviews.filter(r => {
    if (filterRating && String(r.calificacion) !== filterRating) return false;
    
    if (searchText) {
      const term = searchText.toLowerCase();
      const usr = users.find(u => u._id === r.user_id);
      const space = spaces.find(s => s._id === r.space_id);
      
      const matchId = r._id.toLowerCase().includes(term);
      const matchName = usr && usr.nombre.toLowerCase().includes(term);
      const matchSpace = space && space.nombre.toLowerCase().includes(term);
      return matchId || matchName || matchSpace;
    }
    return true;
  }).reverse(); // Recent first

  return (
    <div>
      <AdminHeader 
        title="Centro de Opiniones" 
        subtitle="Monitor de reseñas y satisfacción de clientes" 
        icon="fa-star text-warning" 
      />

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <KPICard 
            title="Total Reseñas" 
            value={totalReviews} 
            subtitle="Registradas en el sistema" 
            icon="fa-comments" 
            colorClass="text-primary" 
            borderClass="#0d6efd" 
            bgClass="bg-primary bg-opacity-10 border-primary" 
          />
        </div>

        <div className="col-md-4">
          <KPICard 
            title="Calificación Promedio" 
            value={
              <span className="d-flex align-items-center gap-2">
                {avgRating} <span className="fs-5">{renderStars(Math.round(avgRating))}</span>
              </span>
            } 
            subtitle="De 5.0 estrellas posibles" 
            icon="fa-star" 
            colorClass="text-warning text-dark" 
            borderClass="#ffc107" 
            bgClass="bg-warning bg-opacity-10 border-warning" 
          />
        </div>

        <div className="col-md-4">
          <ReviewChart 
            totalReviews={totalReviews} 
            ratingCounts={ratingCounts} 
          />
        </div>
      </div>

      <ReviewFilters 
        searchText={searchText} 
        setSearchText={setSearchText} 
        filterRating={filterRating} 
        setFilterRating={setFilterRating} 
      />

      <ReviewTable 
        filteredReviews={filtered} 
        users={users} 
        spaces={spaces} 
        locations={locations} 
      />
    </div>
  );
}

export default AdminReviews;
