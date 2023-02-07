const {createApp, connectMongoose, connectApp} = require('./lib/connect');
const {createCategorySchema, createMovieSchema, useCategorySchema, useMovieSchema} = require('./lib/models');
const {getAllRoutes} = require('./lib/routes');

const port = 3000;
const url = 'mongodb://127.0.0.1:27017/main';

const app = createApp();
const mongoose = connectMongoose(url);

const Movie = useMovieSchema(mongoose, createMovieSchema(mongoose));
const Category = useCategorySchema(mongoose, createCategorySchema(mongoose));

try {
	getAllRoutes(app, Movie, Category);
	connectApp(app, port);
}	catch (error) {
	console.log(error);
}
