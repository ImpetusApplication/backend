const Grupo_Participante = require("../model/Grupo_Participante");

class Grupo_ParticipanteRepository {
  // Adiciona um participante a um grupo
  async create(data) {
    try {
      const novoGrupo_Participante = await Grupo_Participante.create(data);
      return novoGrupo_Participante;
    } catch (error) {
      throw new Error("Falha ao salvar usuario: " + error);
    }
  }

  async getAllGrupoParticipantes(grupoId) {}
}

module.exports = new Grupo_ParticipanteRepository();
