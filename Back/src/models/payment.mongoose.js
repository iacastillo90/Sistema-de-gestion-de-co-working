const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  reservation_id: { type: String, required: true },
  monto:          { type: Number, required: true },
  metodo_pago:    { type: String, required: true },
  fecha_pago:     { type: String, required: true },
  estado: {
    type: String,
    required: true,
    enum: ["Pendiente", "En Revisión", "Completado"],
    default: "Pendiente",
  },
  // ID de la tarjeta Card usada para pagar (opcional, null si fue otro método)
  card_id: { type: String, default: null },
}, {
  timestamps: true,
});

const Payment = mongoose.model("Payment", paymentSchema);

const getAllPayments = async () => {
  return await Payment.find();
};

const getPaymentById = async (id) => {
  return await Payment.findById(id);
};

const createPayment = async (data) => {
  const payment = new Payment(data);
  return await payment.save();
};

const updatePayment = async (id, data) => {
  return await Payment.findByIdAndUpdate(id, data, { new: true });
};

const deletePayment = async (id) => {
  return await Payment.findByIdAndDelete(id);
};

module.exports = {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment
};
