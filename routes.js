const {Movie, Category} = require("./models");

const addRoutes = (app) => {
    app.route('/movies')
        .post(async (req, res) => {
            try {
                await Movie.create(req.body);
                console.log(req);
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


    app.route('/movies/:id')
        .put(async (req, res) => {
            try {
               await Movie.findByIdAndUpdate(req.params.id, req.body);
               console.log(req.body, req.params["id"]);
               return res.status(201).send('movie updated');
            } catch (err) {
                return res.status(400).send(err.message)
            }
        })
        .delete(async (req, res) => {
            try {
                await Movie.findByIdAndDelete(req.params.id);
                return res.status(201).send('movie deleted');
            } catch (err) {
                return res.status(400).send(err.message)
            }
        })

    app.post('/movies/:id/comments', async (req, res) => {
        try {

        } catch (err) {

        }

    })
}

module.exports = {
    addRoutes
}