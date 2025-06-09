const Grupo_ParticipanteRepository = require("../repository/Grupo_ParticipanteRepository");
require("dotenv").config();

class Grupo_ParticipanteService {
  async createGrupo_Participante(data) {
    if (!data) {
      throw new Error("Dados do usuário são obrigatórios");
    }
    if (!data.userId || !data.grupoId) {
      throw new Error("Grupo ou usuario a ser relacionado nao foi informado");
    }

    const Grupo_Participante = await Grupo_ParticipanteRepository.create(data);
    return Grupo_Participante;
  }

  async getAllGrupoParticipantes(grupoId) {
    const participantes = await Grupo_ParticipanteRepository.getAllGrupoParticipantes(grupoId);

    return participantes;
  }

}

module.exports = new Grupo_ParticipanteService();
