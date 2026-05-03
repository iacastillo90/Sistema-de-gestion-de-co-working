/**
 * router/index.jsx
 *
 * Fuente única de verdad para el enrutamiento de la aplicación.
 * Organizado en tres capas:
 *   1. Rutas públicas  — MainLayout (Header + Footer)
 *   2. Rutas privadas  — DashboardLayout (Sidebar), cualquier usuario autenticado
 *   3. Rutas admin     — sub-árbol protegido con requiredRole="admin"
 *
 * Mejoras aplicadas:
 *   - NotFound ("*") movido al nivel raíz para capturar TODAS las rutas desconocidas
 *     (incluyendo rutas privadas inexistentes, ej. /dashboard/xxx).
 *   - Importaciones agrupadas por dominio para mayor legibilidad.
 *   - Ruta "admin/reservas" (listado) añadida al árbol admin para consistencia.
 */

import { createBrowserRouter } from 'react-router-dom';

// ── Layouts ──────────────────────────────────────────────────────────────────
import MainLayout      from '../layouts/MainLayout.jsx';
import DashboardLayout from '../layouts/DashboardLayout.jsx';

// ── Guards ────────────────────────────────────────────────────────────────────
import ProtectedRoute from '../components/common/ProtectedRoute.jsx';

// ── Páginas públicas ──────────────────────────────────────────────────────────
import Home        from '../pages/Home/Home.jsx';
import Login       from '../pages/Login/Login.jsx';
import Register    from '../pages/Register/Register.jsx';
import Memberships from '../pages/Memberships/Memberships.jsx';
import NotFound    from '../pages/NotFound/NotFound.jsx';
import SedeChile      from '../pages/Sedes/SedeChile.jsx';
import SedeColombia   from '../pages/Sedes/SedeColombia.jsx';
import SedeEEUU       from '../pages/Sedes/SedeEEUU.jsx';
import SalasReunion   from '../pages/Soluciones/SalasReunion.jsx';

// ── Páginas privadas (usuario autenticado) ────────────────────────────────────
import Dashboard         from '../pages/Dashboard/Dashboard.jsx';
import Spaces            from '../pages/Spaces/Spaces.jsx';
import SpaceDetail       from '../pages/Spaces/SpaceDetail.jsx';
import Reservations      from '../pages/Reservations/Reservations.jsx';
import NewReservation    from '../pages/Reservations/NewReservation.jsx';
import ReservationDetail from '../pages/Reservations/ReservationDetail.jsx';
import Reviews           from '../pages/Reviews/Reviews.jsx';
import ReviewDetail      from '../pages/Reviews/ReviewDetail.jsx';
import Payments          from '../pages/Payments/Payments.jsx';
import PaymentDetail     from '../pages/Payments/PaymentDetail.jsx';
import Support           from '../pages/Support/Support.jsx';
import SupportDetail     from '../pages/Support/SupportDetail.jsx';
import Settings          from '../pages/Settings/Settings.jsx';

// ── Páginas de administración ─────────────────────────────────────────────────
import AdminLocations          from '../pages/Admin/AdminLocations.jsx';
import AdminSpaces             from '../pages/Admin/AdminSpaces.jsx';
import AdminSpaceDetail        from '../pages/Admin/AdminSpaceDetail.jsx';
import AdminReservationDetail  from '../pages/Admin/AdminReservationDetail.jsx';
import AdminPayments           from '../pages/Admin/AdminPayments.jsx';
import AdminPaymentDetail      from '../pages/Admin/AdminPaymentDetail.jsx';
import AdminReviews            from '../pages/Admin/AdminReviews.jsx';
import AdminReviewDetail       from '../pages/Admin/AdminReviewDetail.jsx';
import AdminSupport            from '../pages/Admin/AdminSupport.jsx';
import AdminSupportDetail      from '../pages/Admin/AdminSupportDetail.jsx';
import AdminUsers              from '../pages/Admin/AdminUsers.jsx';

// ─────────────────────────────────────────────────────────────────────────────

export const router = createBrowserRouter([
  // ── 1. Rutas públicas ──────────────────────────────────────────────────────
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true,                        element: <Home /> },
      { path: 'login',                       element: <Login /> },
      { path: 'registro',                    element: <Register /> },
      { path: 'membresias',                  element: <Memberships /> },
      // ── Sedes ──
      { path: 'sedes/chile',                 element: <SedeChile /> },
      { path: 'sedes/colombia',              element: <SedeColombia /> },
      { path: 'sedes/eeuu',                  element: <SedeEEUU /> },
      // ── Soluciones ──
      { path: 'soluciones/salas-reunion',    element: <SalasReunion /> },
    ],
  },

  // ── 2. Rutas privadas ──────────────────────────────────────────────────────
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          // ── Núcleo ──
          { path: 'dashboard',        element: <Dashboard /> },

          // ── Espacios ──
          { path: 'espacios',         element: <Spaces /> },
          { path: 'espacios/:id',     element: <SpaceDetail /> },

          // ── Reservas ──
          { path: 'reservas',         element: <Reservations /> },
          { path: 'reservas/nueva',   element: <NewReservation /> },
          { path: 'reservas/:id',     element: <ReservationDetail /> },

          // ── Reseñas ──
          { path: 'reseñas',          element: <Reviews /> },
          { path: 'reseñas/:id',      element: <ReviewDetail /> },

          // ── Pagos ──
          { path: 'pagos',            element: <Payments /> },
          { path: 'pagos/:id',        element: <PaymentDetail /> },

          // ── Soporte ──
          { path: 'soporte',          element: <Support /> },
          { path: 'soporte/:id',      element: <SupportDetail /> },

          // ── Cuenta ──
          { path: 'configuracion',    element: <Settings /> },

          // ── 3. Sub-árbol Admin (solo rol "admin") ───────────────────────────
          {
            element: <ProtectedRoute requiredRole="admin" />,
            children: [
              { path: 'admin/sedes',            element: <AdminLocations /> },
              { path: 'admin/espacios',         element: <AdminSpaces /> },
              { path: 'admin/espacios/:id',     element: <AdminSpaceDetail /> },
              { path: 'admin/reservas/:id',     element: <AdminReservationDetail /> },
              { path: 'admin/pagos',            element: <AdminPayments /> },
              { path: 'admin/pagos/:id',        element: <AdminPaymentDetail /> },
              { path: 'admin/reseñas',          element: <AdminReviews /> },
              { path: 'admin/reseñas/:id',      element: <AdminReviewDetail /> },
              { path: 'admin/soporte',          element: <AdminSupport /> },
              { path: 'admin/soporte/:id',      element: <AdminSupportDetail /> },
              { path: 'admin/usuarios',         element: <AdminUsers /> },
            ],
          },
        ],
      },
    ],
  },

  // ── 4. Catch-all — captura cualquier ruta no definida ─────────────────────
  { path: '*', element: <NotFound /> },
]);