const { Router } = require('express');
const movieRoutes = require('./movies.routes');
const categoriesRouters = require('./сategories.routes');
const directorsRoutes = require('./directors.routes');
const usersRoutes = require('./users.routes');

const router = Router();

router.use(movieRoutes);
router.use(categoriesRouters);
router.use(directorsRoutes);
router.use(usersRoutes);

module.exports = router;
