import { useState, useEffect } from 'react';
import './Sidebar.css';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { storage } from '../../utils/storage';
import logo from '../../assets/img/logo/Logo.png';
import { useDarkMode } from '../../hooks/useDarkMode';

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const authUser = storage.get('authUser', {});
  const isAdmin = authUser.rol === 'admin';

  const initial = (authUser.email || 'U').charAt(0).toUpperCase();

  const { darkMode, toggle } = useDarkMode();

  function handleLogout() {
    storage.remove('token');
    storage.remove('authUser');
    // We don't remove darkMode so the preference stays
    navigate('/login');
  }

  const linkClass = ({ isActive }) =>
    `sidebar-link${isActive ? ' active' : ''}`;

  return (
    <>
      {/* Overlay móvil */}
      <div
        className={`sidebar-overlay${isOpen ? ' sidebar-overlay-visible' : ''}`}
        onClick={onClose}
      ></div>

      <aside className={`sidebar${isOpen ? ' sidebar-open' : ''}`}>
        {/* Brand */}
        <Link to="/dashboard" className="sidebar-brand" onClick={onClose}>
          <img src={logo} alt="JAFFA CoWork" className="sidebar-brand-logo" />
          <div className="sidebar-brand-text">
            JAFFA <small>CoWork</small>
          </div>
        </Link>

        {/* User */}
        <div className="sidebar-user">
          <div className="d-flex align-items-center gap-3">
            <div className="sidebar-user-avatar">{initial}</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name fw-bold" style={{ fontSize: '0.85rem' }}>{authUser.nombre || authUser.name || 'Miembro JAFFA'}</div>
              <div className="sidebar-user-email" style={{ opacity: 0.7, fontSize: '0.75rem', fontWeight: 500 }}>{authUser.email || 'Sin correo'}</div>
              <div className="sidebar-user-role" style={{ marginTop: '2px' }}>
                {isAdmin ? '★ Administrador' : 'Usuario'}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Principal</div>
          <NavLink to="/dashboard" className={linkClass} onClick={onClose} end>
            <i className="fas fa-th-large"></i> Dashboard
          </NavLink>

          <div className="sidebar-section-label mt-3">Gestión</div>
          <NavLink to="/reservas" className={linkClass} onClick={onClose}>
            <i className="fas fa-calendar-check"></i> {isAdmin ? "Gestión de Reservas" : "Mis Reservas"}
          </NavLink>

          <NavLink to={isAdmin ? "/admin/pagos" : "/pagos"} className={linkClass} onClick={onClose}>
            <i className="fas fa-credit-card"></i> {isAdmin ? "Centro Financiero" : "Pagos"}
          </NavLink>
          <NavLink to={isAdmin ? "/admin/reseñas" : "/reseñas"} className={linkClass} onClick={onClose}>
            <i className="fas fa-star"></i> {isAdmin ? "Centro de Opiniones" : "Reseñas"}
          </NavLink>
          <NavLink to={isAdmin ? "/admin/soporte" : "/soporte"} className={linkClass} onClick={onClose}>
            <i className="fas fa-headset"></i> {isAdmin ? "Centro de Soporte" : "Soporte"}
          </NavLink>

          <div className="sidebar-section-label mt-3">Cuenta</div>
          <NavLink to="/configuracion" className={linkClass} onClick={onClose}>
            <i className="fas fa-cog"></i> Configuración
          </NavLink>

          {isAdmin && (
            <>
              <div className="sidebar-section-label mt-3">Administración</div>
              <NavLink to="/admin/sedes" className={linkClass} onClick={onClose}>
                <i className="fas fa-map-marker-alt"></i> Sedes
              </NavLink>
              <NavLink to="/admin/espacios" className={linkClass} onClick={onClose}>
                <i className="fas fa-th-large"></i> Espacios
              </NavLink>
              <NavLink to="/admin/usuarios" className={linkClass} onClick={onClose}>
                <i className="fas fa-users-cog"></i> Usuarios
              </NavLink>
            </>
          )}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <button
            className="sidebar-logout mb-2"
            onClick={toggle}
            style={{
              justifyContent: 'space-between',
              background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.15)',
              borderColor: darkMode ? 'rgba(255,255,255,0.2)' : 'transparent'
            }}
          >
            <span className="d-flex align-items-center gap-2">
              <i className={darkMode ? 'fas fa-moon' : 'fas fa-sun'}></i>
              {darkMode ? 'Modo Oscuro' : 'Modo Claro'}
            </span>
            <div style={{
              width: '32px', height: '18px', borderRadius: '10px',
              background: darkMode ? '#D12026' : 'rgba(255,255,255,0.3)',
              position: 'relative', transition: 'all 0.3s ease'
            }}>
              <div style={{
                width: '14px', height: '14px', borderRadius: '50%',
                background: '#fff', position: 'absolute', top: '2px',
                left: darkMode ? '16px' : '2px', transition: 'all 0.3s ease'
              }} />
            </div>
          </button>

          <button className="sidebar-logout" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
