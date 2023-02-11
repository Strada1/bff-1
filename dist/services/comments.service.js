"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.createComment = exports.getComment = exports.getComments = void 0;
const comments_model_1 = require("../models/comments.model");
function getComments(options) {
    const query = comments_model_1.Comment.find().lean();
    if (options.movieId) {
        query.where('movie', options.movieId);
    }
    return query;
}
exports.getComments = getComments;
function getComment(id) {
    return comments_model_1.Comment.findById(id);
}
exports.getComment = getComment;
function createComment(comment) {
    return comments_model_1.Comment.create(comment);
}
exports.createComment = createComment;
function updateComment(id, data) {
    return comments_model_1.Comment.findByIdAndUpdate(id, data, { new: true });
}
exports.updateComment = updateComment;
function deleteComment(id) {
    return comments_model_1.Comment.findByIdAndDelete(id);
}
exports.deleteComment = deleteComment;
