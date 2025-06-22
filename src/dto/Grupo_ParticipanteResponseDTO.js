function toGrupo_ParticipanteResponse(data){
    return {
        grupoId: data.grupoId,
        userId: data.userId
    };
}

module.exports = {toGrupo_ParticipanteResponse};