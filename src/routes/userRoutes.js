const express = require('express');
const UserController = require('../controller/UserController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Endpoints para gerenciamento de usuários
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Autenticação de usuário (login)
 *     tags: [Usuários]
 *     requestBody:
 *       description: Dados para autenticação
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@exemplo.com
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso. Retorna token JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: Dados do usuário autenticado
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticação
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', (req,res) => UserController.login(req,res));
router.post('/', (req, res) => UserController.createUser(req, res));
router.get('/me', authMiddleware, (req,res) => UserController.getUserIdFromToken(req,res));

module.exports = router;