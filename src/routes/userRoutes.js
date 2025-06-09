const express = require('express');
const UserController = require('../controller/UserController');
const authMiddleware = require('../middleware/authMiddleware');
const verifyUserVerified = require('../middleware/verifyUserVerified');
const router = express.Router();

router.post('/login', (req, res) => UserController.login(req, res));
router.post('/', (req, res) => UserController.createUser(req, res));
router.get('/me', authMiddleware, (req, res) => UserController.getUserIdFromToken(req, res));
router.post('/verificar',authMiddleware,(req, res) => UserController.verificar(req, res));
router.get('/enviarCodigo',authMiddleware,(req, res) => UserController.enviarCodigo(req, res));

router.get('/verify', authMiddleware, verifyUserVerified, (req, res) => {
  // Se passar pelos middlewares, o usuário está autenticado e verificado
  return res.json({ message: 'Usuário autenticado e verificado com sucesso!' });
});

module.exports = router;    