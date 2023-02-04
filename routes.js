const {Movie, Category, Comment} = require("./models");
const {createMovie, getMovies, updateMovie, deleteMovie, getMovieById} = require("./services/movieService");
const {createCategory} = require("./services/categoryService");
const {createComment} = require("./services/commentsService");

const addRoutes = (app) => {
    app.route('/movies')
        .post(async (req, res) => {
            try {
                await createMovie(req.body);
                return res.status(201).send('movie created');
            } catch (err) {
                return res.status(401).send(err);
            }
        })
        .get(async (req, res) => {
                try {
                   const moviesList = await getMovies(req.body);
                    return res.status(201).send(moviesList);
                } catch (err) {
                    return res.status(401).send(err);
                }
            });

    app.post('/categories', async (req, res) => {
        try {
            await createCategory(req.body);
            return res.status(201).send('category created');
        } catch (err) {
            return res.status(401).send(err);
        }
    });


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
}

module.exports = {
    addRoutes
}