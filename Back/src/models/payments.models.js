const fs = require('fs/promises');
const path = require('path');

// Ruta absoluta al archivo JSON que almacena los pagos
const filePath = path.join(__dirname, '../../data/payments.json');

// ─── Funciones DRY de lectura y escritura ────────────────────────────────────

// Lee el archivo JSON y devuelve el array de pagos
const readPayments = async () => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Si el archivo no existe aún, retornamos un array vacío como fallback seguro
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
};

// Serializa y escribe el array de pagos en el archivo JSON con formato legible
const writePayments = async (payments) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(payments, null, 2), 'utf-8');
  } catch (error) {
    throw error;
  }
};

// ─── Operaciones CRUD ─────────────────────────────────────────────────────────

// Retorna todos los pagos registrados en el archivo
const getAllPayments = async () => {
  return await readPayments();
};

// Busca y retorna un pago por su ID numérico; retorna undefined si no existe
const getPaymentById = async (id) => {
  const payments = await readPayments();
  return payments.find((payment) => payment.id === id);
};

// Crea un nuevo pago con ID autoincremental y lo persiste en el archivo
const createPayment = async (paymentData) => {
  const payments = await readPayments();

  // Cálculo seguro del nuevo ID: evita errores si el array está vacío
  const id = payments.length ? Math.max(...payments.map((p) => p.id)) + 1 : 1;

  const newPayment = { id, ...paymentData };
  payments.push(newPayment);

  await writePayments(payments);
  return newPayment;
};

// Actualiza un pago existente por ID; retorna null si no se encuentra
const updatePayment = async (id, paymentData) => {
  const payments = await readPayments();
  const index = payments.findIndex((payment) => payment.id === id);

  // Si el ID no existe en el array, señalamos que no fue encontrado
  if (index === -1) return null;

  // Fusionamos los datos nuevos manteniendo el ID original intacto
  payments[index] = { ...payments[index], ...paymentData, id };
  await writePayments(payments);

  return payments[index];
};

// Elimina un pago por ID; retorna el objeto eliminado o null si no existe
const deletePayment = async (id) => {
  const payments = await readPayments();
  const index = payments.findIndex((payment) => payment.id === id);

  // Si el ID no existe, no hay nada que eliminar
  if (index === -1) return null;

  // Extraemos el elemento del array y persistimos el resultado
  const deletedPayment = payments.splice(index, 1)[0];
  await writePayments(payments);

  return deletedPayment;
};

module.exports = {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
};
