const {Category} = require("../schemas/category");

module.exports = function(app){
    app.post('/categories', async (req, res) => {
        try {
            await Category.create(req.body);
            return res.status(201).json({success: true});
        } catch (err) {
            return res.status(500).send(err);
        }
    })
}
