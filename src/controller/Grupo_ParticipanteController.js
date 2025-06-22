const Grupo_ParticipanteService = require("../service/Grupo_ParticipanteService");
const Grupo_ParticipanteMapper = require("../mapper/Grupo_ParticipanteMapper");

class Grupo_ParticipanteController {
  async getAllGrupoParticipantes(req, res) {
    const grupoId = req.params.grupoId;

    try {
      const participantes =
        await Grupo_ParticipanteService.getAllGrupoParticipantes(grupoId);

      return res.json(participantes);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async createGrupo_Participante(req, res) {
    const data = {
      grupoId: req.params.grupoId,
      userId: req.params.userId,
    };

    try {
      const Grupo_ParticipanteModel =
        Grupo_ParticipanteMapper.toGrupo_ParticipanteModel(data);
      const Grupo_Participante =
        await Grupo_ParticipanteService.createGrupo_Participante(
          Grupo_ParticipanteModel
        );
      const Grupo_ParticipanteResponse =
        Grupo_ParticipanteMapper.toGrupo_ParticipanteResponse(
          Grupo_Participante
        );
      return res.status(201).json(Grupo_ParticipanteResponse);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new Grupo_ParticipanteController();
