const { getAllSpace, createSpace } = require("../models/space.models");


const getSpaces = async (req, res) => {
    try {
        const spaces = await getAllSpace();
        res.status(200).json(spaces);
    } catch (error) {
        console.log("Error al obtener los espacios:", error);
        res.status(500).json({ error: error.message });
    }
}

const newSpace = async (req, res) =>{
    
    const { nombre, descripcion, imagen, capacidad, ubicacion, precio } = req.body;
    
    const disponibilidad = true; // Por defecto, el espacio está disponible al crearlo
    
    try {
        const spaces = await getAllSpace();

    
        const newId = spaces.length ? Math.max(...spaces.map(elem => elem.id)) + 1 : 1;
        
        const newSpace = {
            id: newId,
            nombre,
            descripcion,
            imagen,
            capacidad,
            ubicacion,
            precio,
            disponibilidad
        };
    
        const spaceCreated = await createSpace(newSpace);
    
        res.status(201).json(spaceCreated);
        
    } catch (error) {
        console.log("Error al crear el espacio:", error);
        res.status(500).json({ error: error.message });
    }
    
}

module.exports = {
    getSpaces,
    newSpace
}