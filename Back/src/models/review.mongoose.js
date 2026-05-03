const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  space_id: { type: String, required: true },
  calificacion: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comentario: { type: String, required: true },
  // Respuesta administrativa opcional
  respuesta_admin: { type: String, default: null },
  fecha_respuesta: { type: String, default: null }
}, {
  timestamps: true
});

const Review = mongoose.model("Review", reviewSchema);

const getAllReviews = async () => {
  return await Review.find();
};

const getReviewById = async (id) => {
  return await Review.findById(id);
};

const createReview = async (data) => {
  const review = new Review(data);
  return await review.save();
};

const updateReview = async (id, data) => {
  return await Review.findByIdAndUpdate(id, data, { new: true });
};

const deleteReview = async (id) => {
  return await Review.findByIdAndDelete(id);
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
};
