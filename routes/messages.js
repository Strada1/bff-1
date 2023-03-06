const express = require('express');
const router = express.Router();
const authorization = require('../midlewares/authorization');
const authentication = require('../midlewares/authentication');
const { getAllMessages, getMessage, createMessage, findAndUpdate, findAndDelete } = require('../services/message');

router.get('/chat/:chatId',
authentication,
authorization,
    async (req, res) => {
        try {
            const { chatId } = req.params;
            const userId = req.body.user;
            const messages = await getAllMessages(userId, chatId);
            if (!messages) {
                return res.status(403).send('you can not get messages from this chat');
            }
            return res.status(201).send(messages);
        } catch (err) {
            return res.status(500).send(err);
        }
    });

router.get('/:id',
authentication,
authorization,
    async (req, res) => {
        try {
            const { id } = req.params;
            console.log('messageIdmessageId', id)
            const message = await getMessage(id);
            if (!message) {
                return res.status(403).send('you can not get this message');
            }
            return res.status(201).send(message);
        } catch (err) {
            return res.status(500).send(err);
        }
    });

router.post('/',
    //userValidatorSchema,
    //validate,
    authentication,
    authorization,
    async (req, res) => {
        try {
            const { userId, chatId, text } = req.body;

            const message = await createMessage({ userId, chatId, text });
            if (!message) {
                return res.status(403).send('you can not post message in this chat');
            }
            return res.status(201).send(message);
        } catch (err) {
            return res.status(500).send(err);
        }
    });

router.put('/:id',
    //userPostValidatorSchema,
    //validate,
    authentication,
    authorization,
    async (req, res) => {
        try {
            const { userId, chatId, text } = req.body;
            const id = req.params.id;
            const message = await findAndUpdate(id,
                { userId, chatId, text },
                { new: true });
                if (!message) {
                    return res.status(403).send('you can not edit this message');
                }
            return res.status(201).send(message);
        } catch (err) {
            return res.status(500).send(err);
        }
    });

router.delete('/:id',
    //userDeleteValidatorSchema,
    //validate,
    authentication,
    authorization,
    async (req, res) => {
        try {
            const { id } = req.params;
            const deleteMessage = await findAndDelete(id);
            if (!deleteMessage) {
                return res.status(403).send('you can not delete this message');
            }
            return res.status(201).send('message deleted');
        } catch (err) {
            return res.status(500).send(err);
        }
    });


module.exports = router;