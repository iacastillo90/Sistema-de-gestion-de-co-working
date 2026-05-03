const {
    getAllReservations,
    getReservationById,
    createReservation,
    updateReservation,
    deleteReservation
} = require('../models/reservation.mongoose');

// Obtiene todas las reservas
const getAllReservationsController = async (req, res) => {
    try {
        const reservations = await getAllReservations();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las reservas", error: error.message });
    }
};

// Obtiene una reserva por su ID
const getReservationByIdController = async (req, res) => {
    try {
        const reservation = await getReservationById(req.params.id);

        if (!reservation) {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }

        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la reserva", error: error.message });
    }
};

// Crea una nueva reserva
const createReservationController = async (req, res) => {
    try {
        const { space_id, fecha, hora_inicio, hora_fin } = req.body;
        
        // Validación de superposición (Double Booking)
        const existingReservations = await require('../models/reservation.mongoose').getAllReservations();
        const overlapping = existingReservations.filter(r => {
            if (r.space_id !== space_id || r.fecha !== fecha || r.estado === 'Cancelada') return false;
            
            const rStart = new Date(`1970-01-01T${r.hora_inicio}`);
            const rEnd = new Date(`1970-01-01T${r.hora_fin}`);
            const newStart = new Date(`1970-01-01T${hora_inicio}`);
            const newEnd = new Date(`1970-01-01T${hora_fin}`);
            
            // Si el inicio de la nueva es antes del fin de la existente, Y el fin de la nueva es después del inicio de la existente
            return (newStart < rEnd && newEnd > rStart);
        });

        if (overlapping.length > 0) {
            return res.status(400).json({ message: "El espacio ya está ocupado en este horario. Intenta con otro horario u otro espacio." });
        }

        const created = await createReservation(req.body);
        res.status(201).json(created);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la reserva", error: error.message });
    }
};

// Actualiza una reserva existente
const updateReservationController = async (req, res) => {
    try {
        const updatedReservation = await updateReservation(req.params.id, req.body);

        if (!updatedReservation) {
            return res.status(404).json({ message: "Reserva no encontrada para actualizar" });
        }

        res.status(200).json(updatedReservation);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la reserva", error: error.message });
    }
};

// Elimina una reserva
const deleteReservationController = async (req, res) => {
    try {
        const deleted = await deleteReservation(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Reserva no encontrada para eliminar" });
        }

        res.status(200).json({ message: "Reserva eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la reserva", error: error.message });
    }
};

module.exports = {
    getAllReservations: getAllReservationsController,
    getReservationById: getReservationByIdController,
    createReservation: createReservationController,
    updateReservation: updateReservationController,
    deleteReservation: deleteReservationController
};