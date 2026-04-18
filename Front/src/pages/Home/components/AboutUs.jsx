import FeatureCard from "../../../components/common/FeatureCard";
import InfoCard from "../../../components/common/InfoCard";
import MiniCta from "../../../components/common/MiniCta";
import TeamMemberCard from "./TeamMemberCard";
import imgAlex from "../../../assets/img/jpg/alex.jpg";
import imgAndrea from "../../../assets/img/jpg/fotoandrea.jpg.PNG";
import imgFelipe from "../../../assets/img/png/mifotooriginl.png";
import HeroMedia from "../../../components/common/HeroMedia";
import imgIvan from "../../../assets/img/jpg/ivan.jpeg";
import imgJuanPablo from "../../../assets/img/jpg/Juan Pablo.jpeg";
import imgMaria from "../../../assets/img/jpg/fernanda.jpg";

function AboutUs () {

    const teamData = [
        { id: 1, name: "Ivan", rol: "Product Owner", img: imgIvan },
        { id: 2, name: "Juan Pablo", rol: "Scrum Master", img: imgJuanPablo },
        { id: 3, name: "Alex", rol: "Developer", img: imgAlex },
        { id: 4, name: "Maria", rol: "Developer", img: imgMaria },
        { id: 5, name: "Felipe", rol: "Developer", img: imgFelipe },
        { id: 6, name: "Andrea", rol: "Developer", img: imgAndrea },
    ];

    const featureData = [
        {   id: 1,
            icon: "👑",
            title: "Líderes pioneros",
            description: "Guiamos proyectos con visión, experiencia y acompañamiento cercano para lograr resultados reales."
        },
        {   id: 2,
            icon: "🧩",
            title: "Flexibilidad a tu medida",
            description: "Planes adaptables para tu ritmo de trabajo."
        },
        {   id: 3,
            icon: "🤝",
            title: "Comunidad conectada",
            description: "Networking y colaboración que generan valor."
        },
        {   id: 4,
            icon: "📈",
            title: "Tu crecimiento es prioridad",
            description: "Te acompañamos para escalar con foco, orden y objetivos claros."
        }
    ];

    const infoData = [
        {   id: 1,
            title: "Tecnología que simplifica",
            description: "Plataforma intuitiva, automatización de reservas y datos en tiempo real."
        },
        {   id: 2,
            title: "A quién acompañamos",
            description: "Freelancers, startups y equipos en crecimiento."
        },
        {   id: 3,
            title: "Lo que nos representa",
            description: "Confianza, colaboración e innovación constante."
        }
    ];

    return(
        <section id="sobre-nosotros" aria-labelledby="about-title">
            <div className="container py-5">
                <HeroMedia />

                <div className="about-content mt-5 px-3">
                    
                    <div className="top-row mb-5">
                        <div className="about-text">
                            <h2 id="about-title" className="fw-bold mb-4">Sobre Nosotros:</h2>
                            <div className="mision">
                                <h3 className="h4 mb-3">
                                Simplificar la gestión de espacios de trabajo compartido.
                                </h3>
                                <p className="text-muted">
                                Creamos experiencias claras, rápidas y enfocadas en
                                resultados. Diseñamos lugares y herramientas donde trabajar
                                se siente simple: reservas sin fricción, comunidad activa y
                                acompañamiento.
                                </p>
                            </div>
                        </div>

                        <div className="info-grid">
                            {infoData.map((info) => (
                                <InfoCard
                                    key={info.id}
                                    title={info.title}
                                    description={info.description}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="bottom-row mb-5">
                        <aside className="team-block" aria-labelledby="team-title">
                            <h3 id="team-title" className="fw-bold mb-3">Team</h3>
                            <div className="team-grid" aria-label="Integrantes del equipo">
                                {teamData.map((member) => (
                                    <TeamMemberCard
                                        key={member.id}
                                        name={member.name}
                                        rol={member.rol}
                                        img={member.img}
                                    />
                                ))}
                            </div>
                        </aside>

                        <div className="feature-block " aria-label="Pilares estratégicos" >
                            {featureData.map((feature) => (
                                <FeatureCard
                                    key={feature.id}
                                    icon={feature.icon}
                                    title={feature.title}
                                    description={feature.description}
                                />
                            ))}
                        </div>
                    </div>

                    <MiniCta
                        subtitle="¿Listo para transformar tu forma de trabajar?"
                        title="Únete a Co-Work y descubre un nuevo mundo de posibilidades."
                        link="#registro"
                        textButton="Explora nuestros espacios y servicios"
                    />
                </div>
            </div>
        </section>
    );
}

export default AboutUs;