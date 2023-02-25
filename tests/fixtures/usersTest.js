const createTestUser = (notValidFields = []) => {

    const testUser = {
        email: 'test@gmail.com',
        password: '12345',
        username: 'USER',
        roles: ['user'],
        favorites: [],
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
    return testUser;
};

module.exports = createTestUser;