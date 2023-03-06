const Chat = require('../../models/Chat')

const createChat = (userId, notValidFields = []) => {
    const testChat = {
        title: 'Favorite',
        users: [userId],
    }

    if (notValidFields.length > 0) {
        for (const key of Object.keys(testChat)) {
            notValidFields.forEach(field => {
                if (field === key) {
                    testChat[key] = ''
                }
            });
        }
    }
    return  Chat.create(testChat);
};

module.exports = createChat;