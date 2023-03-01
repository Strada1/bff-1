const PATHS = {
  AUTH: '/authorization',
  USERS: {
    ALL: '/users',
    BY_ID: '/users/:userId',
    FAVORITE_MOVIES: {
      ALL: '/users/:userId/favoriteMovies',
      BY_ID: '/users/:userId/favoriteMovies/',
    },
  },
  HOME: '/',
  MOVIES: {
    ALL: '/movies',
    BY_ID: '/movies/:movieId',
    MOVIES_COUNT_BY_DIRECTOR_ID: '/moviesCountByDirectorId/:directorId',
    MOVIES_COUNT_BY_YEAR_INTERVAL: '/moviesCountByYearsInterval',
  },
  CATEGORIES: {
    ALL: '/categories',
    BY_ID: '/categories/:categoryId',
  },
  COMMENTS: {
    ALL: '/movies/:movieId/comments',
    BY_ID: '/movies/:movieId/comments/:commentId',
  },
  DIRECTORS: {
    ALL: '/directors',
    BY_ID: '/directors/:directorId',
  },
};

const INFO_MSG = {
  FIELD_IS_CREATED: 'Поле успешно добавлено.',
  FIELD_IS_DELETED: 'Поле успешно удалено.',
  FIELD_IS_NOT_CREATED: 'Не получилось добавить поле.',
  FIELD_IS_NOT_DELETED: 'Не получилось удалить поле.',
};

module.exports = {
  PATHS,
  INFO_MSG,
};
