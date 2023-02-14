const {body, validationResult, param} = require("express-validator");
const {createMovie, updateMovie, deleteMovie, getMovieById} = require("../services/movieService");

const addMovieRoutes = (app) => {
    app.post('/movies',
        body('title').notEmpty().bail().withMessage('must be a title of movie'),
        body('year').notEmpty().bail().withMessage('must be a year of movie'),
        body('category').notEmpty().bail().withMessage('must be a category of movie'),
        body('duration').notEmpty().bail().withMessage('must be a duration of movie'),
        async (req, res) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({errors: errors.array()})
                }
                await createMovie(req.body);
                return res.status(201).send('movie created');
            } catch (err) {
                return res.status(401).send(err);
            }
        })

    app.route('/movies/:id')
        .put(
            body('title').notEmpty().bail().withMessage('must be a title of movie'),
            body('year').notEmpty().bail().withMessage('must be a year of movie'),
            body('category').notEmpty().bail().withMessage('must be a category of movie'),
            body('duration').notEmpty().bail().withMessage('must be a duration of movie'),
            async (req, res) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({errors: errors.array()});
                }
                await updateMovie(req.params.id, req.body);
                return res.status(201).send('movie updated');
            } catch (err) {
                return res.status(400).send(err.message)
            }
        })
        .delete(
            param('id').notEmpty().withMessage('id doesn\'t exist'),
            async (req, res) => {
            try {
                const errors  = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({errors: errors.array()});
                }
                await deleteMovie(req.params.id);
                return res.status(201).send('movie deleted');
            } catch (err) {
                return res.status(400).send(err.message)
            }
        })
        .get(async (req, res) => {
            try {
                const movie = await getMovieById(req.params.id);
                return res.status(200).send(movie);
            } catch (err) {
                return res.status(400).send(err.message)
            }
        })
}

module.exports = {
    addMovieRoutes
}
