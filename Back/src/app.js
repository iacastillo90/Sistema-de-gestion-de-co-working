const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// ─── Middlewares propios ──────────────────────────────────────────────────────
// auth verifica el token JWT en cada petición a rutas protegidas
const auth = require("./middlewares/auth");

// ─── Rutas ────────────────────────────────────────────────────────────────────
// Rutas públicas (no requieren token)
const userRoutes = require("./routes/users.routes");

// Rutas protegidas (requieren token JWT válido)
const spaceRoutes = require("./routes/space.routes");
const reservationsRoutes = require("./routes/reservations.routes");
const reviewRoutes = require("./routes/review.routes");
const paymentsRoutes = require("./routes/payments.routes");
const locationRoutes = require("./routes/location.routes");
const cardsRoutes = require("./routes/cards.routes");
const supportRoutes = require("./routes/support.routes");
const invoicesRoutes = require("./routes/invoices.routes");

const app = express();

// ─── Middlewares globales ─────────────────────────────────────────────────────
app.use(cors());          // Habilita CORS para peticiones del frontend (Vite :5173)
app.use(express.json());  // Parsea el body de las peticiones como JSON
app.use(morgan("dev"));   // Muestra en consola cada petición HTTP recibida

// ─── Rutas públicas ───────────────────────────────────────────────────────────
// Registro y login no requieren autenticación
app.use("/api/users", userRoutes);

// ─── Rutas protegidas ─────────────────────────────────────────────────────────
// Todas las rutas siguientes pasan primero por el middleware `auth`.
// Internamente, cada router aplica también su propio middleware de validación
// (validateSpace, validateReservation, validateReview, validatePayment).
// ─── Rutas (Protección delegada o pública) ───────────────────────────
app.use("/api/spaces",       spaceRoutes);
app.use("/api/locations",    locationRoutes);

// ─── Rutas protegidas (Globales) ──────────────────────────────────────
app.use("/api/reservations", auth, reservationsRoutes);
app.use("/api/reviews",      auth, reviewRoutes);
app.use("/api/payments",     auth, paymentsRoutes);
app.use("/api/cards",        auth, cardsRoutes);
app.use("/api/support",      auth, supportRoutes);
app.use("/api/invoices",     auth, invoicesRoutes);

// ─── Manejador global de errores ──────────────────────────────────────────────
// Debe ir siempre al final, después de todas las rutas
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Error Interno del Servidor" });
});

module.exports = app;