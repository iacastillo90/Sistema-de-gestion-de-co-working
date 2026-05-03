import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getReviews, createReview, deleteReview, getSpaces, getUserById, getLocations } from '../../services/api';
import './Reviews.css';

import { ReviewsHeader } from './components/List/ReviewsHeader';
import { ReviewForm } from './components/List/ReviewForm';
import { ReviewsFilters } from './components/List/ReviewsFilters';
import { ReviewCard } from './components/List/ReviewCard';
import { EmptyState } from './components/List/EmptyState';

function Reviews() {
  const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
  const isAdmin  = authUser.rol === 'admin';
  const navigate = useNavigate();

  const [reviews,   setReviews]   = useState([]);
  const [spaces,    setSpaces]    = useState([]);
  const [users,     setUsers]     = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showForm,  setShowForm]  = useState(false);
  const [form, setForm] = useState({ space_id: '', calificacion: 5, comentario: '' });

  // Filters
  const [searchText,   setSearchText]   = useState('');
  const [filterRating, setFilterRating] = useState('');
  const [sortOrder,    setSortOrder]    = useState('desc');

  async function load() {
    try {
      const [r, s, l] = await Promise.all([
        getReviews(),
        getSpaces(),
        getLocations().catch(() => []),
      ]);
      setReviews(r);
      setSpaces(s);
      setLocations(l);
      // Fetch each unique author (any role can hit /api/users/:id)
      const uniqueIds = [...new Set(r.map(rv => rv.user_id).filter(Boolean))];
      const userResults = await Promise.allSettled(uniqueIds.map(id => getUserById(id)));
      const fetched = userResults
        .filter(res => res.status === 'fulfilled' && res.value)
        .map(res => res.value);
      setUsers(fetched);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); }, []);

  function getSpace(id) { return spaces.find(s => s._id === id) || null; }
  function getUser(id)  { return users.find(u => u._id === id)  || null; }
  function getLocation(id) { return locations.find(l => l._id === id) || null; }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setSubmitting(true);
      await createReview({ user_id: authUser.id, space_id: form.space_id, calificacion: Number(form.calificacion), comentario: form.comentario });
      setForm({ space_id: '', calificacion: 5, comentario: '' });
      setShowForm(false);
      await load();
    } catch (err) { setError(err.message); }
    finally { setSubmitting(false); }
  }

  async function handleDelete(id) {
    if (!window.confirm('¿Eliminar esta reseña?')) return;
    try { await deleteReview(id); await load(); } catch (err) { setError(err.message); }
  }

  // Stats
  const avgRating = reviews.length
    ? (reviews.reduce((a, r) => a + r.calificacion, 0) / reviews.length).toFixed(1)
    : null;
  const dist = [5,4,3,2,1].map(n => ({ n, count: reviews.filter(r => r.calificacion === n).length }));

  // Filter & sort
  const filtered = reviews
    .filter(r => {
      const sp    = getSpace(r.space_id);
      const loc   = sp?.location_id ? getLocation(typeof sp.location_id === 'object' ? sp.location_id._id : sp.location_id) : null;
      const user  = getUser(r.user_id);
      if (filterRating && r.calificacion !== Number(filterRating)) return false;
      if (searchText.trim()) {
        const q = searchText.toLowerCase();
        const hits = [
          sp?.nombre,
          loc?.name, loc?.city, loc?.country, loc?.address,
          user?.nombre, user?.email,
          r.comentario,
        ].some(v => v && v.toLowerCase().includes(q));
        if (!hits) return false;
      }
      return true;
    })
    .sort((a, b) => {
      const da = new Date(a.createdAt), db = new Date(b.createdAt);
      return sortOrder === 'desc' ? db - da : da - db;
    });

  if (loading) return (
    <div className="loading-screen">
      <div className="spinner-border loading-spinner" role="status"><span className="visually-hidden">Cargando...</span></div>
    </div>
  );

  return (
    <div>
      <ReviewsHeader 
        filteredCount={filtered.length} 
        totalCount={reviews.length} 
        avgRating={avgRating} 
        showForm={showForm} 
        setShowForm={setShowForm} 
        reviewsLength={reviews.length} 
        dist={dist} 
      />

      {error && <div className="alert alert-danger">{error}</div>}

      {showForm && (
        <ReviewForm 
          form={form} 
          setForm={setForm} 
          spaces={spaces} 
          submitting={submitting} 
          handleSubmit={handleSubmit} 
        />
      )}

      <ReviewsFilters 
        searchText={searchText} 
        setSearchText={setSearchText} 
        filterRating={filterRating} 
        setFilterRating={setFilterRating} 
        sortOrder={sortOrder} 
        setSortOrder={setSortOrder} 
      />

      {/* Cards */}
      {filtered.length === 0 ? (
        <EmptyState reviewsLength={reviews.length} setShowForm={setShowForm} />
      ) : (
        <div className="row g-4">
          {filtered.map((review, idx) => {
            const sp     = getSpace(review.space_id);
            const locId  = sp?.location_id ? (typeof sp.location_id === 'object' ? sp.location_id._id : sp.location_id) : null;
            const loc    = locId ? getLocation(locId) : null;
            const user   = getUser(review.user_id);
            const isOwn  = review.user_id === authUser.id;
            const date   = new Date(review.createdAt).toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' });

            return (
              <ReviewCard 
                key={review._id ?? idx} 
                review={review} 
                sp={sp} 
                loc={loc} 
                user={user} 
                isOwn={isOwn} 
                isAdmin={isAdmin} 
                date={date} 
                navigate={navigate} 
                handleDelete={handleDelete} 
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Reviews;