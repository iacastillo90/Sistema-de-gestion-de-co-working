import { useState } from 'react';
import { updateUser } from '../../services/api';
import './Settings.css';

import { SettingsHeader } from './components/SettingsHeader';
import { ProfileForm } from './components/ProfileForm';
import { SecurityInfo } from './components/SecurityInfo';

function Settings() {
  const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
  
  const [form, setForm] = useState({
    nombre: authUser.nombre || authUser.name || '',
    email: authUser.email || '',
    password: '' // Solo se envía si se quiere cambiar
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const initial = (form.nombre || form.email || 'U').charAt(0).toUpperCase();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const dataToUpdate = {
        nombre: form.nombre,
        email: form.email
      };
      
      // Si el usuario ingresó una contraseña, la incluimos
      if (form.password) {
        dataToUpdate.password = form.password;
      }

      const res = await updateUser(authUser.id, dataToUpdate);
      
      // Actualizamos el token y la data local con el nuevo token que manda el backend
      if (res.token) {
        localStorage.setItem("token", res.token);
        const payload = JSON.parse(atob(res.token.split('.')[1]));
        localStorage.setItem("authUser", JSON.stringify(payload));
      }
      
      setSuccess('Perfil actualizado correctamente. Los cambios en el menú se aplicarán si recargas o navegas.');
      setForm(prev => ({ ...prev, password: '' })); // clear pass field
    } catch (err) {
      setError(err.message || 'Error actualizando el perfil');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <SettingsHeader />

      <div className="row">
        <ProfileForm 
          form={form} 
          setForm={setForm} 
          handleSubmit={handleSubmit} 
          loading={loading} 
          error={error} 
          success={success} 
          initial={initial} 
          authUser={authUser} 
        />

        <SecurityInfo />
      </div>
    </div>
  );
}

export default Settings;
