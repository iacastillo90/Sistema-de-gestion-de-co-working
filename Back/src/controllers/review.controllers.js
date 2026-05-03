const {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
} = require('../models/review.mongoose');

const getAll = async (req, res) => {
  try {
    const reviews = await getAllReviews();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Error interno al obtener las reseñas' });
  }
};

const getById = async (req, res) => {
  try {
    const review = await getReviewById(req.params.id);

    if (!review) {
      return res.status(404).json({ error: 'Reseña no encontrada' });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Error interno al obtener la reseña' });
  }
};

const create = async (req, res) => {
  try {
    const newReview = await createReview(req.body);
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: 'Error interno al crear la reseña' });
  }
};

const update = async (req, res) => {
  try {
    const updatedReview = await updateReview(req.params.id, req.body);

    if (!updatedReview) {
      return res.status(404).json({ error: 'Reseña no encontrada para actualizar' });
    }

    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: 'Error interno al actualizar la reseña' });
  }
};

const remove = async (req, res) => {
  try {
    const deletedReview = await deleteReview(req.params.id);

    if (!deletedReview) {
      return res.status(404).json({ error: 'Reseña no encontrada para eliminar' });
    }

    res.status(200).json(deletedReview);
  } catch (error) {
    res.status(500).json({ error: 'Error interno al eliminar la reseña' });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
