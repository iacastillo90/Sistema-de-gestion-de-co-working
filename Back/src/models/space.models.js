const fs = require("fs/promises");
const path = require("path");

const spacePath = path.join(__dirname, "../../data/space.json");

// Leer Spaces
const readSpaces = async () => {
    const data = await fs.readFile(spacePath, "utf-8");
    return JSON.parse(data);
};

// Escribir Spaces
const writeSpaces = async (space) => {
    await fs.writeFile(spacePath, JSON.stringify(space, null, 2), "utf-8");
};

const getAllSpace = async () => {
    return await readSpaces();
    
};

const createSpace = async (space) => {
    const spaces = await readSpaces();
    spaces.push(space);
    await writeSpaces(spaces);
    return space;
};

const updateSpace = async (space) => {
    
};

const deleteSpace = async (space) => {
    
};

const getSpaceById = async (space) => {
    
};

module.exports = {
    getAllSpace,
    createSpace,
    updateSpace,
    deleteSpace,
    getSpaceById
}