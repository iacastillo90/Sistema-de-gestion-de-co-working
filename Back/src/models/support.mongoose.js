const mongoose = require("mongoose");

const supportSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    index: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
    maxlength: 120,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000,
  },
  related_payment_id: {
    type: String,
    default: null,
  },
  related_reservation_id: {
    type: String,
    default: null,
  },
  admin_response: {
    type: String,
    default: null,
    trim: true,
    maxlength: 2000,
  },
  status: {
    type: String,
    required: true,
    enum: ["Open", "In Review", "Resolved"],
    default: "Open",
  },
}, {
  timestamps: true,
});

const SupportTicket = mongoose.model("SupportTicket", supportSchema);

const getAllTickets = async () => {
  return await SupportTicket.find().sort({ createdAt: -1 });
};

const getTicketsByUser = async (userId) => {
  return await SupportTicket.find({ user_id: userId }).sort({ createdAt: -1 });
};

const getTicketById = async (id) => {
  return await SupportTicket.findById(id);
};

const createTicket = async (data) => {
  const ticket = new SupportTicket(data);
  return await ticket.save();
};

const updateTicketStatus = async (id, status) => {
  return await SupportTicket.findByIdAndUpdate(id, { status }, { new: true });
};

const updateTicket = async (id, data) => {
  return await SupportTicket.findByIdAndUpdate(id, data, { new: true });
};

module.exports = {
  getAllTickets,
  getTicketsByUser,
  getTicketById,
  createTicket,
  updateTicketStatus,
  updateTicket,
};

