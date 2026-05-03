const {
  getCardsByUser,
  getCardById,
  createCard,
  setDefaultCard,
  deleteCard,
} = require("../models/card.mongoose");

// GET /api/cards — tarjetas del usuario autenticado
const getCards = async (req, res, next) => {
  try {
    const cards = await getCardsByUser(req.user.id);
    res.json(cards);
  } catch (err) {
    next(err);
  }
};

// POST /api/cards — agregar nueva tarjeta
const addCard = async (req, res, next) => {
  try {
    const { card_holder, last4, brand, exp_month, exp_year } = req.body;

    // Si es la primera tarjeta, se marca como default automáticamente
    const existing = await getCardsByUser(req.user.id);
    const is_default = existing.length === 0;

    const card = await createCard({
      user_id: req.user.id,
      card_holder,
      last4,
      brand,
      exp_month,
      exp_year,
      is_default,
    });
    res.status(201).json(card);
  } catch (err) {
    next(err);
  }
};

// PUT /api/cards/:id/default — marcar tarjeta como predeterminada
const makeDefault = async (req, res, next) => {
  try {
    const card = await getCardById(req.params.id);
    if (!card) return res.status(404).json({ message: "Tarjeta no encontrada" });
    if (card.user_id !== req.user.id) return res.status(403).json({ message: "Sin permiso" });

    const updated = await setDefaultCard(req.params.id, req.user.id);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/cards/:id — eliminar tarjeta
const removeCard = async (req, res, next) => {
  try {
    const card = await getCardById(req.params.id);
    if (!card) return res.status(404).json({ message: "Tarjeta no encontrada" });
    if (card.user_id !== req.user.id) return res.status(403).json({ message: "Sin permiso" });

    await deleteCard(req.params.id);
    res.json({ message: "Tarjeta eliminada" });
  } catch (err) {
    next(err);
  }
};

module.exports = { getCards, addCard, makeDefault, removeCard };
