const grupo_participanteRequestDTO = require("../dto/Grupo_ParticipanteRequestDTO");
const grupo_participanteResponseDTO = require("../dto/Grupo_ParticipanteResponseDTO");

module.exports = {
  toGrupo_ParticipanteModel:
    grupo_participanteRequestDTO.toGrupo_ParticipanteModel,
  toGrupo_ParticipanteResponse:
    grupo_participanteResponseDTO.toGrupo_ParticipanteResponse,
};
