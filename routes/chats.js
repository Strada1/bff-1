const express = require('express');
const router = express.Router();
const authorization = require('../midlewares/authorization');
const authentication = require('../midlewares/authentication');
const { getAllChats,  getChat, creatChat, findAndUpdate, findAndDelete } = require('../services/chat')

router.get('/',
    authentication,
    authorization,
    async (req, res) => {
        try {
            const allChats = await getAllChats();
            console.log('allChatsallChats', allChats)
            return res.status(201).send(allChats);
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
            const chat = await getChat(id);
            return res.status(201).send(chat);
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
            const { title, usersId } = req.body;

            const chat = await creatChat(title, usersId);

            return res.status(201).send(chat);
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
            const { title, usersId } = req.body;
            const { id } = req.params;          

            const chat = await findAndUpdate(id,
                {
                    title: title,
                    users: usersId
                },
                { new: true });
            return res.status(201).send(chat);
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