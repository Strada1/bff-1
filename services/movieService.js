const MovieModel = require('../models/movieModel');

const findAllMovies = () => { 
	return MovieModel.find();
}

const createMovie = ({ title, category, year, duration, director }) => { 
	return MovieModel.create({ title, category, year, duration, director }); 
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