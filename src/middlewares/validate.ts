import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import STATUS from 'http-status';
import ApiError from '../shared/ApiError';

export function validate(validations: ValidationChain[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    next(new ApiError(STATUS.BAD_REQUEST, 'validation error', errors.array()));
  };
}
