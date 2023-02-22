const MovieModel = require('../models/movieModel');
const { ObjectId } = require('mongodb')

const findAllMovies = ({ director, year, sort, onyears }) => {
	const query = MovieModel.find().populate('director').populate('category');
	if (year) {
		if (sort) {
			query.where('year', year)
				.sort({
					title: 1
				});
		} else {
			query.where('year', year)
		}
	};
	if (director) {
		if (sort) {
			if (onyears) {
				query.where('director', director)
					.sort({
						year: 1
					});
			} else {
				query.where('director', director)
					.sort({
						title: 1
					});
			}
		} else {
			query.where('director', director)
		};
	};
	return query;
}

const createMovie = ({ title, category, year, duration, director, description }) => {
	return MovieModel.create({ title, category, year, duration, director, description });
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


const aggregateDirectorMoviesCount = (directorId) => {
	return MovieModel.aggregate([
		{ $match: { director: new ObjectId(directorId) } },
		{ $count: 'Count' }
	]);
};

const agregateMoviesForYears = (greaterThan, lowerThan) => {
	return MovieModel.aggregate(
		[
			{ $match: { year: { $gt: greaterThan, $lt: lowerThan } } }
		]
	);
};

const aggregateMoviesForYearsByDirectors = (greaterThan, lowerThan) => {
	return MovieModel.aggregate(
		[
			{ $match: { year: { $gt: greaterThan, $lt: lowerThan } } },
			{
				$group: {
					_id: "$director",
					total: { $sum: 1 }
				}
			}
		]
	);
};


module.exports = { findAllMovies, createMovie, findAndDelete, findAndUpdate, findItemById, aggregateDirectorMoviesCount, agregateMoviesForYears, aggregateMoviesForYearsByDirectors };