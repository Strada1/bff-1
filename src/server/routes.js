const { Category, Movie } = require('./models')

function addRoutes(app) {
  app.get('/', (req, res) => {
    res.send("Hello!")
  });

  app.post('/movies', async (req, res) => {
    try {
      await Movie.create(req.body);
      return res.status(201).send('Movie created');
    } catch (e) {
      return res.status(400).send(`Movie not created: ${e.message}`);
    }
  });

  app.post('/categories', async (req, res) => {
    try {
      await Category.create(req.body);
      return res.status(201).send('Category created');
    } catch (e) {
      return res.status(400).send(`Category not created: ${e.message}`);
    }
  });
}

module.exports = addRoutes;