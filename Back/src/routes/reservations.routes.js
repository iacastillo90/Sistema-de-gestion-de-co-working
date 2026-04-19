const express = require("express");
const router = express.Router();
const reservationsController = require("../controllers/reservations.controller");

router.get("/", reservationsController.findAll);
router.get("/:id", reservationsController.findOne);
router.post("/", reservationsController.create);
router.put("/:id", reservationsController.update);
router.delete("/:id", reservationsController.delete);

module.exports = router;