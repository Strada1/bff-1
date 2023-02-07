const ROUTES = {
	MAIN_PAGE: '/',
	MOVIES: '/movies',
	CATEGORIES: '/categories'
}

function getMainPage(app) {
	app.get(ROUTES.MAIN_PAGE, (req, res) => {
		res.send('It`s main page!');
	});
}

function getMovies(app) {
	app.get(ROUTES.MOVIES, (req, res) => {
		res.send('get movies');
	});
}

function createMovie(app, Movie) {
	app.post(ROUTES.MOVIES, async (req, res) => {
		const { title, category, year, duration, director } = req.body;
		const movie = await Movie.create({title, category, year, duration, director});

		await movie.save();
		return res.status(201).send('movie created');
	});
}

function updateMovie(app) {
	app.put(ROUTES.MOVIES, (req, res) => {
		res.send('update movie');
	});
}

function deleteMovie(app) {
	app.delete(ROUTES.MOVIES, (req, res) => {
		res.send('delete movie');
	});
}

function createCategory(app, Category) {
	app.post(ROUTES.CATEGORIES, async (req, res) => {
		const { title } = req.body;
		const category = await Category.create({title});

		await category.save();
		return res.status(201).send('category created');
	});
}

function getAllRoutes(app, Movie, Category) {
	getMainPage(app);
	getMovies(app);
	createMovie(app, Movie);
	updateMovie(app);
	deleteMovie(app);
	createCategory(app, Category);
}

module.exports = {
	getAllRoutes
}
