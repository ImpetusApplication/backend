const express = require("express");
const grupoController = require("../controller/grupoController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, (req, res) =>
  grupoController.getAllGrupos(req, res)
);

router.post("/", authMiddleware, (req, res) =>
  grupoController.createGrupo(req, res)
);

router.delete("/:id", authMiddleware, (req, res) =>
  grupoController.deleteGrupo(req, res)
);

router.put("/:id", authMiddleware, (req, res) =>
  grupoController.editGrupo(req, res)
);

module.exports = router;
