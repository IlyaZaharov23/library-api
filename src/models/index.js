const sequelize = require("../config/db");
const Books = require("./books.model");
const Users = require("./users.model");
const BookLoans = require("./bookLoans.model");

Users.belongsToMany(Books, {
  through: BookLoans,
  foreignKey: "userId",
  as: "borrowedBooks",
});

Books.belongsToMany(Users, {
  through: BookLoans,
  foreignKey: "bookId",
  as: "borrowers",
});

async () => {
  try {
    if (process.env.NODE_ENV === "DEVELOPMENT") {
      await sequelize.sync({ alter: true });
    }
    console.log("Tables synced successfully.");
  } catch (error) {
    console.log("Sync DB error: ", error);
  }
};

module.exports = { Users, BookLoans, Books };
