const UserRepository = require('../repository/UserRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET

class UserService{

    async createUser(userData){
        if (!userData) {
            throw new Error('Dados do usuário são obrigatórios');
        }
        if(!userData.name || !userData.password || !userData.email || !userData.birthdate){
            throw new Error('Preencha todos os campos obrigatórios');
        }

        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password,salt);

        const user = await UserRepository.create(userData);
        return user;
    }

    async login(email, password){

        if(!email || !password){
            throw new Error('Email e senha são obrigatórios.');
        }

        const user = await UserRepository.findByEmail(email);

        if(!user){
            throw new Error('Usuario não encontrado !');
        }

        const valid = await bcrypt.compare(password, user.password);

        if(!valid){
            throw new Error('Email ou senha inválidos.');
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        return {user, token};
    }

    async getUser(id){
        const user = UserRepository.findById(id);
        if(!user){
            throw new Error('Usuário não encontrado');
        }
        return user;
    }
}

module.exports = new UserService();