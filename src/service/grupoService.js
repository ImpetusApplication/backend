const { deleteGrupo } = require("../controller/grupoController");
const grupoRepository = require("../repository/grupoRepository");
require("dotenv").config();

class grupoService {
  async creategrupo(grupoData) {
    if (!grupoData) {
      throw new Error("Dados do usuário são obrigatórios");
    }
    if (!grupoData.nome || !grupoData.ownerId) {
      throw new Error("Preencha todos os campos obrigatórios");
    }

    const grupo = await grupoRepository.create(grupoData);
    return grupo;
  }

  async getAllGrupos() {
    const grupo = await grupoRepository.findAll();

    return grupo;
  }

  async deleteGrupo(grupoId) {
    try {
      const sucesso = await grupoRepository.delete(grupoId);

      if (!sucesso) {
        throw new Error("Grupo não encontrado.");
      }

      return { message: "Grupo deletado com sucesso." };
    } catch (err) {
      throw err;
    }
  }

  async editGrupo(grupoId, novosDados) {
    try {
      const sucesso = await grupoRepository.edit(grupoId, novosDados);

      if (!sucesso) {
        throw new Error("Grupo não encontrado.");
      }
      return { message: "Grupo editado com sucesso." };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new grupoService();
