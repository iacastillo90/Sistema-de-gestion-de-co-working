


const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

    const authHeader = req.headers.authorization;

    // Bearer eyls{adjkfglk{jsdfglkdfgkldfglñj}}

      // verficar que viene un token incluido en la requets

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            msg: "Token de autenticación requerido"
        })
    } 

    // split ---> ["Bearer", "eyjklsdfjklshdfkljhsdf"]
    const token = authHeader.split(' ')[1];

    // verificar el token

    try {
        // Verificamos el token usando la clave secreta almacenada en .env
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // pasar información del usuario al siguiente middleware o controlador
        req.user = payload;
        // darle el paso al siguiente middleware
        next();

    } catch (error) {
        error.message = "Hubo un error con el token."
        next(error)
    }
};


module.exports = auth;