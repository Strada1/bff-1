const express = require('express');
const router = express.Router();
const { createToken } = require('../helpers/token');
const authorization = require('../midlewares/authorization');
const authentication = require('../midlewares/authentication');
const { getAllUsers,  getUser, createUser, findAndUpdate, findAndDelete, addChat, removeChat, findOneByToken } = require('../services/user')

router.get('/',
authentication,
authorization,
    async (req, res) => {
        try {
            const allUsers = await getAllUsers();
            return res.status(201).send(allUsers);
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
            const user = await getUser(id);
            return res.status(201).send(user);
        } catch (err) {
            return res.status(500).send(err);
        }
    });

router.post('/',
    //userValidatorSchema,
    //validate,
    async (req, res) => {
        try {
            const { email, password, username, roles } = req.body;
            const token = createToken(email, password);
            const user = await createUser({ email, token, username, roles });

            return res.status(201).send(user);
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
            const { email, password, username, roles } = req.body;
            const { id } = req.params;
            const token = createToken(email, password);
            const user = await findAndUpdate(id,
                {
                    email: email,
                    token: token,
                    username: username,
                    roles: roles,
                },
                { new: true });
            return res.status(201).send(user);
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
            const deletedUser = await findAndDelete(id);
            if (!deletedUser) {
                return res.status(400).send('user not found');
            }

            return res.status(201).send('user deleted');
        } catch (err) {
            return res.status(500).send(err);
        }
    });


router.put('/:id/chats',
    //userAddChatsValidatorSchema,
    //validate,
    authentication,
    authorization,
    async (req, res) => {
        const { id } = req.params;
        const { chatId } = req.body;
        try {
            const user = await addChat(id, chatId, { new: true });

            return res.status(201).send(user);
        } catch (err) {
            return res.status(500).send(err);
        }
    });

router.delete('/:id/chats',
    //userAddChatsValidatorSchema,
    //validate,
    authentication,
    authorization,
    async (req, res) => {
        const { id } = req.params;
        const { chatId } = req.body;
        try {
            const user = await removeChat(id, chatId, { new: true });

            return res.status(201).send(user);
        } catch (err) {
            return res.status(500).send(err);
        }
    });


module.exports = router;