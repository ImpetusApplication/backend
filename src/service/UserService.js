const UserRepository = require('../repository/UserRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');  // Importa o Nodemailer
require('dotenv').config();
const redis = require('../config/radisConfig');
const JWT_SECRET = process.env.JWT_SECRET;

class UserService {
    async createUser(userData) {
        if (!userData) {
            throw new Error('Dados do usuário são obrigatórios');
        }
        if (!userData.name || !userData.password || !userData.email || !userData.birthdate) {
            throw new Error('Preencha todos os campos obrigatórios');
        }
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);
        const user = await UserRepository.create(userData);
        return user;
    }

    // Login do usuário
    async login(email, password) {
        if (!email || !password) {
            throw new Error('Email e senha são obrigatórios.');
        }

        const user = await UserRepository.findByEmail(email);

        if (!user) {
            throw new Error('Usuário não encontrado!');
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            throw new Error('Email ou senha inválidos.');
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        return { user, token };
    }

    // Obter usuário pelo ID
    async getUser(id) {
        const user = await UserRepository.findById(id);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        return user;
    }

    async verificar(userId, codigoEnviado) {
    try {
        const codigo = await redis.get(`verificationCode:${userId}`);

        if (!codigo) {
            throw new Error("Código não encontrado no Redis ou expirado");
        }

        // Compara o código enviado com o código armazenado
        if (codigo === codigoEnviado) {
            // Marca o usuário como verificado
            await UserRepository.verificar(userId);

            // Deleta o código do Redis após a verificação
            await redis.del(`verificationCode:${userId}`);

            return { sucesso: true, mensagem: 'Usuário verificado com sucesso.' };
        } else {
            throw new Error("Código incorreto, tente novamente.");
        }
    } catch (error) {
        console.error("Erro interno:", error);
        throw new Error("Erro ao verificar código de verificação.");
    }
}

    // Verificar se o usuário está verificado e enviar código de verificação
    async enviaEmailsalvaRedis(userData) {
        if (userData.isVerificad) {
            throw new Error('Usuário já está verificado');
        }

        if(await redis.get(`verificationCode:${userData.id}`)){
            await redis.del(`verificationCode:${userData.id}`);
        }
        const codigoVerificacao = this.gerarCodigoVerificacao();

        // 5 minutos de expiração para o código
        await redis.setex(`verificationCode:${userData.id}`, 5 * 60, codigoVerificacao);

        // Enviar o código para o e-mail do usuário
        await this.enviarCodigoEmail(userData, codigoVerificacao);
    }

    // Gera um código de verificação aleatório
    gerarCodigoVerificacao() {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let codigo = '';
        for (let i = 0; i < 6; i++) {
            codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return codigo;
    }

    // Função para enviar o código por e-mail
    async enviarCodigoEmail(userData, codigoVerificacao) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userData.email,
            subject: 'Código de validação - Impetus',
            html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ASHUASHUA</title>
</head>
<body>
    <H1>CÓDIGO DE VALIDAÇÃO</H1>
    <br>
    <H1>${codigoVerificacao}</H1>
</body>
</html>`
        };

        try {
            // Enviar e-mail e aguardar a resposta
            const info = await transporter.sendMail(mailOptions);
            console.log('E-mail enviado: ' + info.response);
        } catch (error) {
            console.log('Erro ao enviar o e-mail:', error);
            throw new Error('Erro ao enviar o código de verificação por e-mail.');
        }
    }
}

module.exports = new UserService();