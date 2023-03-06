const Message = require('../../server/models/Message');

const createMessage = async (user_id, chat_id) => {
  return await Message.create({
    text: 'Testing message',
    user: user_id ?? undefined,
    chat_id: chat_id ?? undefined,
    created_at: new Date(),
  });
};

const deleteMessage = (id) => {
  return Message.findByIdAndDelete({ _id: id }).lean();
};

const updateMessage = (id, { text }) => {
  return Message.findByIdAndUpdate({ _id: id }, { text }).lean();
};

module.exports = { createMessage, deleteMessage, updateMessage, };