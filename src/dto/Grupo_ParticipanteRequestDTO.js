function toGrupo_ParticipanteModel(data){
    return{
        grupoId: data.grupoId,
        userId: data.userId,
        isOwner: data.isOwner,
        isAdmin: data.isAdmin
    };
}

module.exports = {toGrupo_ParticipanteModel};