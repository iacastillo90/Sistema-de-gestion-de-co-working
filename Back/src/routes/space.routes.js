const express = require("express");
const { getSpaces, newSpace, getSpace, editSpace, removeSpace } = require("../controllers/space.controllers");
const auth = require("../middlewares/auth");
const validateSpace = require("../middlewares/validateSpace");

const router = express.Router();

router.get("/", getSpaces);
router.post("/", auth, validateSpace, newSpace);
router.get("/:id", getSpace);
router.put("/:id", auth, validateSpace, editSpace);
router.delete("/:id", auth, removeSpace);


module.exports = router;

