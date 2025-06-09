const express = require('express');
const UserController = require('../controller/UserController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/login', (req, res) => UserController.login(req, res));
router.post('/', (req, res) => UserController.createUser(req, res));
router.get('/me', authMiddleware, (req, res) => UserController.getUserIdFromToken(req, res));

module.exports = router;    