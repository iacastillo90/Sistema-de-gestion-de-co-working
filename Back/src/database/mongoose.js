require('dotenv').config();
const mongoose = require("mongoose");

async function conectarDB() {
    try {
        // La URI de conexión se lee desde la variable de entorno MONGODB_URI definida en .env
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB corriendo correctamente"); 
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
    }
}

module.exports = {
    conectarDB
}