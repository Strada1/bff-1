const { body } = require('express-validator');

const movieCreateValidation = [
  body('title', 'Введите название фильма').isLength({ min: 3 }).isString(),
  body('year', 'Введите год выпуска').isNumeric(),
  body('category', 'Неверный формат категорий').optional().isString(),
  body('director', 'Неверная формат режисера').optional().isString(),
  body('rating', 'Неверная формат рейтинга').optional().isNumeric(),
];

module.exports = {
  movieCreateValidation,
};
