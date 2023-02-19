const DirectorModel = require("../models/director");

const addDirector = ({ title, movies }) => {
  return DirectorModel.create({ title, movies })
}

const removeDirector = ({ id }) => {
  return DirectorModel.findOneAndDelete({ _id: id })
}

const updateDirector = (id, { title }) => {
  return DirectorModel.findOneAndUpdate({ _id: id }, { title }, { new: true });
}

const getDirector = () => {
  return DirectorModel.find()
}

module.exports = { addDirector, removeDirector, updateDirector, getDirector };