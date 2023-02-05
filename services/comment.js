const { Comment } = require("../models/comment");

async function getComments(movieId) {
    return await Comment.find({movieId: movieId})
}

async function createComment(movieId, values) {
    await Comment.create({movieId: movieId, ...values});
}

async function updateComment(id, values) {
    await Comment.findByIdAndUpdate(id, values);
}

async function deleteComment(id) {
    await Comment.findByIdAndDelete(id);
}

module.exports = {
    getComments,
    createComment,
    updateComment,
    deleteComment
};