const {Movie} = require("../schemas/movie");

module.exports = function(app){
    app.post('/movies', async (req, res) => {
        try {
            await Movie.create(req.body);
            return res.status(201).json({success: true});
        } catch (err) {
            return res.status(500).send(err);
        }
    });
}
