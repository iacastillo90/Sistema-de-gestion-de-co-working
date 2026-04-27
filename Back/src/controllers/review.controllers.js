const reviewModel = require('../models/review.models');

const getAll = async (req, res) => {
  try {
    const reviews = await reviewModel.getAllReviews();
    res.status(200).json(reviews);
  } catch (error) {
    // Manejo de error al intentar leer
    res.status(500).json({ error: 'Internal server error while retrieving reviews' });
  }
};

const getById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const review = await reviewModel.getReviewById(id);
    
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error while retrieving the review' });
  }
};

const create = async (req, res) => {
  try {
    // Ya validado por validateReview middleware
    const newReview = await reviewModel.createReview(req.body);
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error while creating the review' });
  }
};

const update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const updatedReview = await reviewModel.updateReview(id, req.body);
    
    if (!updatedReview) {
      return res.status(404).json({ error: 'Review not found to update' });
    }
    
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error while updating the review' });
  }
};

const remove = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const deletedReview = await reviewModel.deleteReview(id);
    
    if (!deletedReview) {
      return res.status(404).json({ error: 'Review not found to delete' });
    }
    
    res.status(200).json(deletedReview);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error while deleting the review' });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
