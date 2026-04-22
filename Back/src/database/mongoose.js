const mongoose = require("mongoose");

async  function conectarDB() {
    try {
        await mongoose.connect('mongodb+srv://alexignaciorz_db_user:USyXhAv9EsHijpmr@cluster0.6tn0ev4.mongodb.net/');
        console.log("MongoDB corriendo correctamente"); 
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
    }
}

module.exports = {
    conectarDB
}