const {createDirector, updateDirector, deleteDirector, getDirectorById} = require("../services/directorService");

const addDirectorsRoutes = (app) => {
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
    addDirectorsRoutes
};