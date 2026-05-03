import './Register.css';
import { useState } from 'react';
import { registerUser } from '../../services/api';

import RegisterForm from './components/RegisterForm';
import RegisterSuccess from './components/RegisterSuccess';

function Register() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        setLoading(true);
        try {
            await registerUser({ nombre, email, password });
            setSuccess(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                {success ? (
                    <RegisterSuccess />
                ) : (
                    <RegisterForm 
                        nombre={nombre}
                        setNombre={setNombre}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        confirmPassword={confirmPassword}
                        setConfirmPassword={setConfirmPassword}
                        handleSubmit={handleSubmit}
                        loading={loading}
                        error={error}
                    />
                )}
            </div>
        </div>
    );
}

export default Register;
