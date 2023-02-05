const MovieModel = require('../models/movieModel');

const findAllMovies = () => { 
	return MovieModel.find();
}

const createMovie = ({ title, categoryId, year, duration, directorId }) => { 
	return MovieModel.create({ title, categoryId, year, duration, directorId }); 
}

const findAndDelete = (id) => { 
	return MovieModel.findByIdAndDelete(id);
}

const findAndUpdate = (id, body, options) => { 
	return MovieModel.findByIdAndUpdate(id, body, options);
}


const findItemById = (id) => { 
	return MovieModel.findById(id);
}


module.exports = { findAllMovies, createMovie, findAndDelete, findAndUpdate, findItemById };