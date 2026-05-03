/**
 * DashboardLayout.jsx
 *
 * Layout principal para todas las rutas autenticadas.
 * Compuesto por:
 *   - Sidebar (navegación lateral fija en desktop, slide-over en móvil)
 *   - Topbar  (sticky, con título dinámico de ruta, fecha y badge de rol)
 *   - Outlet  (contenido de la ruta activa)
 *
 * Mejoras:
 *   - Mapa de rutas extraído como constante ROUTE_META (título + ícono por segmento).
 *   - getRouteTitle() reescrito con lógica simplificada basada en segmentos de URL.
 *   - Topbar muestra badge de rol del usuario autenticado.
 *   - Toggle del sidebar en móvil movido al interior del Topbar (más accesible).
 */

import './DashboardLayout.css';
import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import { storage } from '../utils/storage';

// ── Mapa de segmentos de ruta → título legible ────────────────────────────────
const ROUTE_META = {
  dashboard:      { title: 'Dashboard' },
  espacios:       { title: 'Espacios' },
  reservas:       { title: 'Mis Reservas' },
  pagos:          { title: 'Pagos' },
  reseñas:        { title: 'Reseñas' },
  soporte:        { title: 'Soporte' },
  configuracion:  { title: 'Configuración' },
  // Admin
  sedes:          { title: 'Gestión de Sedes' },
  usuarios:       { title: 'Gestión de Usuarios' },
};

const DETAIL_LABELS = {
  espacios:  'Detalle del Espacio',
  reservas:  'Detalle de Reserva',
  pagos:     'Detalle del Pago',
  reseñas:   'Detalle de Reseña',
  soporte:   'Detalle del Ticket',
};

const ADMIN_LABELS = {
  espacios:  'Gestión de Espacios',
  pagos:     'Centro Financiero',
  reseñas:   'Centro de Opiniones',
  soporte:   'Centro de Soporte',
};

/**
 * Deriva un título legible a partir del pathname actual.
 * Ejemplos:
 *   /dashboard         → "Dashboard"
 *   /espacios/abc123   → "Detalle del Espacio"
 *   /reservas/nueva    → "Nueva Reserva"
 *   /admin/pagos       → "Centro Financiero (Admin)"
 *   /admin/pagos/xyz   → "Gestión de Pago (Admin)"
 */
function getRouteTitle(pathname, isAdmin) {
  const decodedPathname = decodeURIComponent(pathname);
  const parts = decodedPathname.replace(/^\//, '').split('/');
  const [first, second, third] = parts;

  // Admin routes
  if (first === 'admin') {
    if (third) return `Gestión de ${second.charAt(0).toUpperCase() + second.slice(1)} (Admin)`;
    return `${ADMIN_LABELS[second] ?? second} (Admin)`;
  }

  // Detail routes (2 segments, second is not "nueva")
  if (second && second !== 'nueva') {
    return DETAIL_LABELS[first] ?? 'Detalle';
  }

  // Nueva reserva
  if (second === 'nueva') return 'Nueva Reserva';

  // Top-level routes
  if (first === 'reservas') return isAdmin ? 'Gestión de Reservas' : 'Mis Reservas';

  return ROUTE_META[first]?.title ?? 'Panel';
}

// ─────────────────────────────────────────────────────────────────────────────

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location   = useLocation();
  const navigate   = useNavigate();

  const authUser = storage.get('authUser', {});
  const isAdmin  = authUser.rol === 'admin';

  const title      = getRouteTitle(location.pathname, isAdmin);

  const today = new Date().toLocaleDateString('es-CL', {
    weekday: 'long',
    year:    'numeric',
    month:   'long',
    day:     'numeric',
  });

  function handleLogout() {
    storage.remove('token');
    storage.remove('authUser');
    navigate('/login');
  }

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="dashboard-main">
        {/* ── Topbar ───────────────────────────────────────────────────────── */}
        <div className="dashboard-topbar">
          {/* Mobile toggle — inside topbar for correct z-index stacking */}
          <button
            className="sidebar-toggle-topbar"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <i className={`fas ${sidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>

          <div className="dashboard-topbar-title">{title}</div>

          <div className="dashboard-topbar-right">
            <span className="dashboard-topbar-date">
              <i className="far fa-calendar-alt me-1"></i>{today}
            </span>

            <div className="topbar-divider" />

            <span className={`topbar-role-badge ${isAdmin ? 'admin' : 'user'}`}>
              <i className={`fas ${isAdmin ? 'fa-shield-alt' : 'fa-user'}`}></i>
              {isAdmin ? 'Admin' : 'Usuario'}
            </span>

            <div className="topbar-divider" />

            <button className="topbar-logout" onClick={handleLogout} title="Cerrar sesión">
              <i className="fas fa-sign-out-alt"></i>
              <span className="d-none d-sm-inline">Salir</span>
            </button>
          </div>
        </div>

        {/* ── Page content ─────────────────────────────────────────────────── */}
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
