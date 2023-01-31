const {Movie, Category} = require("./models");

const addRoutes = (app) => {
    app.route('/movies')
        .post(async (req, res) => {
            try {
                await Movie.create(req.body);
                return res.status(201).send('movie created');
            } catch (err) {
                return res.status(401).send(err);
            }
        })
        .get(async (req, res) => {
                try {
                   const moviesList = await Movie.find(req.body);
                    return res.status(201).send(moviesList);
                } catch (err) {
                    return res.status(401).send(err);
                }
            });

    app.post('/categories', async (req, res) => {
        try {
            await Category.create(req.body);
            return res.status(201).send('category created');
        } catch (err) {
            return res.status(401).send(err);
        }
    });

    app.route('/movies/:movieId')
        .put(async (req, res) => {
            try {

            } catch (err) {
                return res.status(400).send(err.message)
            }
        })
        .delete(async (req, res) => {
            try {

            } catch (err) {
                return res.status(400).send(err.message)
            }
        })


}

module.exports = {
    addRoutes
}