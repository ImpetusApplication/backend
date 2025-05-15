const express = require('express');
const UserController = require('../controller/UserController');

const router = express.Router();

router.post('/', (req, res) => UserController.createUser(req, res));

module.exports = router;