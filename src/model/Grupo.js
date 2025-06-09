const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Grupo = sequelize.define("grupos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  }
}, {
  timestamps: true, 
});

module.exports = Grupo;
