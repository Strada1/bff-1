import { Request, Response, NextFunction } from 'express';
import STATUS from 'http-status';
import { IUser } from '../models/users.model';
import ApiError from '../shared/ApiError';
import { ERROR_TEXT } from '../shared/const';

export function authorization(roles: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser;
    const userRoles = user?.roles;

    if (!userRoles) {
      return next(
        new ApiError(STATUS.UNAUTHORIZED, ERROR_TEXT.AUTH.NOT_ENOUGH_RIGHTS)
      );
    }

    for (let i = 0; i < userRoles.length; i += 1) {
      const role = userRoles[i];
      if (roles.includes(role)) {
        return next();
      }
    }

    next(new ApiError(STATUS.UNAUTHORIZED, ERROR_TEXT.AUTH.NOT_ENOUGH_RIGHTS));
  };
}
