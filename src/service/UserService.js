const UserRepository = require('../repository/UserRepository');
const bcrypt = require('bcrypt');

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
}

module.exports = new UserService();