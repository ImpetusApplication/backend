const UserService = require('../service/UserService');

async function verifyUserVerified(req, res, next) {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    try {
        const user = await UserService.getUser(userId);

        if (user && user.isverificad) {
            return next();
        } else {
            return res.status(403).json({ error: 'Usuário não verificado' });
        }
    } catch (error) {
        console.error("Erro ao verificar o status de verificação:", error.message);
        return res.status(500).json({ error: 'Erro interno: ' + error.message });
    }
}

module.exports = verifyUserVerified;
