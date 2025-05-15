const User = require('../model/User');
const UserService = require('../service/UserService');

class UserController {

    async createUser(req,res){
        try{
            const user = await UserService.createUser(req.body);
            return res.status(201).json(user);
        } catch(err){
            res.status(400).json({error: err.message });
        }
    }
}

module.exports = new UserController();
