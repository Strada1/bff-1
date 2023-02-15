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



module.exports = { userPostValidatorSchema };