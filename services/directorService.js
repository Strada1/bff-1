const {Director} = require("../models");


const createDirector = (body) => {
    return Director.create(body);
}

const updateDirector = (id, body) => {
    return Director.findByIdAndUpdate(id, body);
}

const deleteDirector = (id) => {
    return Director.findByIdAndDelete(id);
}

const getDirectorById = (id) => {
    return Director.findById(id);
}

module.exports = {
    createDirector,
    updateDirector,
    deleteDirector,
    getDirectorById,
}