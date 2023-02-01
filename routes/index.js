const { Router } = require('express');
const movieRoutes = require('./movies.routes');
const categoriesRouters = require('./сategories.routes');

const router = Router();
router.use(movieRoutes);
router.use(categoriesRouters);

module.exports = router;
