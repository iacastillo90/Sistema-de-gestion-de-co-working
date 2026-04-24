<<<<<<< HEAD
=======

>>>>>>> origin/migracionAlex
const express = require("express");
const morgan = require("morgan")
const spaceRoutes = require("./routes/space.routes");
const reservationsRoutes = require("./routes/reservations.routes");
const reviewRoutes = require("./routes/review.routes");
<<<<<<< HEAD
=======
const userRoutes = require("./routes/users.router");
const auth = require("./middlewares/auth");


>>>>>>> origin/migracionAlex

const app = express();

//Middlewares
app.use(express.json());  // Middlewares Incorporado en Express.js
app.use(morgan("dev"));   // Middlewares de Terceros

//Rutas de Space
app.use("/api/spaces", spaceRoutes);

//Rutas de Reservations
app.use("/api/reservations", reservationsRoutes);

//Rutas de Reviews
app.use("/api/reviews", reviewRoutes);


<<<<<<< HEAD
=======
//Rutas de Gestion de usuario
app.use("/api/users", userRoutes);
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Error Interno del Servidor" });
});

>>>>>>> origin/migracionAlex
module.exports = app;