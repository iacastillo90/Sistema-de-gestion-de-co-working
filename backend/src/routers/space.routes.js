const express = require('express');
const router = express.Router();
const { getSpaces } = require('../controller/spaces.controller');

// Ruta para obtener todos los espacios
router.get('/', getSpaces);

module.exports = router;

