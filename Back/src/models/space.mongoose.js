const mongoose = require("mongoose");

const spaceSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  descripcion: { type: String, required: true },
  imagen: { type: String },
  capacidad: { type: Number, required: true },
  ubicacion: { type: String }, // Mantenido por compatibilidad
  location_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  precio: { type: Number, required: true },
  disponibilidad: { type: Boolean, default: true }
}, {
  timestamps: true
});

const Space = mongoose.model("Space", spaceSchema);

const getAllSpaces = async () => {
  return await Space.find().populate('location_id');
};

const getSpaceById = async (id) => {
  return await Space.findById(id).populate('location_id');
};

const createSpace = async (spaceData) => {
  const space = new Space(spaceData);
  return await space.save();
};

const updateSpace = async (id, spaceData) => {
  return await Space.findByIdAndUpdate(id, spaceData, { new: true });
};

const deleteSpace = async (id) => {
  return await Space.findByIdAndDelete(id);
};

module.exports = {
  getAllSpaces,
  getSpaceById,
  createSpace,
  updateSpace,
  deleteSpace
};
