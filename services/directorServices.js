const DirectorModel = require("../models/director");

const director = (req) => {
  return DirectorModel.findById({ _id: req.params.directorId });
};

const allDirectors = () => {
  return DirectorModel.find();
};

const directorCreate = (req) => {
  return DirectorModel.create(req.body);
};

const directorUpdate = (req) => {
  return DirectorModel.findOneAndUpdate(
    { _id: req.params.directorId },
    req.body,
    { new: true }
  );
};

const directorDelete = (req) => {
  return DirectorModel.findOneAndDelete({ _id: req.params.directorId });
};

module.exports = {
  director,
  allDirectors,
  directorCreate,
  directorUpdate,
  directorDelete,
};
