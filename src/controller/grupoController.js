const grupoService = require("../service/grupoService");
const grupoMapper = require("../mapper/GrupoMapper");

class grupoController {
  async getAllGrupos(req, res) {
    try {
      const lista = await grupoService.getAllGrupos();

      return res.json(lista);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async createGrupo(req, res) {
    try {
      const grupoModel = grupoMapper.toGrupoModel(req.body);
      const grupo = await grupoService.creategrupo(grupoModel);
      const grupoResponse = grupoMapper.toGrupoResponse(grupo);
      return res.status(201).json(grupoResponse);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async deleteGrupo(req, res) {
    const grupoId = req.params.id;

    try {
      const response = await grupoService.deleteGrupo(grupoId);

      return res.json(response);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async editGrupo(req, res) {
    const grupoId = req.params.id;
    const novosDados = req.body

    try {
      const response = await grupoService.editGrupo(grupoId, novosDados);

      return res.json(response);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

}

module.exports = new grupoController();
