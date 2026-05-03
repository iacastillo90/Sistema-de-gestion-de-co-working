import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSupportTickets, createSupportTicket, getReservations, getSpaces } from '../../services/api';
import './Support.css';

import { SupportHeader } from './components/List/SupportHeader';
import { SupportFilters } from './components/List/SupportFilters';
import { SupportCard } from './components/List/SupportCard';
import { EmptyState } from './components/List/EmptyState';
import { NewTicketModal } from './components/List/NewTicketModal';

function Support() {
  const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
  const isAdmin = authUser.rol === 'admin';
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // New ticket modal
  const [showNewModal, setShowNewModal] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [creating, setCreating] = useState(false);

  // Filters
  const [filterStatus, setFilterStatus] = useState('');
  const [searchText, setSearchText] = useState('');

  async function load() {
    try {
      const [data, rRes, sRes] = await Promise.all([
        getSupportTickets(),
        getReservations().catch(() => []),
        getSpaces().catch(() => [])
      ]);
      setTickets(data);
      setReservations(rRes);
      setSpaces(sRes);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); }, []);

  async function handleCreateTicket(e) {
    e.preventDefault();
    if (!newSubject.trim() || !newDescription.trim()) return;
    try {
      setCreating(true);
      await createSupportTicket({ subject: newSubject, description: newDescription });
      setShowNewModal(false);
      setNewSubject('');
      setNewDescription('');
      await load();
    } catch (err) {
      alert('Error creando ticket: ' + err.message);
    } finally {
      setCreating(false);
    }
  }

  const filtered = tickets
    .filter(t => {
      if (filterStatus && t.status !== filterStatus) return false;
      if (searchText.trim()) {
        const q = searchText.toLowerCase();
        if (!t.subject.toLowerCase().includes(q) && !t.description.toLowerCase().includes(q)) return false;
      }
      return true;
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
      <SupportHeader 
        isAdmin={isAdmin} 
        filteredLength={filtered.length} 
        totalLength={tickets.length} 
        setShowNewModal={setShowNewModal} 
      />

      <SupportFilters 
        searchText={searchText} 
        setSearchText={setSearchText} 
        filterStatus={filterStatus} 
        setFilterStatus={setFilterStatus} 
      />

      {error && <div className="alert alert-danger">{error}</div>}

      {filtered.length === 0 ? (
        <EmptyState ticketsLength={tickets.length} setShowNewModal={setShowNewModal} />
      ) : (
        <div className="row g-4">
          {filtered.map(ticket => (
            <SupportCard 
              key={ticket._id} 
              ticket={ticket} 
              reservations={reservations} 
              spaces={spaces} 
              navigate={navigate} 
            />
          ))}
        </div>
      )}

      <NewTicketModal 
        showNewModal={showNewModal} 
        setShowNewModal={setShowNewModal} 
        handleCreateTicket={handleCreateTicket} 
        newSubject={newSubject} 
        setNewSubject={setNewSubject} 
        newDescription={newDescription} 
        setNewDescription={setNewDescription} 
        creating={creating} 
      />
    </div>
  );
}

export default Support;
