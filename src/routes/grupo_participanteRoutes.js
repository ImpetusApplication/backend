const express = require("express");
const Grupo_ParticipanteController = require("../controller/Grupo_ParticipanteController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/:grupoId/:userId", authMiddleware, (req, res) =>
  Grupo_ParticipanteController.createGrupo_Participante(req, res)
);


module.exports = router;
