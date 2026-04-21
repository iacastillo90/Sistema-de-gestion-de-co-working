const express = require("express");
const morgan = require("morgan")
const spaceRoutes = require("./routes/space.routes");
const reservationsRoutes = require("./routes/reservations.routes");

const app = express();

//Middlewares
app.use(express.json());  // Middlewares Incorporado en Express.js
app.use(morgan("dev"));   // Middlewares de Terceros

//Rutas de Space
app.use("/api/spaces", spaceRoutes);

//Rutas de Reservations
app.use("/api/reservations", reservationsRoutes);


module.exports = app;