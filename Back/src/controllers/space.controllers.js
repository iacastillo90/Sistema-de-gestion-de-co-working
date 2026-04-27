const { getAllSpace, createSpace, getSpaceById, updateSpace, deleteSpace } = require("../models/space.models");


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

const getSpace = async (req, res) => {
    try {
        const { id } = req.params;
        const space = await getSpaceById(Number(id));
        if (!space) {
            return res.status(404).json({ error: "Espacio no encontrado" });
        }
        res.status(200).json(space);
    } catch (error) {
        console.log("Error al obtener el espacio:", error);
        res.status(500).json({ error: error.message });
    }
}

const editSpace = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, imagen, capacidad, ubicacion, precio } = req.body;
        
        const updatedSpace = await updateSpace(Number(id), {
            nombre,
            descripcion,
            imagen,
            capacidad,
            ubicacion,
            precio
        });
        
        if (!updatedSpace) {
            return res.status(404).json({ error: "Espacio no encontrado" });
        }
        
        res.status(200).json(updatedSpace);
    } catch (error) {
        console.log("Error al actualizar el espacio:", error);
        res.status(500).json({ error: error.message });
    }
}

const removeSpace = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await deleteSpace(Number(id));
        
        if (!deleted) {
            return res.status(404).json({ error: "Espacio no encontrado" });
        }
        
        res.status(200).json({ msg: "Espacio eliminado correctamente" });
    } catch (error) {
        console.log("Error al eliminar el espacio:", error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getSpaces,
    newSpace,
    getSpace,
    editSpace,
    removeSpace
}