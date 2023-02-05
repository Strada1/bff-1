import STATUS from 'http-status';
import { NextFunction, Request, Response } from 'express';
import * as moviesService from '../services/movies.service';
import * as commentsService from '../services/comments.service';

export async function getComments(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { movieId } = req.query as { movieId: string };
    const comments = await commentsService.getComments({
      movieId,
    });

    res.status(STATUS.OK).send({ comments });
  } catch (error) {
    next(error);
  }
}

export async function getComment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { commentId } = req.params;
    const comment = await commentsService.getComment(commentId);

    res.status(STATUS.OK).send(comment);
  } catch (error) {
    next(error);
  }
}

export async function createComment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { movieId } = req.body;
    const createdComment = await commentsService.createComment(
      movieId,
      req.body
    );

    await moviesService.addComment(movieId, createdComment._id);

    res.status(STATUS.CREATED).send(createdComment);
  } catch (error: any) {
    next(error);
  }
}

export async function updateComment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { commentId } = req.params;
    const editedComment = await commentsService.updateComment(
      commentId,
      req.body
    );

    res.status(STATUS.OK).send(editedComment);
  } catch (error: any) {
    next(error);
  }
}

export async function deleteComment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { commentId } = req.params;
    await commentsService.deleteComment(commentId);

    res.status(STATUS.NO_CONTENT).send();
  } catch (error: any) {
    next(error);
  }
}
