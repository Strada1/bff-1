const { Director } = require("../models/director");

async function getDirector(id) {
    return await Director.findById(id);
}

async function getDirectors() {
    return await Director.find();
}

async function createDirector(values) {
    await Director.create(values);
}

async function updateDirector(id, values) {
    await Director.findOneAndUpdate({_id: id}, values);
}

async function deleteDirector(id) {
    await Director.findOneAndDelete({_id: id});
}

module.exports = {
    getDirector,
    getDirectors,
    createDirector,
    updateDirector,
    deleteDirector
};
