import STATUS from 'http-status';
import asyncHandler from 'express-async-handler';
import * as moviesService from '../services/movies.service';
import * as commentsService from '../services/comments.service';
import ApiError from '../shared/ApiError';
import { ERROR_TEXT } from '../shared/const';
import { isAdmin } from '../shared/helpers';
import { IUser } from '../models/users.model';

export const getComments = asyncHandler(async (req, res) => {
  const { movieId } = req.query as { movieId: string };
  const comments = await commentsService.getComments({
    movieId,
  });

  res.status(STATUS.OK).send(comments);
});

export const getComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const comment = await commentsService.getComment(commentId);

  if (!comment) {
    throw new ApiError(STATUS.NOT_FOUND, ERROR_TEXT.COMMENTS.COMMENT_NOT_FOUND);
  }

  res.status(STATUS.OK).send(comment);
});

export const createComment = asyncHandler(async (req, res) => {
  const { movieId, text } = req.body;
  const { _id } = req.user as IUser;
  const linkedMovie = await moviesService.getMovie(movieId);

  if (!linkedMovie) {
    throw new ApiError(STATUS.NOT_FOUND, ERROR_TEXT.MOVIES.MOVIE_NOT_FOUND);
  }

  const createdComment = await commentsService.createComment({
    user: _id,
    movie: movieId,
    text,
  });

  await moviesService.addComment(movieId, createdComment._id);

  res.status(STATUS.CREATED).send(createdComment);
});

export const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;
  const user = req.user as IUser;
  const comment = await commentsService.getComment(commentId);

  if (!comment) {
    throw new ApiError(STATUS.NOT_FOUND, ERROR_TEXT.COMMENTS.COMMENT_NOT_FOUND);
  }

  const isUserMatch = comment.user?.toString() === user._id?.toString();

  if (!isUserMatch && !isAdmin(user.roles!)) {
    throw new ApiError(STATUS.BAD_REQUEST, ERROR_TEXT.AUTH.NOT_ENOUGH_RIGHTS);
  }

  const updatedComment = await commentsService.updateComment(commentId, {
    text,
  });

  res.status(STATUS.OK).send(updatedComment);
});

export const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const user = req.user as IUser;
  const comment = await commentsService.getComment(commentId);

  if (!comment) {
    throw new ApiError(STATUS.NOT_FOUND, ERROR_TEXT.COMMENTS.COMMENT_NOT_FOUND);
  }

  const isUserMatch = comment.user?.toString() === user._id?.toString();

  if (!isUserMatch && !isAdmin(user.roles!)) {
    throw new ApiError(STATUS.BAD_REQUEST, ERROR_TEXT.AUTH.NOT_ENOUGH_RIGHTS);
  }

  const deletedComment = await commentsService.deleteComment(commentId);

  if (!deletedComment) {
    throw new ApiError(
      STATUS.INTERNAL_SERVER_ERROR,
      ERROR_TEXT.SERVER.INTERNAL_ERROR
    );
  }

  await moviesService.deleteComment(deletedComment.movie, deletedComment._id);
  res.status(STATUS.NO_CONTENT).send();
});
