const { getAllSpaces, createSpace, getSpaceById, updateSpace, deleteSpace } = require("../models/space.mongoose");


const getSpaces = async (req, res) => {
    try {
        const spaces = await getAllSpaces();
        res.status(200).json(spaces);
    } catch (error) {
        console.log("Error al obtener los espacios:", error);
        res.status(500).json({ error: error.message });
    }
}

const newSpace = async (req, res) => {
    const { nombre, descripcion, imagen, capacidad, ubicacion, location_id, precio } = req.body;

    try {
        const spaceCreated = await createSpace({
            nombre,
            descripcion,
            imagen,
            capacidad,
            ubicacion,
            location_id,
            precio,
            disponibilidad: true
        });

        res.status(201).json(spaceCreated);
    } catch (error) {
        console.log("Error al crear el espacio:", error);
        res.status(500).json({ error: error.message });
    }
}

const getSpace = async (req, res) => {
    try {
        const { id } = req.params;
        const space = await getSpaceById(id);
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
        const { nombre, descripcion, imagen, capacidad, ubicacion, location_id, precio, disponibilidad } = req.body;

        const updatedSpace = await updateSpace(id, {
            nombre,
            descripcion,
            imagen,
            capacidad,
            ubicacion,
            location_id,
            precio,
            disponibilidad
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
        const deleted = await deleteSpace(id);

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