const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const BookLoans = sequelize.define("BookLoans", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Books",
      key: "id",
    },
  },
  borrowedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  returnedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  },
  status: {
    type: DataTypes.ENUM("borrowed", "returned", "overdue"),
    defaultValue: "borrowed",
  },
});

module.exports = BookLoans;
