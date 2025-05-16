const UserRequestDTO = require('../dto/UsuarioRequestDTO')
const UserResponseDTO = require('../dto/UsuarioResponseDTO')

module.exports = {
    toUserModel: UserRequestDTO.toUserModel,
    toUserResponse: UserResponseDTO.toUserResponse
};