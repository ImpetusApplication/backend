const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Grupo_Participante = sequelize.define(
  "Grupo_Participante",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    grupoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "grupos",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    isOwner: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = Grupo_Participante;
