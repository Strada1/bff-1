const { body, param } = require('express-validator');

const commentGetValidatorSchema = [
    param('movieId')
        .exists({ checkFalsy: true })
        .withMessage(`Movie ID not found in request`)
        .isMongoId()
        .withMessage(`Incorrect Movie ID`)
];

const commentGetOneValidatorSchema = [
    param('movieId')
        .exists({ checkFalsy: true })
        .withMessage(`Movie ID not found in request`)
        .isMongoId()
        .withMessage(`Incorrect Movie ID`),
    param('commentId')
        .exists({ checkFalsy: true })
        .withMessage(`Comment ID not found in request`)
        .isMongoId()
        .withMessage(`Incorrect Comment ID`)
];

const commentPostValidatorSchema = [
    param('movieId')
        .exists({ checkFalsy: true })
        .withMessage(`Movie ID not found in request`)
        .isMongoId()
        .withMessage(`Incorrect Movie ID`),
    body('comment')
        .isLength({ min: 5 })
        .withMessage(`Comment must be at least five characters long.`),
];

const commentEditValidatorSchema = [
    param('movieId')
        .exists({ checkFalsy: true })
        .withMessage(`Movie ID not found in request`)
        .isMongoId()
        .withMessage(`Incorrect Movie ID`),
    param('commentId')
        .exists({ checkFalsy: true })
        .withMessage(`Comment ID not found in request`)
        .isMongoId()
        .withMessage(`Incorrect Comment ID`),
    body('comment')
        .isLength({ min: 5 })
        .withMessage(`Comment must be at least five characters long.`),
];


module.exports = { commentGetValidatorSchema, commentGetOneValidatorSchema, commentPostValidatorSchema, commentEditValidatorSchema };