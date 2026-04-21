import '../../assets/css/App.css';
import HeroMemberships from './components/HeroMemberships';
import MembershipsCard from './components/MembreshipCard';

function Memberships() {
    
    const membershipData = [
        {  id: 1,
            imgOffice: "./assets/img/jpg/oficina-privada.jpg",
            title: "OFICINA PRIVADA",
            capacity: "3 - 8",
            features: [
                "Acceso: 24/7",
                "Sala de reuniones: 20 h",
                "Wifi, café e impresoras"
            ],
            titleBack: "Privacidad Total",
            descriptionBack: "Espacios cerrados y amoblados diseñados para equipos que requieren confidencialidad."
        },
        {   id: 2,
            imgOffice: "./assets/img/jpg/oficina-privada.jpg",
            title: "HOT DESK",
            capacity: "30",
            features: [
                "Acceso: Ilimitado",
                "Sala de reuniones: 10 h",
                "Comunidad Co-Work"
            ],
            titleBack: "Flexibilidad Pura",
            descriptionBack: "Ideal para freelancers que buscan un lugar inspirador sin puestos fijos."
        },
        {   id: 3,
            imgOffice: "./assets/img/jpg/oficina-privada.jpg",
            title: "DEDICATED DESK",
            capacity: "1",
            features: [
                "Acceso: 24/7",
                "Sala de reuniones: 15 h",
                "Locker personal"
            ],
            titleBack: "Dedicado Total",
            descriptionBack: "Tu espacio fijo dentro de un ambiente colaborativo, con acceso exclusivo."
        },
        {   id: 4,
            imgOffice: "./assets/img/jpg/oficina-privada.jpg",
            title: "SALA DE REUNIONES",
            capacity: "N/A",
            features: [
                "Acceso: 24/7",
                "Sala de reuniones: 10 h",
                "Equipos de videoconferencia"
            ],
            titleBack: "Reuniones Profesionales",
            descriptionBack: "Espacios diseñados para facilitar reuniones efectivas con tecnología de vanguardia."

        },
        {   id: 5,
            imgOffice: "./assets/img/jpg/oficina-privada.jpg",
            title: "EVENTOS Y WORKSHOPS",
            capacity: "N/A",
            features: [
                "Acceso: Según evento",
                "Sala de reuniones: Según evento",
                "Catering y soporte técnico"
            ],
            titleBack: "Espacios para Crecer",
            descriptionBack: "Salas versátiles para eventos, capacitaciones y networking con servicios personalizados."
        },
        {   id: 6,
            imgOffice: "./assets/img/jpg/oficina-privada.jpg",
            title: "OFICINA VIRTUAL",
            capacity: "N/A",
            features: [
                "Acceso: 24/7",
                "Sala de reuniones: 10 h",
                "Equipos de videoconferencia"
            ],
            titleBack: "Trabajo Remoto Eficiente",
            descriptionBack: "Espacios diseñados para facilitar el trabajo remoto con acceso a todas las herramientas necesarias."
        }
    ];

    return(
        <>
            <HeroMemberships />

            <section id="planes" className="py-5 bg-light">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="display-5 fw-bold">
                            Nuestros <span className="text-danger">Planes</span>
                        </h2>
                        <p className="text-secondary">
                            Encuentra el espacio ideal para tu crecimiento profesional.
                        </p>
                    </div>

                    <div className="row g-4">

                        {membershipData.map((membership) => (
                            <MembershipsCard
                                key={membership.id}
                                imgOffice={membership.imgOffice}
                                title={membership.title}
                                capacity={membership.capacity}
                                features={membership.features} 
                                titleBack={membership.titleBack}
                                descriptionBack={membership.descriptionBack}
                            />
                        ))}

                    </div>
                </div>
            </section>
        </>
    );
}

export default Memberships;