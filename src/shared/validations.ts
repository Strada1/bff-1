import { query } from 'express-validator';

export const SORT_ORDER_VALUES = [
  '',
  -1,
  1,
  'asc',
  'ascending',
  'desc',
  'descending',
];

export const sortOrderValidation = [
  query('sort')
    .optional()
    .isIn(SORT_ORDER_VALUES)
    .withMessage(
      `Wrong sort query, valid varations: ${SORT_ORDER_VALUES.join(', ')}`
    ),
];
