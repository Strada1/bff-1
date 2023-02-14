const {createCategory, updateCategory, deleteCategory, getCategoryById} = require("../services/categoryService");
const {body, validationResult} = require("express-validator");
const addCategoryRoutes = (app) => {
    app.post('/categories',
        body('title').notEmpty().withMessage('must be a title of category'),
        async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            }
            await createCategory(req.body);
            return res.status(201).send('category created');
        } catch (err) {
            return res.status(401).send(err);
        }
    });

    app.route('/categories/:id')
        .put(
            body('title').notEmpty().withMessage('must be a title of category'),
            async (req, res) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({errors: errors.array()});
                }
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
}

module.exports = {
    addCategoryRoutes
};