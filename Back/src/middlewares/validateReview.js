const validateReview = (req, res, next) => {
  const { user_id, space_id, calificacion, comentario, respuesta_admin } = req.body;

  // Si es una actualización de solo la respuesta admin, dejar pasar sin validaciones de creación
  const isAdminResponse = respuesta_admin !== undefined && !user_id && !space_id && !comentario;
  if (isAdminResponse) {
    return next();
  }

  // Verificamos que todos los atributos requeridos existan en el body
  if (!user_id || !space_id || calificacion === undefined || !comentario) {
    return res.status(400).json({ error: 'Missing required fields: user_id, space_id, calificacion, and/or comentario' });
  }

  // Validación estricta para que 'calificacion' sea un número entre 1 y 5
  if (typeof calificacion !== 'number' || calificacion < 1 || calificacion > 5) {
    return res.status(400).json({ error: 'calificacion must be a number strictly between 1 and 5' });
  }

  // Si pasa las validaciones, continuamos al controlador
  next();
};

module.exports = {
  validateReview
};
