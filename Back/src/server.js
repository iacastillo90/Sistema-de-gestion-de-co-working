//Levantar el servidor y conectar a la base de datos

const app = require("./app");
const { conectarDB } = require("./database/mongoose");  

const PORT = process.env.PORT || 3000;

conectarDB(); // Conectar a la base de datos antes de iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});