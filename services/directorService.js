const DirectorModel = require('../models/directorModel');

const findAllDirectors = () => { 
	return DirectorModel.find();
}

const createDirector = ({ name, surname, yearOfBirth }) => { 
	return DirectorModel.create({ name, surname, yearOfBirth }); 
}

const findAndDelete = (id) => { 
	return DirectorModel.findByIdAndDelete(id);
}

const findAndUpdate = (id, body, options) => { 
	return DirectorModel.findByIdAndUpdate(id, body, options);
}


const findItemById = (id) => { 
	return DirectorModel.findById(id);
}


module.exports = { findAllDirectors, createDirector, findAndDelete, findAndUpdate, findItemById };