const express = require('express');
const { registrar, login, getUsers, getPublicUser, updateUser } = require('../controllers/users.controllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/registro', registrar); // crear un nuevo usuario
router.post('/login', login); // login
router.get('/', auth, getUsers); // obtener usuarios (solo admin)
router.get('/:id', auth, getPublicUser); // obtener info pública de un usuario por ID
router.put('/:id', auth, updateUser); // actualizar perfil de usuario

module.exports = router;