const fs = require('fs/promises');
const path = require('path');

// Ruta absoluta al archivo JSON
const filePath = path.join(__dirname, '../../data/reviews.json');

// Función DRY para leer las reseñas del archivo
const readReviews = async () => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Si el archivo no existe o está vacío, devolvemos un array vacío como fallback
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
};

// Función DRY para escribir las reseñas en el archivo
const writeReviews = async (reviews) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(reviews, null, 2), 'utf-8');
  } catch (error) {
    throw error;
  }
};

const getAllReviews = async () => {
  return await readReviews();
};

const getReviewById = async (id) => {
  const reviews = await readReviews();
  return reviews.find(review => review.id === id);
};

const createReview = async (reviewData) => {
  const reviews = await readReviews();
  
  // Cálculo del nuevo ID a prueba de bugs (incluso si el array está vacío)
  const id = reviews.length > 0 ? Math.max(...reviews.map(r => r.id)) + 1 : 1;
  
  const newReview = { id, ...reviewData };
  reviews.push(newReview);
  
  await writeReviews(reviews);
  return newReview;
};

const updateReview = async (id, reviewData) => {
  const reviews = await readReviews();
  const index = reviews.findIndex(review => review.id === id);
  
  // Si no se encuentra la reseña, retornamos null
  if (index === -1) return null;
  
  // Actualizamos los datos, asegurando que el ID no se sobreescriba
  reviews[index] = { ...reviews[index], ...reviewData, id };
  await writeReviews(reviews);
  
  return reviews[index];
};

const deleteReview = async (id) => {
  const reviews = await readReviews();
  const index = reviews.findIndex(review => review.id === id);
  
  if (index === -1) return null;
  
  // Eliminamos el elemento y lo guardamos
  const deletedReview = reviews.splice(index, 1)[0];
  await writeReviews(reviews);
  
  return deletedReview;
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
};
