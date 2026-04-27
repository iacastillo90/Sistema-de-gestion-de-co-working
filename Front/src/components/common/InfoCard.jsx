function InfoCard ({title, description}) {

    return(
        <div className="info-card">
            <h3 className="h6 fw-bold">{title}</h3>
            <p>
                {description}
            </p>
        </div>
    );
}

export default InfoCard;