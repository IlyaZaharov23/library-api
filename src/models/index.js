const sequelize = require("../config/db");
const Books = require("./books.model");
const Users = require("./users.model");
const BookLoans = require("./bookLoans.model");

Users.hasMany(BookLoans, { foreignKey: "userId" });
BookLoans.belongsTo(Users, { foreignKey: "userId" });

Books.hasMany(BookLoans, { foreignKey: "bookId" });
BookLoans.belongsTo(Books, { foreignKey: "bookId" });

(async () => {
  try {
    if (process.env.NODE_ENV === "DEVELOPMENT") {
      await sequelize.sync({ alter: true });
    }
    console.log("Tables synced successfully.");
  } catch (error) {
    console.log("Sync DB error: ", error);
  }
})();

module.exports = { Users, BookLoans, Books };
