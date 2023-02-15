const { body, param } = require('express-validator')



const validateParamId = (paramValue) => {
  return param(paramValue, `${paramValue} should be mongo id`).exists().isMongoId()
}

const validateStringField = (fieldName) => {
  return body(fieldName)
  .exists()
  .withMessage(`${fieldName} is not exists`)
  .bail()
  .not()
  .isEmpty()
  .withMessage(`${fieldName} is empty`)
}

const validateMongoIdField = (fieldName) => {
  return body(fieldName)
  .exists()
  .withMessage(`${fieldName} is not exists`)
  .bail()
  .isMongoId()
  .withMessage(`${fieldName} should be a mongo id`)
}

const validateNumericField = (fieldName) => {
  return body(fieldName)
  .exists()
  .withMessage(`${fieldName} is not exists`)
  .bail()
  .not()
  .isEmpty()
  .withMessage(`${fieldName} is empty`)
  .bail()
  .isNumeric()
  .withMessage(`${fieldName} should be a number`)
}

module.exports = { validateMongoIdField, validateNumericField, validateParamId, validateStringField } 