const {Comment} = require("../models");

const createComment = async (body) => {
    return Comment.create(body);
}

const updateComment =  (commentId, commentBody) => {
  return  Comment.findByIdAndUpdate(commentId, commentBody);
}
const deleteComment = (commentId) => {
    return Comment.findByIdAndDelete(commentId);
}

const getCommentById = (commentId) => {
    return commentId.findById(commentId);
}

module.exports = {
    createComment,
    updateComment,
    deleteComment,
    getCommentById
}