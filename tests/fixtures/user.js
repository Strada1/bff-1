const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');

const createUser = (isAdmin = false, notValidFields = []) => {

    const roles = isAdmin ? 'admin' : 'user';

    const testUser = {
        email: "test@gmail.com",
        username: "USER",
        password: '12345',
        chats: [],
        roles: [roles]
    }

    if (notValidFields.length > 0) {
        for (const key of Object.keys(testUser)) {
            notValidFields.forEach(field => {
                if (field === key) {
                    testUser[key] = ''
                }
            });
        }
    }

    testUser.token = jwt.sign(
        { email: testUser.email, password: testUser.password },
        process.env.JWT_SECRET
    );
    return User.create(testUser);
};


module.exports = createUser;