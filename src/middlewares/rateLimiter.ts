import rateLimit, { Options } from 'express-rate-limit';
import Mili from 'miliseconds';
import STATUS from 'http-status';
import ApiError from '../shared/ApiError';
import { ERROR_TEXT } from '../shared/const';

// TODO rewrite to fingerprint verification instead of ip

export const rateLimiter = (
  options: Partial<Options> = {
    windowMs: new Mili().hours(1).value(),
    max: 1000,
    standardHeaders: true,
    legacyHeaders: false,
  }
) =>
  rateLimit({
    ...options,
    handler: () => {
      throw new ApiError(
        STATUS.TOO_MANY_REQUESTS,
        ERROR_TEXT.SERVER.TOO_MANY_REQUESTS
      );
    },
  });
