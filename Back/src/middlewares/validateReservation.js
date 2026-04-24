const validateReservation = (req, res, next) => {
    const { user_id, space_id, fecha, hora_inicio, hora_fin, estado } = req.body;

    // Verifica que todos los campos requeridos estén presentes en el body
    if (!user_id || !space_id || !fecha || !hora_inicio || !hora_fin || !estado) {
        return res.status(400).json({
            message: "Faltan datos requeridos. Debe proveer user_id, space_id, fecha, hora_inicio, hora_fin y estado."
        });
    }

    // Verifica que el estado sea estrictamente uno de los valores permitidos
    if (estado !== "Confirmada" && estado !== "Cancelada") {
        return res.status(400).json({
            message: "El campo 'estado' debe ser estrictamente 'Confirmada' o 'Cancelada'."
        });
    }

    // Si la validación es exitosa, pasa el control al siguiente middleware/controlador
    next();
};

module.exports = validateReservation;
