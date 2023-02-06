import { Types } from 'mongoose';
import STATUS from 'http-status';
import ApiError from '../shared/ApiError';
import { Comment, IComment } from '../models/comments.model';

export async function getComments(options: { movieId: string }) {
  const query = Comment.find().lean();

  if (options.movieId) {
    query.where('movie', options.movieId);
  }

  return query;
}

export async function getComment(id: string | Types.ObjectId) {
  const comment = await Comment.findById(id);

  if (!comment) {
    throw new ApiError(STATUS.NOT_FOUND, 'Comment not found');
  }

  return comment;
}

export function createComment(id: string | Types.ObjectId, { text }: IComment) {
  return Comment.create({ text, movie: id });
}

export async function updateComment(
  id: string | Types.ObjectId,
  { movie, text }: IComment
) {
  const comment = await Comment.findByIdAndUpdate(
    id,
    { movie, text },
    { new: true }
  );

  if (!comment) {
    throw new ApiError(STATUS.NOT_FOUND, 'Comment not found');
  }

  return comment;
}

export async function deleteComment(id: string | Types.ObjectId) {
  const deletedComment = await Comment.findByIdAndDelete(id);

  if (!deletedComment) {
    throw new ApiError(STATUS.NOT_FOUND, 'Comment not found');
  }

  return deletedComment;
}
