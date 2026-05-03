import { useEffect, useState } from 'react';
import { getUsers, updateUser } from '../../services/api';
import './Admin.css';

import { AdminHeader } from './components/Common/AdminHeader';
import { KPICard } from './components/Common/KPICard';
import { Toast } from './components/Common/Toast';
import { UserFilters } from './components/Users/UserFilters';
import { UserTable } from './components/Users/UserTable';
import { RoleModal } from './components/Users/RoleModal';

function AdminUsers() {
  const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
  const currentUserId = authUser.id || authUser._id;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [searchText, setSearch] = useState('');
  const [filterRol, setFilter] = useState('');
  const [submitting, setSubmitting] = useState(null); // store id being processed

  // Modal de confirmación
  const [modal, setModal] = useState({ show: false, user: null, newRol: '' });

  // Toast
  const [toast, setToast] = useState(null);
  function showToast(msg, type = 'success') {
    setToast({ msg, type });
  }

  async function loadData() {
    try {
      setLoading(true);
      setUsers(await getUsers());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); }, []);

  async function handleRoleChange() {
    const { user, newRol } = modal;
    try {
      setSubmitting(user._id);
      await updateUser(user._id, { rol: newRol });
      showToast(`Rol de ${user.nombre} cambiado a "${newRol === 'admin' ? 'Administrador' : 'Cliente'}".`);
      setModal({ show: false, user: null, newRol: '' });
      await loadData();
    } catch (err) {
      showToast('Error: ' + err.message, 'danger');
    } finally {
      setSubmitting(null);
    }
  }

  if (loading) return (
    <div className="loading-screen">
      <div className="spinner-border loading-spinner" role="status"></div>
    </div>
  );

  // ── KPIs ──────────────────────────────────────────────────────────────────
  const totalUsers = users.length;
  const adminCount = users.filter(u => u.rol === 'admin').length;
  const clientCount = users.filter(u => u.rol !== 'admin').length;

  // ── Filter ────────────────────────────────────────────────────────────────
  const filtered = users.filter(u => {
    if (filterRol && u.rol !== filterRol) return false;
    if (searchText) {
      const q = searchText.toLowerCase();
      return u.nombre.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div>
      <AdminHeader 
        title="Gestión de Usuarios" 
        subtitle="Administra los roles y accesos del sistema" 
        icon="fa-users-cog" 
      />

      {error && <div className="alert alert-danger">{error}</div>}

      {/* ── KPI Cards ──────────────────────────────────────────────────────── */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <KPICard 
            title="Total Usuarios" 
            value={totalUsers} 
            subtitle="Registrados en el sistema" 
            icon="fa-users" 
            colorClass="text-primary" 
            borderClass="#0d6efd" 
            bgClass="bg-primary bg-opacity-10" 
          />
        </div>
        <div className="col-md-4">
          <KPICard 
            title="Administradores" 
            value={adminCount} 
            subtitle="Con acceso total al sistema" 
            icon="fa-shield-alt" 
            colorClass="text-danger" 
            borderClass="#dc3545" 
            bgClass="bg-danger bg-opacity-10" 
          />
        </div>
        <div className="col-md-4">
          <KPICard 
            title="Clientes" 
            value={clientCount} 
            subtitle="Usuarios estándar activos" 
            icon="fa-user" 
            colorClass="text-success" 
            borderClass="#198754" 
            bgClass="bg-success bg-opacity-10" 
          />
        </div>
      </div>

      <UserFilters 
        searchText={searchText} 
        setSearch={setSearch} 
        filterRol={filterRol} 
        setFilter={setFilter} 
      />

      <UserTable 
        filteredUsers={filtered} 
        currentUserId={currentUserId} 
        setModal={setModal} 
        submitting={submitting} 
      />

      <Toast toast={toast} setToast={setToast} />

      <RoleModal 
        modal={modal} 
        setModal={setModal} 
        handleRoleChange={handleRoleChange} 
        submitting={submitting} 
      />
    </div>
  );
}

export default AdminUsers;
