import { Types } from 'mongoose';
import { Comment, IComment } from '../models/comments.model';

export function getComments(options: { movieId: string }) {
  const query = Comment.find().lean();

  if (options.movieId) {
    query.where('movie', options.movieId);
  }

  return query;
}

export function getComment(id: string | Types.ObjectId) {
  return Comment.findById(id);
}

export function createComment(comment: Partial<IComment>) {
  return Comment.create(comment);
}

export function updateComment(
  id: string | Types.ObjectId,
  data: Partial<IComment>
) {
  return Comment.findByIdAndUpdate(id, data, { new: true });
}

export function deleteComment(id: string | Types.ObjectId) {
  return Comment.findByIdAndDelete(id);
}
