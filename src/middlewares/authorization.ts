import { Request, Response, NextFunction } from 'express';
import STATUS from 'http-status';
import { IUser } from '../models/users.model';
import ApiError from '../shared/ApiError';
import { ERROR_TEXT } from '../shared/const';

export function authorization(roles: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser;

    if (!user) {
      return next(
        new ApiError(STATUS.BAD_REQUEST, ERROR_TEXT.AUTH.NOT_ENOUGH_RIGHTS)
      );
    }

    if (!user.roles) {
      return next(
        new ApiError(
          STATUS.INTERNAL_SERVER_ERROR,
          ERROR_TEXT.SERVER.INTERNAL_ERROR
        )
      );
    }

    for (let i = 0; i < user.roles.length; i += 1) {
      const role = user.roles[i];
      if (roles.includes(role)) {
        return next();
      }
    }

    next(new ApiError(STATUS.BAD_REQUEST, ERROR_TEXT.AUTH.NOT_ENOUGH_RIGHTS));
  };
}
