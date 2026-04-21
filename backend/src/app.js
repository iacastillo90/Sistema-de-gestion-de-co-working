const express = require('express');
const morgan = require('morgan');
const spaceRoutes = require('./routers/space.routes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

// Ruta básica
app.use('/space', spaceRoutes);

module.exports = app;
