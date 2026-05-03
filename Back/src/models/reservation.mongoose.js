const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  space_id: { type: String, required: true },
  fecha: { type: String, required: true },
  hora_inicio: { type: String, required: true },
  hora_fin: { type: String, required: true },
  nota: { type: String }, // Opcional, para indicar el motivo de la reserva
  estado: {
    type: String,
    required: true,
    enum: ["Confirmada", "Cancelada", "Pendiente"],
    default: "Confirmada"
  }
}, {
  timestamps: true
});

const Reservation = mongoose.model("Reservation", reservationSchema);

const getAllReservations = async () => {
  return await Reservation.find();
};

const getReservationById = async (id) => {
  return await Reservation.findById(id);
};

const createReservation = async (data) => {
  const reservation = new Reservation(data);
  return await reservation.save();
};

const updateReservation = async (id, data) => {
  return await Reservation.findByIdAndUpdate(id, data, { new: true });
};

const deleteReservation = async (id) => {
  return await Reservation.findByIdAndDelete(id);
};

module.exports = {
  getAllReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation
};
