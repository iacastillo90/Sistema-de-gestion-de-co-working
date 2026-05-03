/**
 * useDarkMode.js
 *
 * Hook compartido de dark mode.
 * Persiste la preferencia en localStorage con la clave 'darkMode'.
 * Aplica/remueve la clase 'dark-mode' en document.body.
 *
 * Usado por:
 *   - Header.jsx (MainLayout — páginas públicas)
 *   - Sidebar.jsx (DashboardLayout — páginas privadas)
 *
 * Ambos componentes leen y escriben en el mismo localStorage key,
 * por lo que la preferencia se mantiene entre sesiones y layouts.
 */

import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

export function useDarkMode() {
  const [darkMode, setDarkMode] = useState(() => {
    // Inicializar desde localStorage (preserva preferencia entre páginas)
    return storage.get('darkMode') === 'true' || storage.get('darkMode') === true;
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    storage.set('darkMode', String(darkMode));
  }, [darkMode]);

  const toggle = () => setDarkMode(prev => !prev);

  return { darkMode, toggle };
}
