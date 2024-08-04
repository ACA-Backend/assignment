const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const users = [];

// Validation schemas
const registerSchema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required()
});

// Register - POST /users/register
router.post('/register', async (req, res) => {
    try {
        const { error } = registerSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const { username, password } = req.body;
        const existingUser = users.find(user => user.username === username);
        if (existingUser) return res.status(400).send('User already exists');

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { id: users.length + 1, username, password: hashedPassword };
        users.push(newUser);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Login - POST /users/login
router.post('/login', async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const { username, password } = req.body;
        const user = users.find(user => user.username === username);
        if (!user) return res.status(400).send('Invalid credentials');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');

        const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
