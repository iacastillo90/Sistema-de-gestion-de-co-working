const express = require("express").Router();
const router = express.Router();
const { getSpaces } = require("../controllers/space.controllers");

router.get("/", getSpaces);


module.exports = router;

