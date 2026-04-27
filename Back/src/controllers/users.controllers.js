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
        const token = jwt.sign({id: usuario._id, email: usuario.email, rol: usuario.rol}, process.env.JWT_SECRET, {expiresIn: '8h'})


        // respuesta al cliente con su información de acceso
        res.status(200).json({
            msg: "Login correcto",
            token: token
        })
        
    } catch (error) {
        next(error)
    }

}

module.exports = {
    registrar,
    login
}