const UserService = require('../service/UserService');
const UserMapper = require('../mapper/UsuarioMapper');

class UserController {
  async createUser(req, res) {
    try {
      const userModel = UserMapper.toUserModel(req.body);
      const user = await UserService.createUser(userModel);
      const userResponse = UserMapper.toUserResponse(user);
      return res.status(201).json(userResponse);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { user, token } = await UserService.login(email, password);
      return res.json({ token });
    } catch (err) {
      return res.status(401).json({ error: err.message });
    }
  }

  async getUserIdFromToken(req, res) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      const user = await UserService.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      const response = UserMapper.toUserResponse(user);

      return res.json(response);
      
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno: ' + error.message });
    }
  }
}

module.exports = new UserController();