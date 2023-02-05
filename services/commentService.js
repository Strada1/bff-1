import Schema from '../schemas/index.js';

const getComment = (id) => Schema.Comment.findById(id).lean();

const addComment = async (id, comment) => {
  const movie = await Schema.Movie.findById(id);
  movie.comments.push(await Schema.Comment.create({ body: comment, date: new Date() }));
  movie.save();
};

const updateComment = async (commentId, commentBody) => {
  const comment = await Schema.Comment.findById(commentId);
  comment.body = commentBody;
  comment.save();
};

const deleteComment = (commentId) => Schema.Comment.findByIdAndDelete(commentId);

export default {
  getComment,
  addComment,
  updateComment,
  deleteComment,
};
