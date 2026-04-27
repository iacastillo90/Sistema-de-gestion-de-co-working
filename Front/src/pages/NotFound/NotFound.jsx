import "../../assets/css/App.css";

import { Link } from "react-router-dom";

function NotFound () {

    return(
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center px-3">
            <h1 className="display-1 fw-bold text-danger">404</h1>
            <h2 className="mb-4">¡Oops! Página no encontrada</h2>
            <p className="text-muted mb-5">
                Parece que el espacio que estás buscando no existe o fue movido de lugar.
            </p>
            <Link to="/" className="btn btn-primary btn-lg">
                Volver al Inicio
            </Link>
        </div>
    );
}

export default NotFound;