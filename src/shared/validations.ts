import { query } from 'express-validator';
import { SORT_ORDER_VALUES } from './const';

export const sortOrderValidation = [
  query('sort')
    .optional()
    .isIn(SORT_ORDER_VALUES)
    .withMessage(
      `Wrong sort query, valid varations: ${SORT_ORDER_VALUES.join(', ')}`
    ),
];
