const express = require("express");
const validateReservations = require("../middlewares/validateReservations");
const { newReservations, getReservation } = require("../controllers/reservations.controllers");
const router = express.Router();

router.get("/", getReservation);
router.post("/", validateReservations, newReservations);

module.exports = router;