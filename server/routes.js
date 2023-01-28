const {Movie, Category} = require("./schemas");

module.exports = function(app){
    app.get('/', (req, res) => {
        res.send('Hello World!')
    })

    app.post('/movies', async (req, res) => {
        try {
            await Movie.create(req.body);
            return res.status(201).json({success: true});
        } catch (err) {
            return res.status(500).send(err);
        }
    });

    app.post('/categories', async (req, res) => {
        try {
            await Category.create(req.body);
            return res.status(201).json({success: true});
        } catch (err) {
            return res.status(500).send(err);
        }
    })
}



