const fs = require("fs/promises");
const path = require("path");

const reservationsPath = path.join(__dirname, "../../data/reservations.json");

// Leer las Reservations
const readReservations = async () => {
    const data = await fs.readFile(reservationsPath, "utf-8");
    return JSON.parse(data);
}

// Escribir las Reservations
const writeReservations = async (reservations) => {
    await fs.writeFile(reservationsPath, JSON.stringify(reservations, null, 2), "utf-8");
}

const getAllReservations = async () => {
    return await readReservations();
};

const createReservation = async (newReservation) => {
    const reservations = await readReservations();
    reservations.push(newReservation);
    await writeReservations(reservations);
    return newReservation;
};

const updateReservation = async () => {
    
};

const deleteReservation = async () => {
    
};

const getReservationById = async () => {
    
};



module.exports = {
    getAllReservations,
    createReservation,
    updateReservation,
    deleteReservation,
    getReservationById
};