const express = require("express");
const router = express.Router();
const { getComments, createComment, updateComment, deleteComment } = require("../services/comment");

router.route("/:movieId/comments")
.get(async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const comments = await getComments(movieId);
        return res.status(200).send(comments);
    } catch (e) {
        return res.status(500).json({error: e, message: "Error when reciving comments"});
    }
})
.post(async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const values = req.body;
        await createComment(movieId, values);
        return res.status(201).send("Comment created");
    } catch (e) {
        return res.status(500).json({error: e, message: "Error when creating a comment"});
    }
});

router.route("/:movieId/comments/:commentId")
.put(async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const values = req.body;
        await updateComment(commentId, values);
        return res.status(200).send("Comment updated");
    } catch (e) {
        return res.status(500).json({error: e, message: "Error when updating a comment"});
    }
})
.delete(async (req, res) => {
    try {
        const commentId = req.params.commentId;
        await deleteComment(commentId);
        return res.status(200).send("Comment deleted");
    } catch (e) {
        return res.status(500).json({error: e, message: "Error when deleting a comment"});
    }
});

module.exports = router;
