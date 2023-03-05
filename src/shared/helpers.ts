import { ROLES } from './const';

export function convertQueryToArray(string: string) {
  return string ? string.split(',') : [];
}

export function validateLength(
  value: string,
  { min, max }: { min: number; max: number }
) {
  return value?.length > min && value?.length < max;
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

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function getTokenFromBearerString(authorization: string) {
  return authorization ? authorization.split(' ')[1] : '';
}
