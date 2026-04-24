const { Router } = require('express');

// Importamos los controladores y el middleware de validación
const {
  getAllPaymentsController,
  getPaymentByIdController,
  createPaymentController,
  updatePaymentController,
  deletePaymentController,
} = require('../controllers/payments.controllers');

const validatePayment = require('../middlewares/validatePayment');

const router = Router();

// ─── Definición de rutas ──────────────────────────────────────────────────────

// Obtener todos los pagos
router.get('/', getAllPaymentsController);

// Obtener un pago específico por su ID
router.get('/:id', getPaymentByIdController);

// Crear un nuevo pago (el middleware valida el body antes de llegar al controlador)
router.post('/', validatePayment, createPaymentController);

// Actualizar un pago existente (también requiere validación del body)
router.put('/:id', validatePayment, updatePaymentController);

// Eliminar un pago por su ID
router.delete('/:id', deletePaymentController);

module.exports = router;
