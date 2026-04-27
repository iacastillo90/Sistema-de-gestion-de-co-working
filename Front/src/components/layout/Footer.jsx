function Footer() {
    return (
        <footer id="contacto">
            <div className="footer-info">
                <p>
                <i className="fas fa-phone-alt me-2"></i> +56 9 1234 5678
                </p>
                <p>
                <i className="fas fa-envelope me-2"></i> contacto@jaffacowork.com
                </p>
                <p>
                <i className="fas fa-map-marker-alt me-2"></i> Av. Alameda Libertador
                Bernardo O'Higgins 1255, Santiago
                </p>
            </div>
            <div className="footer-social">
                <a href="#" aria-label="Síguenos en Instagram">
                <i className="fab fa-instagram"></i>
                </a>
                <a href="#" aria-label="Síguenos en Facebook">
                <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" aria-label="Síguenos en LinkedIn">
                <i className="fab fa-linkedin-in"></i>
                </a>
            </div>
            <div className="footer-bottom">
                <a href="#">Política de Privacidad</a>
                <p>&copy; 2026 WorkHub CoWork | Colmena Code Generation23.</p>
            </div>
        </footer>
    );
}

export default Footer;
