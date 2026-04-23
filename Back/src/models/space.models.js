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

const updateSpace = async (id, space) => {
    const spaces = await readSpaces();
    const index = spaces.findIndex(s => s.id === id);
    if (index === -1) return null;
    spaces[index] = { ...spaces[index], ...space, id };
    await writeSpaces(spaces);
    return spaces[index];
};

const deleteSpace = async (id) => {
    const spaces = await readSpaces();
    const filteredSpaces = spaces.filter(s => s.id !== id);
    await writeSpaces(filteredSpaces);
    return filteredSpaces.length < spaces.length;
};

const getSpaceById = async (id) => {
    const spaces = await readSpaces();
    return spaces.find(s => s.id === id) || null;
};

module.exports = {
    getAllSpace,
    createSpace,
    updateSpace,
    deleteSpace,
    getSpaceById
};