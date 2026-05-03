const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    index: true,
  },
  card_holder: {
    type: String,
    required: true,
    trim: true,
  },
  last4: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 4,
    match: /^\d{4}$/,
  },
  brand: {
    type: String,
    required: true,
    enum: ["Visa", "Mastercard", "Amex"],
  },
  exp_month: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },
  exp_year: {
    type: Number,
    required: true,
    min: new Date().getFullYear(),
  },
  is_default: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Card = mongoose.model("Card", cardSchema);

const getCardsByUser = async (userId) => {
  return await Card.find({ user_id: userId }).sort({ is_default: -1, createdAt: -1 });
};

const getCardById = async (id) => {
  return await Card.findById(id);
};

const createCard = async (data) => {
  const card = new Card(data);
  return await card.save();
};

const setDefaultCard = async (cardId, userId) => {
  // Quitar el default de todas las tarjetas del usuario
  await Card.updateMany({ user_id: userId }, { is_default: false });
  // Poner el default en la tarjeta seleccionada
  return await Card.findByIdAndUpdate(cardId, { is_default: true }, { new: true });
};

const deleteCard = async (id) => {
  return await Card.findByIdAndDelete(id);
};

module.exports = {
  getCardsByUser,
  getCardById,
  createCard,
  setDefaultCard,
  deleteCard,
};
