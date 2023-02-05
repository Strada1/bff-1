import movies from '../routes/movies.js';
import categories from '../routes/categories.js';
import directors from '../routes/directors.js';

function addRoutes(app) {
  app.use('/movies', movies);
  app.use('/categories', categories);
  app.use('/directors', directors);
}

export default addRoutes;
