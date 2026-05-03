import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  getReviews, 
  deleteReview,
  updateReview,
  getSpaces, 
  getUsers,
  getLocations
} from '../../services/api';
import './Admin.css';

import { Toast } from './components/Common/Toast';
import { ReviewContent } from './components/ReviewDetail/ReviewContent';
import { ReviewResponse } from './components/ReviewDetail/ReviewResponse';
import { ReviewSidebar } from './components/ReviewDetail/ReviewSidebar';

function AdminReviewDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
  const isAdmin = authUser.rol === 'admin';


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [review, setReview] = useState(null);
  const [space, setSpace] = useState(null);
  const [client, setClient] = useState(null);
  const [location, setLocation] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [respuestaText, setRespuestaText] = useState('');
  const [editingResponse, setEditingResponse] = useState(false);

  const [modalConfig, setModalConfig] = useState({ show: false, title: '', message: '', action: null, confirmText: 'Confirmar', variant: 'primary' });
  const [toast, setToast] = useState(null); 
  function showToast(msg, type = 'success') {
    setToast({ msg, type });
  }

  async function loadData() {
    if (!isAdmin) return;
    try {
      setLoading(true);
      const [allReviews, allSpaces, allUsers, allLocations] = await Promise.all([
        getReviews(),
        getSpaces().catch(() => []),
        getUsers().catch(() => []),
        getLocations().catch(() => [])
      ]);
      
      const matchedReview = allReviews.find(r => r._id === id);
      if (!matchedReview) throw new Error("Reseña no encontrada");
      setReview(matchedReview);
      
      const matchedSpace = allSpaces.find(s => s._id === matchedReview.space_id);
      setSpace(matchedSpace);

      const matchedClient = allUsers.find(u => u._id === matchedReview.user_id);
      setClient(matchedClient);

      if (matchedSpace) {
        const matchedLocation = allLocations.find(l => l._id === matchedSpace.location_id || l._id === matchedSpace.location_id?._id);
        setLocation(matchedLocation);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { 
    if (isAdmin) loadData(); 
  }, [id, isAdmin]);

  useEffect(() => {
    if (review) setRespuestaText(review.respuesta_admin || '');
  }, [review]);

  if (!isAdmin) {
    return <div className="alert alert-danger">Acceso denegado.</div>;
  }

  function promptDeleteReview() {
    setModalConfig({
      show: true,
      title: 'Eliminar Reseña',
      message: '¿Estás seguro de que deseas eliminar permanentemente esta reseña? Esta acción no se puede deshacer y borrará la opinión del usuario del sistema.',
      action: async () => {
        try {
          setSubmitting(true);
          await deleteReview(id);
          setModalConfig(prev => ({ ...prev, show: false }));
          navigate('/admin/reseñas');
        } catch (err) {
          showToast('Error al eliminar: ' + err.message, 'danger');
          setSubmitting(false);
          setModalConfig(prev => ({ ...prev, show: false }));
        }
      },
      confirmText: 'Sí, Eliminar Permanentemente',
      variant: 'danger'
    });
  }

  async function handleSaveResponse() {
    try {
      setSubmitting(true);
      const fecha = new Date().toLocaleDateString('es-CL');
      await updateReview(id, { respuesta_admin: respuestaText.trim() || null, fecha_respuesta: respuestaText.trim() ? fecha : null });
      showToast('Respuesta guardada exitosamente.');
      setEditingResponse(false);
      await loadData();
    } catch (err) {
      showToast('Error al guardar la respuesta: ' + err.message, 'danger');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return (
    <div className="loading-screen">
      <div className="spinner-border loading-spinner" role="status"></div>
    </div>
  );

  if (!review) return (
    <div className="alert alert-danger">No se encontró la reseña.</div>
  );

  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <button className="btn btn-outline-secondary me-3" onClick={() => navigate('/admin/reseñas')} style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0 }}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <div>
          <h2 className="section-title mb-0">Detalle de Reseña #{review._id.slice(-6)}</h2>
          <p className="text-muted mb-0">Análisis y moderación de opinión de cliente.</p>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <Toast toast={toast} setToast={setToast} />

      <div className="row g-4">
        <div className="col-lg-8">
          <ReviewContent 
            review={review} 
            space={space} 
            location={location} 
          />

          <ReviewResponse 
            review={review} 
            client={client} 
            editingResponse={editingResponse} 
            setEditingResponse={setEditingResponse} 
            respuestaText={respuestaText} 
            setRespuestaText={setRespuestaText} 
            handleSaveResponse={handleSaveResponse} 
            submitting={submitting} 
          />

          <div className="premium-card">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3"><i className="fas fa-cogs text-secondary me-2"></i>Moderación</h5>
              <p className="text-muted small mb-4">Si la reseña infringe los términos de servicio o contiene lenguaje inapropiado, puedes eliminarla del sistema.</p>
              <button 
                className="btn btn-outline-danger fw-bold" 
                onClick={promptDeleteReview}
                disabled={submitting}
              >
                <i className="fas fa-trash-alt me-2"></i>Eliminar Reseña
              </button>
            </div>
          </div>
        </div>

        <ReviewSidebar client={client} />
      </div>

      {/* Modal Reutilizable de Confirmación */}
      {modalConfig.show && (
        <div className="modal fade show d-block premium-modal" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ borderTop: `6px solid var(--bs-${modalConfig.variant})` }}>
              <div className="modal-header border-0 pb-0">
                <button type="button" className="btn-close" onClick={() => setModalConfig({ ...modalConfig, show: false })}></button>
              </div>
              <div className="modal-body p-4 text-center">
                <div className="mb-4">
                  {modalConfig.variant === 'danger' && <i className="fas fa-times-circle text-danger" style={{ fontSize: '4rem' }}></i>}
                </div>
                <h4 className="fw-bold mb-3">{modalConfig.title}</h4>
                <p className="text-muted mb-4">{modalConfig.message}</p>
                <div className="d-flex justify-content-center gap-3">
                  <button type="button" className="btn btn-light fw-bold px-4 py-2" onClick={() => setModalConfig({ ...modalConfig, show: false })} disabled={submitting}>
                    Cancelar
                  </button>
                  <button type="button" className={`btn btn-${modalConfig.variant} text-white fw-bold px-4 py-2`} onClick={modalConfig.action} disabled={submitting}>
                    {submitting ? 'Procesando...' : modalConfig.confirmText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default AdminReviewDetail;
