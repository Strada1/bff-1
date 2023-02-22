const { body, param } = require('express-validator');

const moviePostValidatorSchema = [
    body('title')
        .exists({ checkFalsy: true })
        .withMessage(`Fill in the 'Title' field`),
    body('year')
        .exists({ checkFalsy: true })
        .withMessage(`Fill in the 'Year' field`),
    body('duration')
        .exists({ checkFalsy: true })
        .withMessage(`Fill in the 'Duration' field`),
    body('director')
        .exists({ checkFalsy: true })
        .withMessage(`Fill in the 'Director' field`)
        .isMongoId()
        .withMessage(`Incorrect Director ID`),
    body('category')
        .exists({ checkFalsy: true })
        .withMessage(`Fill in the 'Category' field`)
        .isMongoId()
        .withMessage(`Incorrect Category ID`),
    body('description')
        .exists({ checkFalsy: true })
        .withMessage(`Fill in the 'Description' field`)
];

const movieDeleteValidatorSchema = [
    param('movieId')
        .exists({ checkFalsy: true })
        .withMessage(`Movie ID not found in request`)
        .isMongoId()
        .withMessage(`Incorrect Movie ID`)
];

const movieEditValidatorSchema = [
    param('movieId')
        .exists({ checkFalsy: true })
        .withMessage(`Movie ID not found in request`)
        .isMongoId()
        .withMessage(`Incorrect Movie ID`),
    body('title')
        .exists({ checkFalsy: true })
        .withMessage(`Fill in the 'Title' field`),
    body('year')
        .exists({ checkFalsy: true })
        .withMessage(`Fill in the 'Year' field`),
    body('duration')
        .exists({ checkFalsy: true })
        .withMessage(`Fill in the 'Duration' field`),
    body('director')
        .exists({ checkFalsy: true })
        .withMessage(`Fill in the 'Director' field`)
        .isMongoId()
        .withMessage(`Incorrect Director ID`),
    body('category')
        .exists({ checkFalsy: true })
        .withMessage(`Fill in the 'Category' field`)
        .isMongoId()
        .withMessage(`Incorrect Category ID`),
    body('description')
        .exists({ checkFalsy: true })
        .withMessage(`Fill in the 'Description' field`)
];


module.exports = { moviePostValidatorSchema, movieDeleteValidatorSchema, movieEditValidatorSchema };