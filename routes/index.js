import movies from '../routes/movies.js';
import categories from '../routes/categories.js';

function addRoutes(app) {
  app.use('/movies', movies);
  app.use('/categories', categories);
}

export default addRoutes;
