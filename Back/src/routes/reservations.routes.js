const express = require('express');
const router = express.Router();

// Importa el controlador y el middleware
const reservationsController = require('../controllers/reservations.controllers');
const validateReservation = require('../middlewares/validateReservation');

// Define las rutas para el CRUD de Reservations
// GET /api/reservations/
router.get('/', reservationsController.getAllReservations);

// GET /api/reservations/:id
router.get('/:id', reservationsController.getReservationById);

// POST /api/reservations/ (requiere validación)
router.post('/', validateReservation, reservationsController.createReservation);

// PUT /api/reservations/:id (requiere validación)
router.put('/:id', validateReservation, reservationsController.updateReservation);

// DELETE /api/reservations/:id
router.delete('/:id', reservationsController.deleteReservation);

// Exporta el enrutador
module.exports = router;