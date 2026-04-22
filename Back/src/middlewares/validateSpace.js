const validateSpace = async (req, res, next) => {
    
    const { nombre, descripcion, imagen, capacidad, ubicacion, precio } = req.body;
    
    // Validar que todos los campos sean obligatorios

    if( !nombre || !descripcion || !imagen || !capacidad || !ubicacion || !precio ) {
        return res.status(400).json({
            msg: "Todos los campos son obligatorios"
        });
    }

    next();

}

module.exports = validateSpace;
