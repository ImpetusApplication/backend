const Grupo = require("../model/Grupo");

class grupoRepository {
  // Cria um usuario
  async create(grupoData) {
    try {
      const novoGrupo = await Grupo.create(grupoData);
      return novoGrupo;
    } catch (error) {
      throw new Error("Falha ao salvar usuario: " + error);
    }
  }

  // Busca todos os usuarios no banco de dados
  async findAll() {
    const grupos = await Grupo.findAll();
    return grupos;
  }

  // Busca um usuario por ID
  async findById(id) {
    const grupo = await Grupo.findByPk(id);
    return grupo;
  }

  async findByEmail(email) {
    return await Grupo.findOne({ where: { email } });
  }

  // Delete um usuario por ID
  async delete(id) {
    const grupo = await this.findById(id);
    if (!grupo) {
      return false;
    }
    await grupo.destroy();
    return true;
  }

  async edit(id, novosDados) {
    const grupo = await this.findById(id);
    if (!grupo) {
      return false;
    }
    if (novosDados.novoNome) {
      grupo.nome = novosDados.novoNome;
    }
    if (novosDados.novaDescricao) {
      grupo.descricao = novosDados.novaDescricao;
    }
    if (novosDados.novoOwner) {
      grupo.ownerId = novosDados.novoOwner;
    }

    grupo.save();
    return true;
  }
}

module.exports = new grupoRepository();
