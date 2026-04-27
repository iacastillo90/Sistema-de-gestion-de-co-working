function TeamMemberCard({ img, rol, name }) {
    
    return (
        <article className="team-member">
            <img src={img} alt="Ivan" />
            <div>
                <p className="role">{rol}</p>
                <p className="name">{name}</p>
            </div>
        </article>
    );
}

export default TeamMemberCard;
