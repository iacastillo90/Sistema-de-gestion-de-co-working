const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controllers');
const { validateReview } = require('../middlewares/validateReview');

// Rutas de obtención
router.get('/', reviewController.getAll);
router.get('/:id', reviewController.getById);

// Rutas de creación/modificación (requieren pasar por el middleware de validación)
router.post('/', validateReview, reviewController.create);
router.put('/:id', validateReview, reviewController.update);

// Ruta de eliminación
router.delete('/:id', reviewController.remove);

module.exports = router;
