const express = require('express');
const router = express.Router();

router.get('/:chatId',
    authorization,
    authentication,
    async (req, res) => {
        try {
            const { chatId } = req.params;
            const user = req.body.user;
            const messages = await getAllMessages(chatId, user);
            if (!messages) {
                return res.status(400).send('messages not found');
            }
            return res.status(201).send(messages);
        } catch (err) {
            return res.status(500).send(err);
        }
    });

router.get('/:id',
    authorization,
    async (req, res) => {
        try {
            const { id } = req.params;
            const message = await getMessage(id);
            return res.status(201).send(message);
        } catch (err) {
            return res.status(500).send(err);
        }
    });

router.post('/',
    userValidatorSchema,
    validate,
    async (req, res) => {
        try {
            const { user, chatId, text } = req.body;
            const message = await createMessage({ user, chatId, text });
            return res.status(201).send(message);
        } catch (err) {
            return res.status(500).send(err);
        }
    });

router.put('/:id',
    userPostValidatorSchema,
    validate,
    authentication,
    authorization,
    async (req, res) => {
        try {
            const { user, chatId, text } = req.body;
            const id = req.params.id;
            const message = await findAndUpdate(id,
                { user, chatId, text },
                { new: true });
            return res.status(201).send(message);
        } catch (err) {
            return res.status(500).send(err);
        }
    });

router.delete('/:id',
    userDeleteValidatorSchema,
    validate,
    authentication,
    authorization,
    async (req, res) => {
        try {
            const id = req.params.id;
            const deleteMessage = await findAndDelete(id);
            if (!deleteMessage) {
                return res.status(400).send('message not found');
            }

            return res.status(201).send('message deleted');
        } catch (err) {
            return res.status(500).send(err);
        }
    });


module.exports = router;