const CURRENT_YEAR = new Date().getFullYear();
const BRANDS = ["Visa", "Mastercard", "Amex"];

function validateCard(req, res, next) {
  const { card_holder, last4, brand, exp_month, exp_year } = req.body;
  const errors = [];

  if (!card_holder || typeof card_holder !== "string" || card_holder.trim().length < 2) {
    errors.push("card_holder: nombre del titular inválido (mínimo 2 caracteres)");
  }

  if (!last4 || !/^\d{4}$/.test(last4)) {
    errors.push("last4: debe contener exactamente 4 dígitos numéricos");
  }

  if (!brand || !BRANDS.includes(brand)) {
    errors.push(`brand: debe ser uno de ${BRANDS.join(", ")}`);
  }

  const month = Number(exp_month);
  if (!exp_month || isNaN(month) || month < 1 || month > 12) {
    errors.push("exp_month: mes de expiración inválido (1-12)");
  }

  const year = Number(exp_year);
  if (!exp_year || isNaN(year) || year < CURRENT_YEAR || year > CURRENT_YEAR + 20) {
    errors.push(`exp_year: año de expiración inválido (${CURRENT_YEAR}-${CURRENT_YEAR + 20})`);
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: "Datos de tarjeta inválidos", errors });
  }

  next();
}

module.exports = validateCard;
