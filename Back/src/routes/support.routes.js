const express = require("express");
const router = express.Router();
const { getTickets, getTicketByIdController, createSupportTicket, changeStatus, respondTicket } = require("../controllers/support.controllers");

// GET /api/support
router.get("/", getTickets);

// GET /api/support/:id
router.get("/:id", getTicketByIdController);

// POST /api/support
router.post("/", createSupportTicket);

// PUT /api/support/:id/status — admin only (validated inside controller)
router.put("/:id/status", changeStatus);

// PUT /api/support/:id/respond — admin only
router.put("/:id/respond", respondTicket);

module.exports = router;
