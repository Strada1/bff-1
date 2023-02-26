const UserModel = require('../models/userModel');

const findAllUsers = () => {
	return UserModel.find();
}

const createUser = ({ email, token, username, roles, favorites }) => {
	return UserModel.create({ email, token, username, roles, favorites });
}

const findOneByEmail = ({ email }) => {
	return UserModel.findOne({ email: email });
}

const findOneByToken = (token) => {
	return UserModel.findOne({ token: token });
}

const findAndUpdate = (id, body, options) => {
	return UserModel.findByIdAndUpdate(id, body, options);
}

const findAndDelete = (id) => {
	return UserModel.findByIdAndDelete(id);
}


const addFavoriteMovie = (userId, movie) => {
	return UserModel.findByIdAndUpdate(
		userId,
		{ $addToSet: { favorites: movie } },
		{ new: true });
}

const removeFavoriteMovie = (userId, movie) => {
	return UserModel.findByIdAndUpdate(
		userId,
		{ $pull: { favorites: movie } },
		{ new: true });
}

const getAllFavoritesMovies = () => {
	return UserModel.aggregate(
		[
			{
				$lookup: {
					from: 'movies',
					localField: 'favorites',
					foreignField: '_id',
					as: 'favoriteMovies',
				},
			},
			{ $unwind: '$favoriteMovies' },
			{
				$group: { _id: '$favoriteMovies.title', count: { $sum: 1 } },
			},
			{
				$sort: { _id: 1 }
			}
		]
	)
}


module.exports = { findAllUsers, createUser, findOneByEmail, findOneByToken, findAndUpdate, findAndDelete, addFavoriteMovie, removeFavoriteMovie, getAllFavoritesMovies };