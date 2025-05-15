const User = require('../model/User');

class UserRepository {

    // Cria um usuario
    async create(userData){

        try{
            const user = await User.create(userData);
            return user;
        }
        catch(error){
            throw new Error('Falha ao salvar usuario: ' + error);
        }
    }

    // Busca todos os usuarios no banco de dados
    async findAll(){
        const users = await User.findAll();
        return users;
    }

    // Busca um usuario por ID
    async findById(id){
        const user = await User.findById(id);
        return user;
    }

    async findByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    // Delete um usuario por ID
    async delete(id){
        const user = await this.findById(id);
        if(!user){
            return false;
        }
        await user.destroy();
        return true;
    }
}

module.exports = new UserRepository();