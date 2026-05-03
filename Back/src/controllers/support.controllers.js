const {
  getAllTickets,
  getTicketsByUser,
  createTicket,
  updateTicketStatus,
  getTicketById,
  updateTicket,
} = require("../models/support.mongoose");

// GET /api/support — admin ve todos, usuario ve los suyos
const getTickets = async (req, res, next) => {
  try {
    const tickets = req.user.rol === "admin"
      ? await getAllTickets()
      : await getTicketsByUser(req.user.id);
    res.json(tickets);
  } catch (err) {
    next(err);
  }
};

// GET /api/support/:id — obtener ticket por ID
const getTicketByIdController = async (req, res, next) => {
  try {
    const ticket = await getTicketById(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket no encontrado" });
    // Solo el dueño o admin puede verlo
    if (req.user.rol !== "admin" && ticket.user_id !== req.user.id) {
      return res.status(403).json({ message: "No autorizado" });
    }
    res.json(ticket);
  } catch (err) {
    next(err);
  }
};

// POST /api/support — crear ticket
const createSupportTicket = async (req, res, next) => {
  try {
    const { subject, description, related_payment_id, related_reservation_id } = req.body;
    const ticket = await createTicket({
      user_id: req.user.id,
      subject,
      description,
      related_payment_id: related_payment_id || null,
      related_reservation_id: related_reservation_id || null,
    });
    res.status(201).json(ticket);
  } catch (err) {
    next(err);
  }
};

// PUT /api/support/:id/status — solo admin puede cambiar estado
const changeStatus = async (req, res, next) => {
  try {
    if (req.user.rol !== "admin") {
      return res.status(403).json({ message: "Solo admins pueden cambiar el estado" });
    }
    const { status } = req.body;
    const ticket = await updateTicketStatus(req.params.id, status);
    if (!ticket) return res.status(404).json({ message: "Ticket no encontrado" });
    res.json(ticket);
  } catch (err) {
    next(err);
  }
};

// PUT /api/support/:id/respond — admin responde al ticket
const respondTicket = async (req, res, next) => {
  try {
    if (req.user.rol !== "admin") {
      return res.status(403).json({ message: "Solo admins pueden responder tickets" });
    }
    const { admin_response, status } = req.body;
    const updateData = { admin_response };
    if (status) updateData.status = status;
    const ticket = await updateTicket(req.params.id, updateData);
    if (!ticket) return res.status(404).json({ message: "Ticket no encontrado" });
    res.json(ticket);
  } catch (err) {
    next(err);
  }
};

module.exports = { getTickets, getTicketByIdController, createSupportTicket, changeStatus, respondTicket };
