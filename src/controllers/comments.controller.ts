import STATUS from 'http-status';
import asyncHandler from 'express-async-handler';
import * as moviesService from '../services/movies.service';
import * as commentsService from '../services/comments.service';
import ApiError from '../shared/ApiError';

export const getComments = asyncHandler(async (req, res) => {
  const { movieId } = req.query as { movieId: string };
  const comments = await commentsService.getComments({
    movieId,
  });

  res.status(STATUS.OK).send({ comments });
});

export const getComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const comment = await commentsService.getComment(commentId);

  if (!comment) {
    throw new ApiError(STATUS.NOT_FOUND, 'Comment not found');
  }

  res.status(STATUS.OK).send(comment);
});

export const createComment = asyncHandler(async (req, res) => {
  const { movieId, text } = req.body;
  const linkedMovie = await moviesService.getMovie(movieId);

  if (!linkedMovie) {
    throw new ApiError(STATUS.NOT_FOUND, 'Movie not found');
  }

  const createdComment = await commentsService.createComment({
    movie: movieId,
    text,
  });

  await moviesService.addComment(movieId, createdComment._id);

  res.status(STATUS.CREATED).send(createdComment);
});

export const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;
  const updatedComment = await commentsService.updateComment(commentId, {
    text,
  });

  if (!updatedComment) {
    throw new ApiError(STATUS.NOT_FOUND, 'Comment not found');
  }

  res.status(STATUS.OK).send(updatedComment);
});

export const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const deletedComment = await commentsService.deleteComment(commentId);

  if (!deletedComment) {
    throw new ApiError(STATUS.NOT_FOUND, 'Comment not found');
  }

  await moviesService.deleteComment(deletedComment.movie, deletedComment._id);

  res.status(STATUS.NO_CONTENT).send();
});
