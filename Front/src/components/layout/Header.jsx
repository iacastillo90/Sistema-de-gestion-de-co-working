import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/img/logo/Logo.png';
import { useDarkMode } from '../../hooks/useDarkMode';

function Header() {
  const { darkMode, toggle } = useDarkMode();

  const handleNavLinkClick = () => {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse && navbarCollapse.classList.contains('show') && window.bootstrap) {
      const bsCollapse = window.bootstrap.Collapse.getInstance(navbarCollapse) || new window.bootstrap.Collapse(navbarCollapse, { toggle: false });
      bsCollapse.hide();
    }
  };

  return (
    <header>
      <nav className="navbar navbar-expand-xl fixed-top transition-all" id="mainNav">
        <div className="container">

          <Link className="navbar-brand" to="/" aria-label="Ir al inicio" onClick={handleNavLinkClick}>
            <img src={logo} alt="Logo de Jaffa CoWork" className="nav-logo-icon" />
            <span className="brand-text">JAFFA <small>CoWork</small></span>
          </Link>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Alternar navegación"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-lg-center">

              {/* ── Sedes ── */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Sedes
                </a>
                <ul className="dropdown-menu border-0 shadow-sm">
                  <li>
                    <NavLink
                      to="/sedes/chile"
                      onClick={handleNavLinkClick}
                      className={({ isActive }) =>
                        isActive ? 'dropdown-item fw-bold text-danger' : 'dropdown-item'
                      }
                    >
                      <i className="fas fa-map-marker-alt text-danger me-2"></i>Chile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/sedes/colombia"
                      onClick={handleNavLinkClick}
                      className={({ isActive }) =>
                        isActive ? 'dropdown-item fw-bold text-danger' : 'dropdown-item'
                      }
                    >
                      <i className="fas fa-map-marker-alt text-danger me-2"></i>Colombia
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/sedes/eeuu"
                      onClick={handleNavLinkClick}
                      className={({ isActive }) =>
                        isActive ? 'dropdown-item fw-bold text-danger' : 'dropdown-item'
                      }
                    >
                      <i className="fas fa-map-marker-alt text-danger me-2"></i>EEUU
                    </NavLink>
                  </li>
                </ul>
              </li>

              {/* ── Soluciones ── */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Soluciones
                </a>
                <ul className="dropdown-menu border-0 shadow-sm">
                  <li>
                    <NavLink
                      to="/membresias"
                      onClick={handleNavLinkClick}
                      className={({ isActive }) =>
                        isActive ? 'dropdown-item fw-bold text-danger' : 'dropdown-item'
                      }
                    >
                      <i className="fas fa-id-card text-danger me-2"></i>Membresías
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/soluciones/salas-reunion"
                      onClick={handleNavLinkClick}
                      className={({ isActive }) =>
                        isActive ? 'dropdown-item fw-bold text-danger' : 'dropdown-item'
                      }
                    >
                      <i className="fas fa-users text-danger me-2"></i>Salas de Reunión
                    </NavLink>
                  </li>
                </ul>
              </li>

              {/* ── Contáctanos ── */}
              <li className="nav-item ms-lg-3">
                <a
                  href="https://wa.me/56912345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-red btn-arrow-css"
                >
                  <span className="btn-text">¡Conversemos!</span>
                  <div className="btn-arrow-wrapper">
                    <div className="btn-arrow-circle">
                      <i className="fas fa-arrow-right"></i>
                    </div>
                  </div>
                </a>
              </li>

              {/* ── Login ── */}
              <li className="nav-item ms-lg-2">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? 'btn-pill-red btn-arrow-css active-btn' : 'btn-pill-red btn-arrow-css'
                  }
                >
                  Login
                </NavLink>
              </li>

              {/* ── Dark Mode Toggle ── */}
              <li className="nav-item ms-lg-3 d-flex align-items-center justify-content-center mt-3 mt-lg-0">
                <button
                  onClick={toggle}
                  className="btn btn-link nav-link p-0"
                  aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
                  style={{ fontSize: '1.25rem' }}
                >
                  <i className={darkMode ? 'fas fa-sun text-warning' : 'fas fa-moon'}></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;