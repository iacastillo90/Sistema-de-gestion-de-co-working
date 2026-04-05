import { Link, NavLink } from 'react-router-dom';

import logo from "../../assets/img/logo/Logo.png";

function Header() {
    return (
        <header>
            <nav className="navbar navbar-expand-lg fixed-top transition-all" id="mainNav">
                <div className="container">
                    
                    <Link className="navbar-brand" to="/" aria-label="Ir al inicio">
                        <img
                            src={logo}
                            alt="Logo de Jaffa CoWork"
                            className="nav-logo-icon"
                        />
                        <span className="brand-text">
                            JAFFA <small>CoWork</small>
                        </span>
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
                                    <li><a className="dropdown-item" href="#">Chile</a></li>
                                    <li><a className="dropdown-item" href="#">Colombia</a></li>
                                    <li><a className="dropdown-item" href="#">EEUU</a></li>
                                </ul>
                            </li>

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
                                            className={({ isActive }) =>
                                                isActive ? "dropdown-item fw-bold text-danger bg-light" : "dropdown-item"
                                            }
                                        >
                                            Membresías
                                        </NavLink>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Salas de Reunión
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Usuarios
                                </a>
                            </li>

                            <li className="nav-item ms-lg-3">
                                <a
                                    href="https://wa.me/56912345678"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-contact btn-arrow-css"
                                >
                                    ¡Contáctanos!
                                </a>
                            </li>
                            
                            <li className="nav-item ms-lg-3 mt-3 mt-lg-0">
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) =>
                                        isActive ? "btn-contact btn-arrow-css active-btn" : "btn-contact btn-arrow-css"
                                    }
                                >
                                    Login
                                </NavLink>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;