const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

let users = [];

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.locals.data = { message: 'User registered successfully' };
    res.status(201).end();
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.locals.data = { token };
        res.status(200).end();
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

router.put('/profile', (req, res) => {
    const { username, newPassword } = req.body;
    const user = users.find(u => u.username === username);
    if (user) {
        user.password = bcrypt.hashSync(newPassword, 10);
        res.locals.data = { message: 'Profile updated successfully' };
        res.status(200).end();
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

module.exports = router;