const {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
} = require('../models/payment.mongoose');

// ─── GET /api/payments ────────────────────────────────────────────────────────
const getAllPaymentsController = async (req, res, next) => {
  try {
    const payments = await getAllPayments();
    res.status(200).json(payments);
  } catch (error) {
    next(error);
  }
};

// ─── GET /api/payments/:id ────────────────────────────────────────────────────
const getPaymentByIdController = async (req, res, next) => {
  try {
    const payment = await getPaymentById(req.params.id);

    if (!payment) {
      return res.status(404).json({ message: `Pago no encontrado.` });
    }

    res.status(200).json(payment);
  } catch (error) {
    next(error);
  }
};

// ─── POST /api/payments ───────────────────────────────────────────────────────
const createPaymentController = async (req, res, next) => {
  try {
    const newPayment = await createPayment(req.body);
    res.status(201).json(newPayment);
  } catch (error) {
    next(error);
  }
};

// ─── PUT /api/payments/:id ────────────────────────────────────────────────────
const updatePaymentController = async (req, res, next) => {
  try {
    const updatedPayment = await updatePayment(req.params.id, req.body);

    if (!updatedPayment) {
      return res.status(404).json({ message: `Pago no encontrado.` });
    }

    res.status(200).json(updatedPayment);
  } catch (error) {
    next(error);
  }
};

// ─── DELETE /api/payments/:id ─────────────────────────────────────────────────
const deletePaymentController = async (req, res, next) => {
  try {
    const deletedPayment = await deletePayment(req.params.id);

    if (!deletedPayment) {
      return res.status(404).json({ message: `Pago no encontrado.` });
    }

    res.status(200).json({
      message: `Pago eliminado correctamente.`,
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
