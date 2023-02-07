function createCategorySchema(mongoose) {
	return new mongoose.Schema({
		title: String
	});
}

function createMovieSchema(mongoose) {
	return new mongoose.Schema({
		title: String,
		category: String,
		year: Number,
		duration: Number,
		director: String
	});
}

function useCategorySchema(mongoose, CategorySchema) {
	return mongoose.model('Category', CategorySchema);
}

function useMovieSchema(mongoose, MovieSchema) {
	return mongoose.model('Movie', MovieSchema);
}

module.exports = {
	createCategorySchema,
	createMovieSchema,
	useCategorySchema,
	useMovieSchema
}