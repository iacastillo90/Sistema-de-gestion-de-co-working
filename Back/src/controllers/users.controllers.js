require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { crearNuevoUsuario, encontrarUsuarioPorEmail } = require('../models/users.mongoose');


const registrar = async (req, res, next) => {

    try {
        const { nombre, email, password } = req.body;

        // validación 

        // consulta al modelo para crear el documento en la base de datos
        const usuario = await crearNuevoUsuario({ nombre, email, password })

        res.status(201).json({
            msg: "Usuario creado correctamente.",
            id: usuario._id
        })
        
    } catch (error) {
        next(error)
    }

}

// login

const login = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        // validación 

        // consulta al modelo para validar identidad del usuario

        // verificar el email
        const usuario = await encontrarUsuarioPorEmail(email);

        if(!usuario) {
            return res.status(401).json({msg: "Credenciales inválidas."})
        }

        // validar la contraseña
        const passwordValidate = await bcrypt.compare(password, usuario.password);

        if(!passwordValidate) {
            return res.status(401).json({msg: "Credenciales inválidas."})
        }

        // generamos token de acceso

        // Firmamos el token usando la clave secreta almacenada en .env
        const token = jwt.sign({id: usuario._id, email: usuario.email, nombre: usuario.nombre, rol: usuario.rol}, process.env.JWT_SECRET, {expiresIn: '8h'})


        // respuesta al cliente con su información de acceso
        res.status(200).json({
            msg: "Login correcto",
            token: token
        })
        
    } catch (error) {
        next(error)
    }

}

const getUsers = async (req, res, next) => {
    try {
        if (req.user.rol !== 'admin') {
            return res.status(403).json({ msg: "Acceso denegado" });
        }
        const users = await require('../models/users.mongoose').getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

const getPublicUser = async (req, res, next) => {
    try {
        const user = await require('../models/users.mongoose').getUserById(req.params.id);
        if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

const updateUser = async (req, res, next) => {
    try {
        // Un usuario solo puede editarse a sí mismo (a menos que sea admin, pero dejémoslo simple)
        if (req.user.id !== req.params.id && req.user.rol !== 'admin') {
            return res.status(403).json({ msg: "No autorizado para editar este perfil" });
        }
        const updated = await require('../models/users.mongoose').updateUser(req.params.id, req.body);
        if (!updated) return res.status(404).json({ msg: 'Usuario no encontrado' });
        
        // Return a fresh token so the frontend can update authUser in localStorage
        const jwt = require('jsonwebtoken');
        const token = jwt.sign({id: updated._id, email: updated.email, nombre: updated.nombre, rol: updated.rol}, process.env.JWT_SECRET, {expiresIn: '8h'});

        res.status(200).json({ user: updated, token });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    registrar,
    login,
    getUsers,
    getPublicUser,
    updateUser
}