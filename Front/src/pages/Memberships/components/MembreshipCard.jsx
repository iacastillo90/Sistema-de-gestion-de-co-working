function MembreshipCard({ imgOffice, title, capacity, features, titleBack, descriptionBack }) {
    return (
        <div className="col-12 col-md-6 col-lg-4">
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front card shadow-sm border-0">
                        <img
                            src={imgOffice}
                            className="card-img-top object-fit-cover"
                            style={{ height: "200px" }}
                            alt={title}
                        />
                        <div className="card-body text-start">
                            <h5 className="card-title fw-bold text-dark">{title}</h5>
                            <p className="card-text small text-muted">
                                Capacidad {capacity} personas
                            </p>
                            <hr />
                            
                            <ul className="list-unstyled small">
                                {features.map((feature, index) => (
                                    <li key={index}>✅ {feature}</li>
                                ))}
                            </ul>
                            
                            <p className="text-center text-danger small mt-2">
                                Gira para más info ↺
                            </p>
                        </div>
                    </div>
                    <div className="flip-card-back card shadow-sm border-0 bg-danger text-white p-4 d-flex flex-column justify-content-center">
                        <h5 className="fw-bold mb-3">{titleBack}</h5>
                        <p className="small">
                            {descriptionBack}
                        </p>
                        <button className="btn btn-light text-danger fw-bold mt-3">
                            ¡Lo quiero!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MembreshipCard;