const reservationModel = require('../models/reservations.models');

// Obtiene todas las reservas
const getAllReservations = async (req, res) => {
    try {
        const reservations = await reservationModel.getAllReservations();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las reservas", error: error.message });
    }
};

// Obtiene una reserva por su ID
const getReservationById = async (req, res) => {
    try {
        // Convierte el ID de los parámetros de la ruta (string) a número
        const id = Number(req.params.id);
        const reservation = await reservationModel.getReservationById(id);
        
        // Si no existe, devuelve un error 404
        if (!reservation) {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }
        
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la reserva", error: error.message });
    }
};

// Crea una nueva reserva
const createReservation = async (req, res) => {
    try {
        const reservations = await reservationModel.getAllReservations();
        
        // Cálculo del nuevo ID: es a prueba de bugs si el array está vacío
        const newId = reservations.length > 0 
            ? Math.max(...reservations.map(r => r.id)) + 1 
            : 1;

        const newReservation = {
            id: newId,
            ...req.body
        };

        const created = await reservationModel.createReservation(newReservation);
        // Responde con status 201 (Created)
        res.status(201).json(created);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la reserva", error: error.message });
    }
};

// Actualiza una reserva existente
const updateReservation = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const updatedReservation = await reservationModel.updateReservation(id, req.body);
        
        // Si la reserva no existe, devuelve 404
        if (!updatedReservation) {
            return res.status(404).json({ message: "Reserva no encontrada para actualizar" });
        }
        
        res.status(200).json(updatedReservation);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la reserva", error: error.message });
    }
};

// Elimina una reserva
const deleteReservation = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const deleted = await reservationModel.deleteReservation(id);
        
        // Si no se encontró el ID para borrar, devuelve 404
        if (!deleted) {
            return res.status(404).json({ message: "Reserva no encontrada para eliminar" });
        }
        
        res.status(200).json({ message: "Reserva eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la reserva", error: error.message });
    }
};

module.exports = {
    getAllReservations,
    getReservationById,
    createReservation,
    updateReservation,
    deleteReservation
};