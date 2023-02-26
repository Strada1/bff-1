const { body, param } = require('express-validator');

const userPostValidatorSchema = [
    body('email')
        .exists({ checkFalsy: true })
        .withMessage(`Fill in the 'Email' field`)
        .bail()
        .isEmail()
        .withMessage("email not valid"),
    body('password')
        .exists({ checkFalsy: true })
        .withMessage(`Fill in the 'Password' field`)
        .bail()
        .isLength({ min: 5 })
        .withMessage(`Pssword must be at least five characters long.`),
];

const userDeleteValidatorSchema = [
    param('userId')
        .exists({ checkFalsy: true })
        .withMessage(`User ID not found in request`)
        .isMongoId()
        .withMessage(`Incorrect User ID`)
];

const userAddFavoritesValidatorSchema = [
    param('userId')
        .exists({ checkFalsy: true })
        .withMessage(`User ID not found in request`)
        .isMongoId()
        .withMessage(`Incorrect User ID`),
    body('favoriteMovieId')
        .exists({ checkFalsy: true })
        .withMessage(`Fill in the 'favorite' field`)
        .isMongoId()
        .withMessage(`Incorrect movie ID`),
]


module.exports = { userPostValidatorSchema, userDeleteValidatorSchema, userAddFavoritesValidatorSchema };