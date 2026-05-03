import { useEffect, useState } from 'react';
import { getPayments, getReservations, getUsers, getSpaces } from '../../services/api';
import './Admin.css';

import { AdminHeader } from './components/Common/AdminHeader';
import { KPICard } from './components/Common/KPICard';
import { PaymentChart } from './components/Payments/PaymentChart';
import { PaymentFilters } from './components/Payments/PaymentFilters';
import { PaymentTable } from './components/Payments/PaymentTable';

function AdminPayments() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [payments, setPayments] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [users, setUsers] = useState([]);
  const [spaces, setSpaces] = useState([]);

  // Search/Filter
  const [searchText, setSearchText] = useState('');
  const [filterEstado, setFilterEstado] = useState('');

  async function loadData() {
    try {
      const [payRes, resRes, usrRes, spaRes] = await Promise.all([
        getPayments(),
        getReservations(),
        getUsers().catch(() => []),
        getSpaces().catch(() => [])
      ]);
      setPayments(payRes);
      setReservations(resRes);
      setUsers(usrRes);
      setSpaces(spaRes);
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
  const completados = payments.filter(p => p.estado === 'Completado');
  const pendientes = payments.filter(p => p.estado === 'Pendiente');
  
  const totalIngresos = completados.reduce((sum, p) => sum + Number(p.monto), 0);
  const totalPendiente = pendientes.reduce((sum, p) => sum + Number(p.monto), 0);
  const totalEsperado = totalIngresos + totalPendiente;
  
  const pctCompletado = totalEsperado > 0 ? Math.round((totalIngresos / totalEsperado) * 100) : 0;
  const pctPendiente = totalEsperado > 0 ? Math.round((totalPendiente / totalEsperado) * 100) : 0;

  // Filter logic
  const filtered = payments.filter(p => {
    if (filterEstado && p.estado !== filterEstado) return false;
    
    if (searchText) {
      const term = searchText.toLowerCase();
      const res = reservations.find(r => r._id === p.reservation_id);
      const usr = res ? users.find(u => u._id === res.user_id) : null;
      
      const matchId = p._id.toLowerCase().includes(term);
      const matchName = usr && usr.nombre.toLowerCase().includes(term);
      return matchId || matchName;
    }
    return true;
  }).reverse(); // Recent first

  return (
    <div>
      <AdminHeader 
        title="Centro Financiero" 
        subtitle="Monitor de pagos, ingresos y deudas pendientes" 
        icon="fa-chart-line" 
      />

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <KPICard 
            title="Ingresos Recaudados" 
            value={`$${totalIngresos.toLocaleString()}`} 
            subtitle={`${completados.length} pagos completados`} 
            icon="fa-wallet" 
            colorClass="text-success" 
            borderClass="#198754" 
            bgClass="bg-success bg-opacity-10 border-success" 
          />
        </div>

        <div className="col-md-4">
          <KPICard 
            title="Cuentas por Cobrar" 
            value={`$${totalPendiente.toLocaleString()}`} 
            subtitle={`${pendientes.length} pagos pendientes`} 
            icon="fa-clock" 
            colorClass="text-warning text-dark" 
            borderClass="#ffc107" 
            bgClass="bg-warning bg-opacity-10 border-warning" 
          />
        </div>

        <div className="col-md-4">
          <PaymentChart 
            pctCompletado={pctCompletado} 
            pctPendiente={pctPendiente} 
          />
        </div>
      </div>

      <PaymentFilters 
        searchText={searchText} 
        setSearchText={setSearchText} 
        filterEstado={filterEstado} 
        setFilterEstado={setFilterEstado} 
      />

      <PaymentTable 
        filteredPayments={filtered} 
        reservations={reservations} 
        users={users} 
        spaces={spaces} 
      />
    </div>
  );
}

export default AdminPayments;
