/**
 * ProtectedRoute.jsx
 *
 * Guard de rutas que protege dos capas:
 *   1. Sin token  → redirige a /login
 *   2. Con rol requerido pero diferente → redirige a /dashboard
 *
 * Mejoras:
 *   - Validación de expiración del JWT (campo `exp`) para no depender
 *     solo de la presencia del token en localStorage.
 *   - Limpieza automática de localStorage cuando el token ha expirado.
 *   - Mensajes de error silenciosos; cualquier token malformado redirige a /login.
 */

import { Navigate, Outlet } from 'react-router-dom';

/**
 * Decodifica el payload de un JWT sin dependencias externas.
 * Retorna null si el token es inválido o ha expirado.
 */
function decodeToken(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    // Verificar expiración si el campo `exp` existe
    if (payload.exp && Date.now() / 1000 > payload.exp) {
      return null; // Token expirado
    }
    return payload;
  } catch {
    return null; // Token malformado
  }
}

function ProtectedRoute({ requiredRole }) {
  const token = localStorage.getItem('token');

  // Sin token → login
  if (!token) return <Navigate to="/login" replace />;

  const payload = decodeToken(token);

  // Token inválido o expirado → limpiar storage y redirigir
  if (!payload) {
    localStorage.removeItem('token');
    localStorage.removeItem('authUser');
    return <Navigate to="/login" replace />;
  }

  // Rol insuficiente → redirigir al dashboard (no al login, el usuario sí está autenticado)
  if (requiredRole && payload.rol !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;