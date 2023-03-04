const express = require('express');
const router = express.Router();

router.get('/',
    authorization,
    authentication,
    async (req, res) => {
        try {
            const allUsers = await getAllUsers();
            return res.status(201).send(allUsers);
        } catch (err) {
            return res.status(500).send(err);
        }
    });

router.get('/:id',
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
    userValidatorSchema,
    validate,
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

router.get('/auth',
    userPostValidatorSchema,
    validate,
    async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await findOneByEmail({ email });
            if (user === null) {
                return res.status(401).send('This user was not found');
            }

            const payload = verifyToken(user.token);

            if (password !== payload.password) {
                return res.status(401).send('Token does not found');
            }

            return res.status(201).send(user.token);
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
            const { email, password, username, roles } = req.body;
            const id = req.params.id;
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
    userDeleteValidatorSchema,
    validate,
    authentication,
    authorization,
    async (req, res) => {
        try {
            const id = req.params.id;
            const deletedUser = await findAndDelete(id);
            if (!deletedUser) {
                return res.status(400).send('user not found');
            }

            return res.status(201).send('user deleted');
        } catch (err) {
            return res.status(500).send(err);
        }
    });


module.exports = router;