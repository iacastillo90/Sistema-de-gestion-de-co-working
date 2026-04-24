const Location = require("../models/location.model");

// Crear
const createLocation = async (req, res) => {
  try {
    const location = new Location(req.body);
    const saved = await location.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas
const getLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener por ID
const getLocationById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) return res.status(404).json({ msg: "No encontrada" });
    res.json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar
const updateLocation = async (req, res) => {
  try {
    const updated = await Location.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar
const deleteLocation = async (req, res) => {
  try {
    await Location.findByIdAndDelete(req.params.id);
    res.json({ msg: "Eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createLocation,
  getLocations,
  getLocationById,
  updateLocation,
  deleteLocation
};