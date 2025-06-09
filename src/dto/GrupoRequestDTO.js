function toGrupoModel(data){
    return{
        nome: data.nome,
        descricao: data.descricao,
        ownerId: data.ownerId
    };
}

module.exports = {toGrupoModel};