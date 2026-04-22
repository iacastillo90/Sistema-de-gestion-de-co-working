import SpaceCard from "../../../components/spaces/SpaceCard.jsx";
import imgFlex from "../../../assets/img/jpg/coworking.jpg";
import imgFullTime from "../../../assets/img/jpg/oficina-privada.jpg";
import imgHotDesk from "../../../assets/img/jpg/work..jpg";

function Space () {
    const listaEspacios = [
        {
            id: 1,
            nombre: "Flex",
            descripcion: "Espacio de trabajo flexible con acceso 24/7, ideal para freelancers y startups.",
            imagen: imgFlex,
            capacidad: 50,
            ubicacion: "Sala 1",
            precio: 30000,
            disponibilidad: true
        },
        {
            id: 2,
            nombre: "Hot Desk",
            descripcion: "Área común con escritorios compartidos, perfecta para quienes buscan un ambiente dinámico.",
            imagen: imgHotDesk, 
            capacidad: 30,
            ubicacion: "Sala 2",
            precio: 20000,
            disponibilidad: true 
        },
        {
            id: 3,
            nombre: "Full Time",
            descripcion: "¡Tu espacio, siempre tuyo! Un puesto de trabajo dedicado en nuestra comunidad.",
            imagen: imgFullTime,
            capacidad: 60,
            ubicacion: "Sala 3",
            precio: 40000,
            disponibilidad: true
        }
    ];

    return(
        <section id="espacios" aria-labelledby="espacios-title">
            <div className="container py-5">
                <h2 id="espacios-title" className="text-center mb-5 fw-bold">
                    Nuestros Espacios
                </h2>
        
                <div className="row g-4">
                    {listaEspacios.map((espacioPublico) => {
                        return(
                            <SpaceCard 
                                key={espacioPublico.id} 
                                espacio={espacioPublico} 
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default Space;