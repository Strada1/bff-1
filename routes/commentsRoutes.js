const {getMovieById} = require("../services/movieService");
const {createComment, updateComment, getCommentById} = require("../services/commentsService");
const {deleteCategory} = require("../services/categoryService");
const {body, validationResult} = require("express-validator");

const addCommentsRoutes = (app) => {
    app.post('/movies/:id/comments',
        body('text').notEmpty().withMessage('you must write a text'),
        async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.status(400).json({errors: errors.array()});
            }
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
}

module.exports = {
    addCommentsRoutes
};