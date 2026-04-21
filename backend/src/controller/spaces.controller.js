const spaces = require('../../data/spaces.js');

const getSpaces = async (req, res) => {
    try {
        res.json(spaces);
    } catch (error) {
        console.error('Error al obtener los espacios:', error);
        res.status(500).json({ message: 'Error al obtener los espacios' });
    }   

}

module.exports = {
    getSpaces
};