const MovieModel = require('../models/movieModel');

const findItem = () => { 
	return MovieModel.find();
}

const createMovie = ({ title, category, year, duration, director, comments }) => { 
	return MovieModel.create({ title, category, year, duration, director, comments }); 
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

module.exports = { findItem, createMovie, findAndDelete, findAndUpdate, findItemById };