import { Request, Response, NextFunction } from 'express';
import STATUS from 'http-status';

export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.statusCode) {
    return res
      .status(error.statusCode)
      .send({ meta: error.message, error: error.data });
  }

  if (error.name === 'CastError') {
    return res.status(STATUS.NOT_FOUND).send({ meta: error.message });
  }

  res.status(STATUS.INTERNAL_SERVER_ERROR).send({ error });

  next();
}
