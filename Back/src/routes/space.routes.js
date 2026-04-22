const express = require("express");
const { getSpaces, newSpace } = require("../controllers/space.controllers");
const validateSpace = require("../middlewares/validateSpace");

const router = express.Router();

router.get("/", getSpaces);
router.post("/", validateSpace, newSpace);


module.exports = router;

