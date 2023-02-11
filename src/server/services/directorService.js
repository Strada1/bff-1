const DirectorModel = require("../models/director");

const addDirector = ({ title, movies }) => {
  return DirectorModel.create({ title, movies })
}

const removeDirector = ({ id }) => {
  return DirectorModel.findOneAndDelete(id)
}

const updateDirector = (id, { title }) => {
  return DirectorModel.findOneAndUpdate(id, { title }, { new: true });
}

const getDirector = () => {
  return DirectorModel.find()
}

module.exports = { addDirector, removeDirector, updateDirector, getDirector };