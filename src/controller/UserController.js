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

      if(!email || !password){
        return res.status(400).json({
          error: "Email ou senha são obrigatorios"
        });
      }
      const { token } = await UserService.login(email, password);
      return res.json({ token });
    } catch (err) {
      console.error('Erro ao fazer login:', err.message);

      if (err.message.includes('não encontrado') || err.message.includes('inválidos')) {
        return res.status(401).json({ error: err.message });
      }

      return res.status(500).json({ error: 'Error interno no servidor.' });
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
  async verificar(req, res) {
    const userId = req.user?.id;
    const { codigoEnviado } = req.body;

    if (!codigoEnviado) {
        return res.status(400).json({ error: 'Usuário e código de verificação são obrigatórios.' });
    }

    try {
        const resultado = await UserService.verificar(userId, codigoEnviado);  // Agora passando userId correto
        return res.json(resultado);
    } catch (error) {
        console.error('Erro ao verificar o código:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

  async enviarCodigo(req,res){
    const userId = req.user?.id;
    const user = await UserService.getUser(userId);

    UserService.enviaEmailsalvaRedis(user)

    res.status(200).json({mensagem: "código enviado com sucesso !!"});
  }
}

module.exports = new UserController();