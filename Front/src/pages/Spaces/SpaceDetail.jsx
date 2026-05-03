import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSpaceById, getReviews } from '../../services/api';
import './Spaces.css';

import { SpaceHero } from './components/Detail/SpaceHero';
import { SpaceReviews } from './components/Detail/SpaceReviews';

function SpaceDetail() {
  const { id } = useParams();
  const [space, setSpace] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const [spaceData, allReviews] = await Promise.all([
          getSpaceById(id),
          getReviews(),
        ]);
        setSpace(spaceData);
        setReviews(allReviews.filter(r => r.space_id === id));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return (
    <div className="loading-screen">
      <div className="spinner-border loading-spinner" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="alert alert-danger">{error}</div>
  );

  if (!space) return (
    <div className="alert alert-warning">Espacio no encontrado.</div>
  );

  return (
    <div>
      {/* Back link */}
      <Link to="/espacios" className="info-row text-decoration-none mb-4 d-inline-flex" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--muted)', background: 'var(--bg-color)', padding: '0.3rem 0.6rem', borderRadius: '6px' }}>
        <i className="fas fa-arrow-left"></i>Volver a espacios
      </Link>

      <SpaceHero space={space} />

      <SpaceReviews reviews={reviews} />
    </div>
  );
}

export default SpaceDetail;