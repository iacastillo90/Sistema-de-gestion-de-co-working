import "../../assets/css/App.css";

function MiniCta ({ subtitle, title, link, textButton }) {

    return(
            <div className="mini-cta">
                <p className="mini-cta-kicker text-muted fw-bold">
                    {subtitle}
                </p>
                <h2 className="mini-cta-title">
                    {title}
                </h2>
                <a 
                    href={link}
                    className="mini-cta-btn mt-2"
                >
                    {textButton}
                </a>
            </div>           
    );
}

export default MiniCta;