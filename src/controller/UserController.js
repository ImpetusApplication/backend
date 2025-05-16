const User = require('../model/User');
const UserService = require('../service/UserService');
const UserMapper = require('../mapper/UsuarioMapper');

class UserController {

    async createUser(req,res){
        try{

            const userModel = UserMapper.toUserModel(req.body);

            const user = await UserService.createUser(userModel);

            const userResponse = UserMapper.toUserResponse(user);
            return res.status(201).json(userResponse);
            
        } catch(err){
            res.status(400).json({error: err.message });
        }
    }

    async login(req,res){
        try{
            const{email,password} = req.body
            const{user,token} = await UserService.login(email,password);
            res.json({user,token});
        } catch(err){
            res.status(401).json({error: err.message});
        }
    }
}

module.exports = new UserController();
