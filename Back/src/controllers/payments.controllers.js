const {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
} = require('../models/payments.models');

// ─── GET /api/payments ────────────────────────────────────────────────────────
// Retorna la lista completa de todos los pagos registrados
const getAllPaymentsController = async (req, res, next) => {
  try {
    const payments = await getAllPayments();
    res.status(200).json(payments);
  } catch (error) {
    // Delegamos el error al manejador global de errores en app.js
    next(error);
  }
};

// ─── GET /api/payments/:id ────────────────────────────────────────────────────
// Busca un pago por su ID; responde 404 si no existe
const getPaymentByIdController = async (req, res, next) => {
  try {
    // Convertimos el parámetro de ruta a número para comparar con los IDs del array
    const id = Number(req.params.id);
    const payment = await getPaymentById(id);

    if (!payment) {
      return res.status(404).json({ message: `Pago con ID ${id} no encontrado.` });
    }

    res.status(200).json(payment);
  } catch (error) {
    next(error);
  }
};

// ─── POST /api/payments ───────────────────────────────────────────────────────
// Crea un nuevo pago con los datos del body (ya validados por el middleware)
const createPaymentController = async (req, res, next) => {
  try {
    const newPayment = await createPayment(req.body);

    // Respondemos con 201 Created para indicar que el recurso fue creado exitosamente
    res.status(201).json(newPayment);
  } catch (error) {
    next(error);
  }
};

// ─── PUT /api/payments/:id ────────────────────────────────────────────────────
// Actualiza los datos de un pago existente; responde 404 si el ID no existe
const updatePaymentController = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const updatedPayment = await updatePayment(id, req.body);

    if (!updatedPayment) {
      return res.status(404).json({ message: `Pago con ID ${id} no encontrado.` });
    }

    res.status(200).json(updatedPayment);
  } catch (error) {
    next(error);
  }
};

// ─── DELETE /api/payments/:id ─────────────────────────────────────────────────
// Elimina un pago por ID; responde 404 si no existe y retorna el objeto eliminado
const deletePaymentController = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const deletedPayment = await deletePayment(id);

    if (!deletedPayment) {
      return res.status(404).json({ message: `Pago con ID ${id} no encontrado.` });
    }

    res.status(200).json({
      message: `Pago con ID ${id} eliminado correctamente.`,
      payment: deletedPayment,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPaymentsController,
  getPaymentByIdController,
  createPaymentController,
  updatePaymentController,
  deletePaymentController,
};
