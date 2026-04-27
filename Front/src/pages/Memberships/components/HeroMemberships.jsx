function HeroMemberships() {
    return (
        <section className="hero-memberships d-flex align-items-center text-white">
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-7">
                        <span className="badge rounded-pill text-bg-danger mb-3 px-3">
                            Co-Work
                        </span>
                        <h1 className="display-3 fw-bold mb-4">
                            Membresías que se{" "}
                            <span className="text-danger">adaptan a ti</span>
                        </h1>
                        <p className="lead mb-5">
                            En Co-Work ofrecemos soluciones flexibles para freelancers,
                            startups y empresas consolidadas. Elige el plan que mejor se
                            ajuste a tu ritmo de trabajo y escala tu negocio con nosotros.
                        </p>
                        <div className="d-flex gap-3">
                            <a href="#planes" className="btn btn-danger btn-lg px-4">
                                Ver Planes
                            </a>
                            <a href="" className="btn btn-outline-light btn-lg px-4">
                                Hablar con un experto
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroMemberships;
