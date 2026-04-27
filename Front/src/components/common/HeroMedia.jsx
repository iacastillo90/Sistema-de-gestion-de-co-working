import imgHero from '../../assets/img/png/1696536427-coworking-spaces-hybrid-world-1023-g1437209221.png';
function HeroMedia() {
    return (
    <figure className="hero-media mx-3" aria-hidden="true">
        <img
            className="hero-image"
            src={imgHero}
            alt="Personas colaborando en el coworking"
        />
        <figcaption className="hero-brand">Co-Work</figcaption>
        </figure>
    );
}

export default HeroMedia;
