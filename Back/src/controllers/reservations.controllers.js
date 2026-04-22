const { getAllReservations, createReservation } = require("../models/reservations.models")

const getReservation = async (req, res) => {

    try {
        const reservations = await getAllReservations();
        res.status(200).json(reservations);
    } catch (error) {
        console.log("Error al obtener las reservas:", error);
        res.status(500).json({ error: error.message });
    }
}

const newReservations = async (req, res) => {
    
    const { spaceId, date, timeStart, timeEnd } = req.body;
    

    try {
        const newId = reservations.length ? Math.max(...reservations.map(elem => elem.id)) + 1 : 1;
        
        const newReservation = {
            id: newId,
            spaceId,
            date,
            timeStart,
            timeEnd
        };
        const reservationCreated = await createReservation(newReservation);
        
    } catch (error) {
        
        console.log("Error al crear la reserva:", error);
        res.status(500).json({ error: error.message });
    }


}

module.exports = {
    getReservation,
    newReservations
}