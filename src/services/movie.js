const MovieSchema = require("../models/movie");

const createMovie = async ({ title, year, rating, category }) => {
  const createdMovie = await MovieSchema.create({
    title,
    year,
    rating,
    category,
  });
  return createdMovie;
};

const editMovie = async ({ params, body }) => {
  const { title, year, rating, category } = body;
  const { id } = params;

  const updatedMovie = await MovieSchema.findByIdAndUpdate(id, {
    title,
    year,
    rating,
    category,
  });

  return updatedMovie;
};

const deleteMovie = async ({ id }) => {
  const updatedMovie = await MovieSchema.findByIdAndDelete(id);
  return updatedMovie;
};

module.exports = { createMovie, editMovie, deleteMovie };
