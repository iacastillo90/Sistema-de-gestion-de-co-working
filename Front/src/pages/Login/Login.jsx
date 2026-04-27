import './Login.css';
import { useState } from 'react';
import { Link } from 'react-router-dom'; 

function Login () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginExitoso, setLoginExitoso] = useState(false); 

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Intentando iniciar sesión con:", { email, password });
        
        setLoginExitoso(true); 
    }

    return (
        <div className="login-container">
            <div className="login-box">
                
                {loginExitoso ? (
                    
                    <div className="success-message text-center">
                        <h2>¡Bienvenido de vuelta! 🎉</h2>
                        <p>Has iniciado sesión correctamente con el correo:</p>
                        <p><strong>{email}</strong></p>
                        <br />
                        <Link to="/" className="btn btn-primary">Ir al Panel Principal</Link>
                    </div>

                ) : (

                    <>
                        <h2>Iniciar Sesión</h2>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email"><strong>Correo Electrónico</strong></label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Ingresa tu correo electrónico"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            /> 
                            <br /><br />

                            <label htmlFor="password"><strong>Contraseña </strong></label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Ingresa tu contraseña"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            /> 
                            <br /><br />

                            <p>
                                ¿Olvidaste tu contraseña?{' '}
                                <a href="#"><strong>Presiona aquí</strong></a>
                            </p>
                            <button type="submit">Entrar</button>
                        </form>
                    </>
                )}

            </div>
        </div>
    );
}

export default Login;