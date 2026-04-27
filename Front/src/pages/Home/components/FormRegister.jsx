import imgForm from "../../../assets/img/jpg/coworking.jpg";
import { useState } from "react";

function FormRegister () {

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [telefono, setTelefono] = useState("+56");

    const [registroExitoso, setRegistroExitoso] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault(); 
        const nuevoUsuario = { nombre, email, password, telefono };
        console.log("¡Nuevo usuario registrado!", nuevoUsuario);

        setRegistroExitoso(true);
    };

    return(
        <section id="registro" aria-labelledby="registro-title">
            
            <div className="registro-imagen">
                <img
                    src={imgForm}
                    alt="Únete a la comunidad WorkHub"
                />
            </div>

            <div className="registro-formulario">
                
                {registroExitoso ? (

                    <div className="success-message text-center">
                        <h2>¡Registro Exitoso! 🎉</h2>
                        <p>¡Bienvenido, {nombre}!</p>
                        <p>Tu cuenta ha sido creada exitosamente.</p>
                        <button className="btn btn-primary mt-3" onClick={() => window.location.reload()}>
                            Volver al inicio
                        </button>
                    </div>

                ) : (

                    <>
                        <h2 id="registro-title">
                        ¡Únete a JAFFA Co-Work y cambia la manera de trabajar!
                        </h2>
                        <p className="registro-desc">
                        Completa el siguiente formulario para comenzar
                        </p>

                        <form id="form-registro" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nombre"
                                    placeholder="Ingresa tu nombre"
                                    required
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Correo electrónico</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="ejemplo@email.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    minLength="8"
                                    placeholder="Mínimo 8 caracteres"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="telefono" className="form-label">Teléfono</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="telefono"
                                    pattern="^\+56[0-9]{9}$"
                                    placeholder="+56912345678"
                                    required
                                    value={telefono}
                                    onChange={(e) => setTelefono(e.target.value)}
                                />
                                <small className="text-muted">Formato: +569XXXXXXXX</small>
                            </div>

                            <button type="submit" className="btn btn-primary">Registrarse</button>
                        </form>
                    </>
                )}
            </div>
        </section>
    );
}

export default FormRegister;