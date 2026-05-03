/**
 * MainLayout.jsx
 *
 * Layout para rutas públicas: Header + contenido de ruta + Footer.
 * Incluye ScrollToTop para restaurar la posición del scroll al navegar
 * entre páginas (comportamiento esperado en SPAs con React Router).
 */

import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';

/** Restaura el scroll al inicio en cada cambio de ruta. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function MainLayout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;