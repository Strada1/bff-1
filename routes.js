import Movie from './schemas/movie.js';
import Category from './schemas/category.js';

function addRoutes(app) {
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.post('/movies', async (req, res) => {
    try {
      const movie = await Movie.create(req.body);
      return res.status(201).send('movie created: ' + movie);
    } catch {
      return res.status(400).send('request error');
    }
  });

  app.post('/categories', async (req, res) => {
    try {
      const category = await Category.create(req.body);
      return res.status(201).send('category created: ' + category);
    } catch {
      return res.status(400).send('request error');
    }
  });
}

export default addRoutes;
