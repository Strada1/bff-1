
const {createMovie, updateMovie, deleteMovie, getMovieById} = require("./services/movieService");
const {createCategory, updateCategory, deleteCategory, getCategoryById} = require("./services/categoryService");
const {createComment, updateComment, getCommentById} = require("./services/commentsService");
const {createDirector, updateDirector, deleteDirector, getDirectorById} = require("./services/directorService");
const {validate} = require("./middleware");
const {body, validationResult} = require("express-validator");


const addRoutes = (app) => {
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


    app.post('/categories', async (req, res) => {
        try {
            await createCategory(req.body);
            return res.status(201).send('category created');
        } catch (err) {
            return res.status(401).send(err);
        }
    });

    app.route('/categories/:id')
        .put(async (req, res) => {
            try {
                await updateCategory(req.params.id, req.body);
                return res.status(201).send('category updated');
            } catch (err) {
                return res.status(400).send(err.message)
            }
        })
        .delete(async (req, res) => {
            try {
                await deleteCategory(req.params.id);
                return res.status(201).send('category deleted');
            } catch (err) {
                return res.status(400).send(err.message)
            }
        })
        .get(async (req, res) => {
            try {
                const category = await getCategoryById(req.params.id);
                return res.status(200).send(category);
            } catch (err) {
                return res.status(400).send(err.message)
            }
        })

    app.route('/movies/:id')
        .put(async (req, res) => {
            try {
               await updateMovie(req.params.id, req.body);
               return res.status(201).send('movie updated');
            } catch (err) {
                return res.status(400).send(err.message)
            }
        })
        .delete(async (req, res) => {
            try {
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

    app.post('/movies/:id/comments', async (req, res) => {
        try {
            const parent = await getMovieById(req.params.id);
            const newComment = await createComment(req.body);
            parent.comments.push(newComment);
            parent.save();
            console.log(parent);
            return res.status(200).send('comment added');
        } catch (err) {
            return res.status(400).send(err.message);
        }
    })

    app.route('/movies/:id/comments/:commentId')
        .put(async (req, res) => {
            const {commentId} = req.params;
            try {
                await updateComment(commentId, req.body);
                console.log(commentId);
                return res.status(201).send('comment updated');
            } catch (err) {
                return res.status(400).send(err.message)
            }
        })
        .delete(async (req, res) => {
            const {commentId} = req.params;
            try {
                await deleteCategory(commentId);
                return res.status(201).send('comment deleted');
            } catch (err) {
                return res.status(400).send(err.message)
            }
        })
        .get(async (req, res) => {
            try {
                const {commentId} = req.params;
                const movie = await getCommentById(commentId);
                return res.status(200).send(movie);
            } catch (err) {
                return res.status(400).send(err.message)
            }
        })

    app.post('/directors', async (req, res) => {
        try {
            await createDirector(req.body);
            return res.status(201).send('director created');
        } catch(e) {
            return res.status(400).send(e.message)
        }
    })

    app.route('/directors/:id')
        .put(async (req, res) => {
            try {
                await updateDirector(req.params.id, req.body);
                return res.status(201).send('Director updated');
            } catch (err) {
                return res.status(400).send(err.message)
            }
        })
        .delete(async (req, res) => {
            try {
                await deleteDirector(req.params.id);
                return res.status(201).send('Director deleted');
            } catch (err) {
                return res.status(400).send(err.message)
            }
        })
        .get(async (req, res) => {
            try {
                const director = await getDirectorById(req.params.id);
                return res.status(200).send(director);
            } catch (err) {
                return res.status(400).send(err.message)
            }
        })

}

module.exports = {
    addRoutes
}