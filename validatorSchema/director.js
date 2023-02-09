const { body, param } = require('express-validator');

const directorPostValidatorSchema = [
    body('name')
        .exists({ checkFalsy: true })
        .withMessage(`Fill in the 'Name' field`),
    body('surname')
        .exists({ checkFalsy: true })
        .withMessage(`Fill in the 'Surname' field`),
    body('yearOfBirth')
        .exists({ checkFalsy: true })
        .withMessage(`Fill in the 'Year of birth' field`),
];

const directorDeleteValidatorSchema = [
    param('directorId')
        .exists({ checkFalsy: true })
        .withMessage(`Director ID not found in request`)
        .isMongoId()
        .withMessage(`Incorrect Director ID`)
];

const directorEditValidatorSchema = [
    param('directorId')
        .exists({ checkFalsy: true })
        .withMessage(`Director ID not found in request`)
        .isMongoId()
        .withMessage(`Incorrect Director ID`),
    body('name')
        .exists({ checkFalsy: true })
        .withMessage(`Fill in the 'Name' field`),
    body('surname')
        .exists({ checkFalsy: true })
        .withMessage(`Fill in the 'Surname' field`),
    body('yearOfBirth')
        .exists({ checkFalsy: true })
        .withMessage(`Fill in the 'Year of birth' field`),
];


module.exports = { directorPostValidatorSchema, directorDeleteValidatorSchema, directorEditValidatorSchema };