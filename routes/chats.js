const express = require('express');
const router = express.Router();

router.get('/',
    authorization,
    authentication,
    async (req, res) => {
        try {
            const allChats = await getAllChats();
            return res.status(201).send(allChats);
        } catch (err) {
            return res.status(500).send(err);
        }
    });

router.get('/:id',
    authorization,
    async (req, res) => {
        try {
            const { id } = req.params;
            const chat = await getChat(id);
            return res.status(201).send(chat);
        } catch (err) {
            return res.status(500).send(err);
        }
    });

router.post('/',
    userValidatorSchema,
    validate,
    authorization,
    async (req, res) => {
        try {
            const { title, users } = req.body;
            const chat = await creatChat(title, users);

            return res.status(201).send(chat);
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
            const { title, users } = req.body;
            const id = req.params.id;            
            const chat = await findAndUpdate(id,
                {
                    title: title,
                    users: [users]
                },
                { new: true });
            return res.status(201).send(chat);
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
            const deletedChat = await findAndDelete(id);
            if (!deletedChat) {
                return res.status(400).send('chat not found');
            }

            return res.status(201).send('chat deleted');
        } catch (err) {
            return res.status(500).send(err);
        }
    });


module.exports = router;