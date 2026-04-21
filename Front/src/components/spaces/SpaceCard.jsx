function SpaceCard ({ espacio }) {
    return (
        <div className="col-md-4">
            <div className="card h-100">
                <img src={espacio.imagen} loading="lazy" className="card-img-top" alt={espacio.nombre}/>
                <div className="card-body d-flex flex-column">
                    <h3 className="h5 card-title">{espacio.nombre}</h3>
                    <p className="card-text flex-grow-1">
                        {espacio.descripcion}
                    </p>
                    <ul className="list-unstyled small mb-3">
                        <li>👥 Capacidad: {espacio.capacidad} personas</li>
                        <li>💰 Precio: {espacio.precio} / mes</li>
                        <li>🟢 Disponible {espacio.disponibilidad ? "Sí" : "No"}</li>
                        <li>📍 Ubicación: {espacio.ubicacion}</li>
                    </ul>
                    <a href="#registro" className="btn-contact btn-arrow-css mt-auto">
                        Reserva Ahora!
                    </a>
                </div>
            </div>
        </div>
    );
}

export default SpaceCard;