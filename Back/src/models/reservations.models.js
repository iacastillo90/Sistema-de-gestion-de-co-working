const fs = require('fs/promises');
const path = require('path');

const filePath = path.join(__dirname, '../../data/reservations.json');

// Lee las reservas desde el archivo JSON (DRY)
const readReservations = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // Si el archivo no existe, retornamos un array vacío
        if (error.code === 'ENOENT') {
            return [];
        }
        throw error;
    }
};

// Escribe las reservas en el archivo JSON (DRY)
const writeReservations = async (reservations) => {
    try {
        await fs.writeFile(filePath, JSON.stringify(reservations, null, 2), 'utf-8');
    } catch (error) {
        throw error;
    }
};

// Obtiene todas las reservas
const getAllReservations = async () => {
    return await readReservations();
};

// Obtiene una reserva por su ID
const getReservationById = async (id) => {
    const reservations = await readReservations();
    return reservations.find(r => r.id === id);
};

// Crea una nueva reserva y la guarda
const createReservation = async (newReservation) => {
    const reservations = await readReservations();
    reservations.push(newReservation);
    await writeReservations(reservations);
    return newReservation;
};

// Actualiza una reserva existente por su ID
const updateReservation = async (id, updatedData) => {
    const reservations = await readReservations();
    const index = reservations.findIndex(r => r.id === id);
    
    // Si no se encuentra, retornamos null
    if (index === -1) return null;
    
    // Actualizamos manteniendo el ID original
    reservations[index] = { ...reservations[index], ...updatedData, id };
    await writeReservations(reservations);
    return reservations[index];
};

// Elimina una reserva por su ID
const deleteReservation = async (id) => {
    let reservations = await readReservations();
    const index = reservations.findIndex(r => r.id === id);
    
    // Si no se encuentra, indicamos que no se pudo eliminar (false)
    if (index === -1) return false;

    // Filtramos para eliminar la reserva del array
    reservations = reservations.filter(r => r.id !== id);
    await writeReservations(reservations);
    return true;
};

module.exports = {
    getAllReservations,
    getReservationById,
    createReservation,
    updateReservation,
    deleteReservation
};