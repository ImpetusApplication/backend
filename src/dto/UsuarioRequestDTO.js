function toUserModel(data){
    return{
        name: data.name,
        email: data.email,
        password: data.password,
        birthdate: data.birthdate,
    };
}

module.exports = {toUserModel};