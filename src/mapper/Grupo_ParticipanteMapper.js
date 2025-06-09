const grupoRequestDTO = require('../dto/GrupoRequestDTO')
const grupoResponseDTO = require('../dto/GrupoResponseDTO')

module.exports = {
    toGrupoModel: grupoRequestDTO.toGrupoModel,
    toGrupoResponse: grupoResponseDTO.toGrupoResponse
};