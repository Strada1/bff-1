import Schema from '../schemas/index.js';

const createDirector = (director) => Schema.Director.create(director);

const readDirector = (id) => Schema.Director.findById(id).lean();

const updateDirector = (id, director) => Schema.Director.findByIdAndUpdate(id, director);

const deleteDirector = (id) => Schema.Director.findByIdAndDelete(id);

export default {
  readDirector,
  createDirector,
  updateDirector,
  deleteDirector,
};
