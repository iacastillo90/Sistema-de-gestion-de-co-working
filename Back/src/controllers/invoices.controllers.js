const {
  getAllInvoices,
  getInvoicesByUser,
  getInvoiceById,
  createInvoice,
} = require("../models/invoice.mongoose");

// GET /api/invoices
const getInvoices = async (req, res, next) => {
  try {
    const invoices = req.user.rol === "admin"
      ? await getAllInvoices()
      : await getInvoicesByUser(req.user.id);
    res.json(invoices);
  } catch (err) {
    next(err);
  }
};

// GET /api/invoices/:id
const getSingleInvoice = async (req, res, next) => {
  try {
    const invoice = await getInvoiceById(req.params.id);
    if (!invoice) return res.status(404).json({ message: "Factura no encontrada" });
    
    // Solo admin o el dueño pueden ver
    if (req.user.rol !== "admin" && invoice.user_id !== req.user.id) {
      return res.status(403).json({ message: "Sin acceso a esta factura" });
    }
    
    res.json(invoice);
  } catch (err) {
    next(err);
  }
};

// POST /api/invoices
const addInvoice = async (req, res, next) => {
  try {
    const {
      reservation_id,
      payment_id,
      descripcion,
      cantidad_horas,
      precio_por_hora,
      monto_total,
    } = req.body;

    const invoice = await createInvoice({
      user_id: req.user.id,
      reservation_id,
      payment_id,
      descripcion,
      cantidad_horas: Number(cantidad_horas),
      precio_por_hora: Number(precio_por_hora),
      monto_total: Number(monto_total),
    });

    res.status(201).json(invoice);
  } catch (err) {
    next(err);
  }
};

module.exports = { getInvoices, getSingleInvoice, addInvoice };
