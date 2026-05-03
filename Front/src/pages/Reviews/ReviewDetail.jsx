import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getReviewById,
  getSpaceById,
  getUserById,
  getLocations,
  deleteReview,
} from '../../services/api';
import './Reviews.css';

import { ReviewDetailHeader } from './components/Detail/ReviewDetailHeader';
import { MainColumn } from './components/Detail/MainColumn';
import { SidebarColumn } from './components/Detail/SidebarColumn';

function ReviewDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
  const isAdmin  = authUser.rol === 'admin';

  const [review,   setReview]   = useState(null);
  const [space,    setSpace]    = useState(null);
  const [author,   setAuthor]   = useState(null);
  const [location, setLocation] = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');

  async function loadData() {
    try {
      const rev = await getReviewById(id);
      setReview(rev);

      // Load space
      if (rev.space_id) {
        try {
          const sp = await getSpaceById(rev.space_id);
          setSpace(sp);

          // Load location
          if (sp.location_id) {
            try {
              const locs = await getLocations();
              const locId = typeof sp.location_id === 'object' ? sp.location_id._id : sp.location_id;
              setLocation(locs.find(l => l._id === locId) || null);
            } catch (_) {}
          }
        } catch (_) {}
      }

      // Load author by ID directly (works for any authenticated role)
      try {
        const user = await getUserById(rev.user_id);
        setAuthor(user || null);
      } catch (_) {}

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); }, [id]);

  async function handleDelete() {
    if (!window.confirm('¿Eliminar esta reseña? Esta acción no se puede deshacer.')) return;
    try {
      await deleteReview(id);
      navigate('/reseñas');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  }

  if (loading) return (
    <div className="loading-screen">
      <div className="spinner-border loading-spinner" role="status"><span className="visually-hidden">Cargando...</span></div>
    </div>
  );
  if (error || !review) return <div className="alert alert-danger">{error || 'Reseña no encontrada'}</div>;

  const isOwn    = review.user_id === authUser.id;
  const canDelete = isAdmin || isOwn;
  const date     = new Date(review.createdAt).toLocaleDateString('es-CL', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
  const ratingLabel = review.calificacion >= 5 ? 'Excelente' : review.calificacion === 4 ? 'Muy bueno' : review.calificacion === 3 ? 'Bueno' : review.calificacion === 2 ? 'Regular' : 'Deficiente';

  return (
    <div>
      <ReviewDetailHeader 
        review={review} 
        canDelete={canDelete} 
        handleDelete={handleDelete} 
        navigate={navigate} 
      />

      <div className="row g-4">
        <MainColumn 
          space={space} 
          location={location} 
          review={review} 
          ratingLabel={ratingLabel} 
          date={date} 
        />
        
        <SidebarColumn 
          author={author} 
          review={review} 
          isOwn={isOwn} 
          location={location} 
          ratingLabel={ratingLabel} 
          space={space} 
          navigate={navigate} 
        />
      </div>
    </div>
  );
}

export default ReviewDetail;
