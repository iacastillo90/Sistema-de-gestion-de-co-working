const express = require("express").Router();
const router = express.Router();
const spaceController = require("../controllers/space.controller");

router.get("/", spaceController.findAll);
router.get("/:id", spaceController.findOne);
router.post("/", spaceController.create);
router.put("/:id", spaceController.update);
router.delete("/:id", spaceController.delete);

module.exports = router;

