import { Request, Response, NextFunction } from 'express';
import STATUS from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../shared/ApiError';

export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof ApiError) {
    return res
      .status(error.statusCode)
      .send({ meta: error.message, error: error.data });
  }

  if (
    error instanceof mongoose.Error.CastError ||
    error instanceof mongoose.Error.ValidationError
  ) {
    return res.status(STATUS.BAD_REQUEST).send({ meta: error.message });
  }

  res.status(STATUS.INTERNAL_SERVER_ERROR).send({ error });

  next();
}
