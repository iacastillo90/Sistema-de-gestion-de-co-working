const express = require("express");
const spaceRoutes = require("./routes/space.routes");
const reservationsRoutes = require("./routes/reservations.routes");

const app = express();

app.use(express.json());

//Rutas de Space
app.use("/api/space", spaceRoutes);

//Rutas de Reservations
app.use("/api/reservations", reservationsRoutes);


module.exports = app;