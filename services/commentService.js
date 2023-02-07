const Comment = require('../models/comment.js');

const getComments = () => {
  return Comment.find({});
};

const createComment = ({ userName, text, movieId }) => {
  return Comment.create({ userName, text, movieId });
};

const updateComment = (id, { text }) => {
  if (Comment.findById(id)) {
    return false;
  }
  return Comment.findByIdAndUpdate(id, { text });
};

const deliteComment = (id) => {
  if (Comment.findById(id)) {
    return false;
  }
  return Comment.findByIdAndDelete(id);
};

module.exports = { getComments, createComment, updateComment, deliteComment };
