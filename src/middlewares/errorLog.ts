import { Request, Response, NextFunction } from 'express';

export function errorLog(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error);
  next(error);
}
