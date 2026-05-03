const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  imagen: {
    type: String,
    default: null
  },
  descripcion: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Location", locationSchema);