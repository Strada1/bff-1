const { body, param } = require('express-validator');

const categoryPostValidatorSchema = [
    body('title')
        .exists({ checkFalsy: true })
        .withMessage(`Fill in the 'Title' field`),
];

const categoryDeleteValidatorSchema = [
    param('categoryId')
        .exists({ checkFalsy: true })
        .withMessage(`Category ID not found in request`)
        .isMongoId()
        .withMessage(`Incorrect Category ID`)
];

const categoryEditValidatorSchema = [
    param('categoryId')
        .exists({ checkFalsy: true })
        .withMessage(`Director ID not found in request`)
        .isMongoId()
        .withMessage(`Incorrect Director ID`),
    body('title')
        .exists({ checkFalsy: true })
        .withMessage(`Fill in the 'Title' field`),
];


module.exports = { categoryPostValidatorSchema, categoryDeleteValidatorSchema, categoryEditValidatorSchema };