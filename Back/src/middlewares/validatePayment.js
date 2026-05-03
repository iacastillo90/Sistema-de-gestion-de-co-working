// Lista de estados válidos según el dominio de negocio
const VALID_STATES = ['Pendiente', 'En Revisión', 'Completado'];

/**
 * Middleware que valida el body de una petición de pago.
 * Verifica presencia de campos obligatorios, tipos de datos y valores permitidos.
 */
const validatePayment = (req, res, next) => {
  const { reservation_id, monto, metodo_pago, fecha_pago, estado } = req.body;

  // Verificamos que todos los campos obligatorios estén presentes en el body
  if (
    reservation_id === undefined ||
    monto === undefined ||
    !metodo_pago ||
    !fecha_pago ||
    !estado
  ) {
    return res.status(400).json({
      message:
        'Todos los campos son obligatorios: reservation_id, monto, metodo_pago, fecha_pago, estado.',
    });
  }

  // El monto debe ser un número mayor a 0 para que sea un pago válido
  if (typeof monto !== 'number' || monto <= 0) {
    return res.status(400).json({
      message: 'El campo "monto" debe ser un número mayor a 0.',
    });
  }

  // El estado solo puede ser uno de los valores definidos en VALID_STATES
  if (!VALID_STATES.includes(estado)) {
    return res.status(400).json({
      message: `El campo "estado" debe ser uno de los siguientes valores: ${VALID_STATES.join(', ')}.`,
    });
  }

  // Si todas las validaciones pasan, continuamos con el siguiente middleware o controlador
  next();
};

module.exports = validatePayment;
