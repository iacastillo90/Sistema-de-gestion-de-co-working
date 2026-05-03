import { useEffect, useState } from 'react';
import { getSpaces, getLocations } from '../../services/api';
import './Memberships.css';

import HeroMemberships from './components/HeroMemberships';
import SpaceCard from './components/SpaceCard';
import SpacesFilters from './components/SpacesFilters';
import MembershipsLoadingSkeleton from './components/MembershipsLoadingSkeleton';

function Memberships() {
  const [spaces, setSpaces] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const [spacesData, locationsData] = await Promise.all([
          getSpaces(),
          getLocations().catch(() => []),
        ]);
        setSpaces(spacesData);
        setLocations(locationsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Helper: resolve location object for a space
  function getLocation(space) {
    const locId = typeof space.location_id === 'object'
      ? space.location_id?._id
      : space.location_id;
    return locations.find(l => l._id === locId) || null;
  }

  // Apply tipo filter
  const filteredSpaces = activeFilter
    ? spaces.filter(s => s.tipo?.toLowerCase() === activeFilter)
    : spaces;

  // Stats for hero
  const availableCount = spaces.filter(s => s.disponibilidad).length;

  return (
    <>
      <HeroMemberships
        totalSpaces={availableCount || spaces.length}
        totalLocations={locations.length}
      />

      <section id="espacios" className="memberships-section">
        <div className="container">

          {error && (
            <div className="alert alert-danger d-flex align-items-center gap-2 mb-4">
              <i className="fas fa-exclamation-circle"></i>
              <span>{error} — Por favor recarga la página o inicia sesión.</span>
            </div>
          )}

          <SpacesFilters
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            total={spaces.length}
            filtered={filteredSpaces.length}
          />

          <div className="mt-4">
            {loading ? (
              <MembershipsLoadingSkeleton />
            ) : filteredSpaces.length === 0 ? (
              <div className="memberships-empty">
                <i className="fas fa-building d-block text-muted"></i>
                <h4 className="fw-bold mt-3">No hay espacios disponibles</h4>
                <p className="text-muted">
                  {activeFilter
                    ? `No encontramos espacios del tipo "${activeFilter}". Prueba otro filtro.`
                    : 'Aún no hay espacios registrados en el sistema.'}
                </p>
                {activeFilter && (
                  <button
                    className="btn btn-outline-danger mt-2"
                    onClick={() => setActiveFilter('')}
                    style={{ borderRadius: '10px' }}
                  >
                    <i className="fas fa-times me-2"></i>Quitar filtro
                  </button>
                )}
              </div>
            ) : (
              <div className="row g-4">
                {filteredSpaces.map(space => (
                  <SpaceCard
                    key={space._id}
                    space={space}
                    location={getLocation(space)}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </section>
    </>
  );
}

export default Memberships;