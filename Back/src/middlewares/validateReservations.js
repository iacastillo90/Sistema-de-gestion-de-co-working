const { getAllSpace } = require("../models/space.models");

const validateReservations = async (req, res, next) => {
    const { spaceId, date, timeStart, timeEnd } = req.body;

    if( !spaceId || !date || !timeStart || !timeEnd ) {
        res.status(400).json({
            msg: "Todos los campos son obligatorios"
        });
    }

    const spaces = await getAllSpace();
    const spaceExists = spaces.some(space => space.id === spaceId);

    if (!spaceExists) {
        return res.status(404).json({ msg: "El espacio no existe" });
    }
    
    next();
}

module.exports = validateReservations;