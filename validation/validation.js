const { body } = require('express-validator');

const movieCreateValidation = [
  body('title', 'Введите название фильма').isLength({ min: 3 }).isString(),
  body('year', 'Введите год выпуска').isNumeric(),
  body('category', 'Неверный формат категорий').optional().isString(),
  body('director', 'Неверная формат режисера').optional().isString(),
  body('rating', 'Неверная формат рейтинга').optional().isNumeric(),
];

const userRegisterValidation = [
  body('email', 'Неверный формат Email').isEmail(),
  body('password', 'Пароль должен содерждать мнимум 5 символов').isLength({ min: 5 }),
  body('username', 'Имя пользователя должно быть минимум 3 символа').isLength({ min: 3 }).isString(),
  body('roles', 'Поле roles должно быть массивом').isArray().optional(),
];

const userLoginValidation = [
  body('email', 'Неверный формат Email').isEmail(),
  body('password', 'Пароль должен содерждать мнимум 5 символов').isLength({ min: 5 }),
];
module.exports = {
  movieCreateValidation,
  userRegisterValidation,
  userLoginValidation,
};
