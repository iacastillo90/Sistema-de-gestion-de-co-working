const express = require("express");
const router = express.Router();
const { getInvoices, getSingleInvoice, addInvoice } = require("../controllers/invoices.controllers");

// GET /api/invoices
router.get("/", getInvoices);

// GET /api/invoices/:id
router.get("/:id", getSingleInvoice);

// POST /api/invoices
router.post("/", addInvoice);

module.exports = router;
