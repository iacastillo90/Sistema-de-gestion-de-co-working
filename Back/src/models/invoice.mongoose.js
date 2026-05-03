const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  user_id: { type: String, required: true, index: true },
  reservation_id: { type: String, required: true },
  payment_id: { type: String, required: true },
  descripcion: { type: String, required: true },
  cantidad_horas: { type: Number, required: true },
  precio_por_hora: { type: Number, required: true },
  monto_total: { type: Number, required: true },
  estado: {
    type: String,
    enum: ["Emitida", "Anulada"],
    default: "Emitida",
  },
}, {
  timestamps: true,
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

const getInvoicesByUser = async (userId) => {
  return await Invoice.find({ user_id: userId }).sort({ createdAt: -1 });
};

const getAllInvoices = async () => {
  return await Invoice.find().sort({ createdAt: -1 });
};

const getInvoiceById = async (id) => {
  return await Invoice.findById(id);
};

const createInvoice = async (data) => {
  const invoice = new Invoice(data);
  return await invoice.save();
};

module.exports = {
  getInvoicesByUser,
  getAllInvoices,
  getInvoiceById,
  createInvoice,
};
