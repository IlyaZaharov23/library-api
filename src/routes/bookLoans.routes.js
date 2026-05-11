const Router = require("express");
const BookLoansController = require("../controllers/bookLoans.controller");

const bookLoansRouter = Router();

bookLoansRouter
  .route("/loans")
  .post(BookLoansController.borrowBook)
  .put(BookLoansController.returnBook);

bookLoansRouter.route("/loans/:id").get(BookLoansController.getUserLoans);

module.exports = bookLoansRouter;
