import { Link } from 'react-router-dom';

function Hero () {

    return(
        <section id="hero" aria-label="Sección principal">
            <div className="hero-overlay" aria-hidden="true"></div>
            <div className="container h-100 position-relative z-2">
                <div className="row h-100 align-items-center">
                    <div className="col-lg-8 text-white hero-content">
                        <h1 className="display-3 fw-bold mb-4">
                        15 años liderando la evolución del
                        <span className="text-primary-red">trabajo híbrido</span>
                        </h1>
                        <p className="lead mb-5">
                        Optimiza la experiencia de tu equipo con oficinas pensadas para
                        la productividad y colaboración.
                        </p>
                        <div className="hero-buttons d-flex flex-wrap gap-3">
                            <a href="#registro" className="btn-white btn-arrow-css"
                                >¡Agenda una visita!</a
                            >
                            <Link
                                to="/membresias"
                                className="btn-outline-custom"
                            >
                                Membresías
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;