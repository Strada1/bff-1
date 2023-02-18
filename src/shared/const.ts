export const CACHE_KEYS = {
  ALL_MOVIES: 'ALL_MOVIES',
  ALL_CATEGORIES: 'ALL_CATEGORIES',
  ALL_DIRECTORS: 'ALL_DIRECTORS',
};

export const SORT_ORDER_VALUES = [
  '',
  -1,
  1,
  'asc',
  'ascending',
  'desc',
  'descending',
];

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

export const ERROR_TEXT = {
  SERVER: {
    INTERNAL_ERROR: 'Internal server error',
    TOO_MANY_REQUESTS: 'Too many requests from this IP, please try again later',
  },
  AUTH: {
    NOT_ENOUGH_RIGHTS: 'Not enough rights',
  },
  USERS: {
    NOT_VALID_ROLE: 'Not valid role',
    USER_EXIST: 'User with this email already exists',
    USER_NOT_FOUND: 'User not found',
    WRONG_USER_OR_PASSWORD: 'User not found or incorrect password',
  },
  CATEGORIES: {
    CATEGORY_NOT_FOUND: 'Category not found',
  },
  COMMENTS: {
    COMMENT_NOT_FOUND: 'Comment not found',
  },
  DIRECTORS: {
    DIRECTOR_NOT_FOUND: 'Director not found',
  },
  MOVIES: {
    MOVIE_NOT_FOUND: 'Movie not found',
  },
};
