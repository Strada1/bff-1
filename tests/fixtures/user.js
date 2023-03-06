const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const createUser = (isAdmin = true, CreateInDb, notValidFields = []) => {

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

    if (CreateInDb) return User.create(testUser);
    
    return testUser;
};


module.exports = createUser;