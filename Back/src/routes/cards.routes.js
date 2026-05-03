const express = require("express");
const router = express.Router();
const { getCards, addCard, makeDefault, removeCard } = require("../controllers/cards.controllers");
const validateCard = require("../middlewares/validateCard");

// GET /api/cards
router.get("/", getCards);

// POST /api/cards
router.post("/", validateCard, addCard);

// PUT /api/cards/:id/default
router.put("/:id/default", makeDefault);

// DELETE /api/cards/:id
router.delete("/:id", removeCard);

module.exports = router;
