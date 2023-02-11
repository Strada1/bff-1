"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDirector = exports.updateDirector = exports.createDirector = exports.getDirector = exports.getDirectors = void 0;
const director_model_1 = require("../models/director.model");
function getDirectors() {
    return director_model_1.Director.find().lean();
}
exports.getDirectors = getDirectors;
function getDirector(id) {
    return director_model_1.Director.findById(id).lean();
}
exports.getDirector = getDirector;
function createDirector(director) {
    return director_model_1.Director.create(director);
}
exports.createDirector = createDirector;
function updateDirector(id, data) {
    return director_model_1.Director.findByIdAndUpdate(id, data, { new: true });
}
exports.updateDirector = updateDirector;
function deleteDirector(id) {
    return director_model_1.Director.findByIdAndDelete(id);
}
exports.deleteDirector = deleteDirector;
