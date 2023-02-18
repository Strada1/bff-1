import { ROLES } from './const';

export function convertQueryToArray(string: string) {
  return string ? string.split(',') : [];
}

export function createLengthErrorMessage(
  field: string,
  { min, max }: { min?: number; max?: number }
) {
  if (min === max) {
    return `${field} length must be ${min} characters`;
  }

  if (min && !max) {
    return `${field} must be at least ${min} characters long`;
  }

  if (!min && max) {
    return `${field} must be less than ${max} characters`;
  }

  if (!min && !max) {
    return '';
  }

  return `${field} must be between ${min} and ${max} characters long`;
}

export function isAdmin(roles: string[]) {
  return roles.includes(ROLES.ADMIN);
}
