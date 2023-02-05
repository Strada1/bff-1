import { Schema, model } from 'mongoose';

const CommentSchema = new Schema({
  body: String,
  date: Date,
});

const Comment = model('Comment', CommentSchema);

export default Comment;
