const MovieModel = require("../models/movie");
const addComment = async (id, { title }) => {
  const movie = await MovieModel.findById(id)
  movie.comments.push({ title, date: new Date() })
  return movie;
};

module.exports = { addComment };