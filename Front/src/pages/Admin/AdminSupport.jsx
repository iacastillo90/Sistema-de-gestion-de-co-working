import { useEffect, useState } from 'react';
import { getSupportTickets, getUsers } from '../../services/api';
import './Admin.css';

import { AdminHeader } from './components/Common/AdminHeader';
import { KPICard } from './components/Common/KPICard';
import { SupportChart } from './components/Support/SupportChart';
import { SupportFilters } from './components/Support/SupportFilters';
import { SupportTable } from './components/Support/SupportTable';

function AdminSupport() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  async function loadData() {
    try {
      const [tRes, uRes] = await Promise.all([
        getSupportTickets(),
        getUsers().catch(() => []),
      ]);
      setTickets(tRes);
      setUsers(uRes);
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

  // ── KPIs ──────────────────────────────────────────────────────────────────
  const openCount = tickets.filter(t => t.status === 'Open').length;
  const reviewCount = tickets.filter(t => t.status === 'In Review').length;
  const resolvedCount = tickets.filter(t => t.status === 'Resolved').length;
  const total = tickets.length;
  const resolvedPct = total > 0 ? Math.round((resolvedCount / total) * 100) : 0;

  // ── Filter ────────────────────────────────────────────────────────────────
  const filtered = tickets.filter(t => {
    if (filterStatus && t.status !== filterStatus) return false;
    if (searchText) {
      const q = searchText.toLowerCase();
      const usr = users.find(u => u._id === t.user_id);
      const matchSubject = t.subject.toLowerCase().includes(q);
      const matchUser = usr && usr.nombre.toLowerCase().includes(q);
      return matchSubject || matchUser;
    }
    return true;
  });

  return (
    <div>
      <AdminHeader 
        title="Centro de Soporte" 
        subtitle="Gestión de tickets y atención al cliente" 
        icon="fa-headset" 
      />

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <KPICard 
            title="Abiertos" 
            value={openCount} 
            subtitle="Requieren atención" 
            icon="fa-envelope-open" 
            colorClass="text-danger" 
            borderClass="#dc3545" 
            bgClass="bg-danger bg-opacity-10" 
          />
        </div>

        <div className="col-md-3">
          <KPICard 
            title="En Revisión" 
            value={reviewCount} 
            subtitle="En proceso" 
            icon="fa-search" 
            colorClass="text-warning text-dark" 
            borderClass="#ffc107" 
            bgClass="bg-warning bg-opacity-10" 
          />
        </div>

        <div className="col-md-3">
          <KPICard 
            title="Resueltos" 
            value={resolvedCount} 
            subtitle="Casos cerrados" 
            icon="fa-check-circle" 
            colorClass="text-success" 
            borderClass="#198754" 
            bgClass="bg-success bg-opacity-10" 
          />
        </div>

        <div className="col-md-3">
          <SupportChart 
            openCount={openCount} 
            reviewCount={reviewCount} 
            resolvedCount={resolvedCount} 
            total={total} 
            resolvedPct={resolvedPct} 
          />
        </div>
      </div>

      <SupportFilters 
        searchText={searchText} 
        setSearchText={setSearchText} 
        filterStatus={filterStatus} 
        setFilterStatus={setFilterStatus} 
      />

      <SupportTable 
        filteredTickets={filtered} 
        users={users} 
      />
    </div>
  );
}

export default AdminSupport;
