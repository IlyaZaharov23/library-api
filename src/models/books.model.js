const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Books = sequelize.define("Books", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  uuid: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [4, 200],
    },
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 100],
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pages: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
});

module.exports = Books;
