function FeatureCard ({icon, title, description}) {

    return(
        <article className="feature-item">
            <span className="icon-bubble" aria-hidden="true">{icon}</span>
            <h4>{title}</h4>
            <p>
                {description}
            </p>
        </article>
    );
}

export default FeatureCard;