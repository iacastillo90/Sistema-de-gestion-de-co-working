function Banner () {

    return(
        <section
            id="cta-banner"
            className="position-relative text-center"
            aria-label="Llamado a la acción"
            >
            <div className="hero-overlay" aria-hidden="true"></div>
            <div className="container py-5 position-relative z-2">
                <h2 className="fw-bold text-white mb-3">¡Encuentra Tu Lugar Perfecto!</h2>
                <p className="lead text-white mb-4">
                Mientras tú te enfocas en lo importante, nosotros te ayudamos a
                encontrar el espacio ideal.
                </p>
                <a href="#contacto" className="btn-pill-red">¡Conversemos!</a>
            </div>
        </section>
    );
}

export default Banner;