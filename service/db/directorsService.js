const Directors = require('../../models/Directors');

const getAllDirectors = async () => {
  const allDirectors = await Directors.find({}).lean();
  return allDirectors;
};

const addDirector = async (director) => {
  await Directors.create(director);
};

const updateDirector = async (directorId, director) => {
  await Directors.findByIdAndUpdate(directorId, director);
};

const deleteDirector = async (directorId) => {
  await Directors.findByIdAndDelete(directorId);
};
module.exports = {
  getAllDirectors,
  addDirector,
  updateDirector,
  deleteDirector,
};
