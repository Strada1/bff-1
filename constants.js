const PATHS = {
  HOME: '/',
  MOVIES: {
    ALL: '/movies',
    BY_ID: '/movies/:movieId',
  },
  CATEGORIES: {
    ALL: '/categories',
    BY_ID: '/categories/:categoryId',
  },
  COMMENTS: {
    ALL: '/movies/:movieId/comments',
    BY_ID: '/movies/:movieId/comments/:commentId',
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
