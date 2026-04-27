const express = require("express");
const { getSpaces, newSpace, getSpace, editSpace, removeSpace } = require("../controllers/space.controllers");
const validateSpace = require("../middlewares/validateSpace");

const router = express.Router();

router.get("/", getSpaces);
router.post("/", validateSpace, newSpace);
router.get("/:id", getSpace);
router.put("/:id", validateSpace, editSpace);
router.delete("/:id", removeSpace);


module.exports = router;

