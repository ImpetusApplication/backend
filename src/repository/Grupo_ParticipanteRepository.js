const Grupo_Participante = require("../model/Grupo_Participante");
const sequelize = require("../config/db");

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

  //bsca todos os participantes de um grupo
  async getAllGrupoParticipantes(grupoId) {
    try {
      const query = `
      SELECT 
        gp.isOwner, 
        gp.isAdmin,
        u.id, 
        u.nome, 
        u.email
      FROM Grupo_Participante gp
      JOIN users u ON gp.userId = u.id
      WHERE gp.grupoId = :grupoId
    `;

      const [result] = await sequelize.query(query, {
        replacements: { grupoId },
        type: sequelize.QueryTypes.SELECT,
      });

      return result;
    } catch (error) {
      throw new Error("Falha ao buscar participantes: " + error.message);
    }
  }
}

module.exports = new Grupo_ParticipanteRepository();
