const Router = require("express");
const BookLoansController = require("../controllers/bookLoans.controller");
const BookLoansValidator = require("../validations/bookLoans.validation");
const ValidationMiddleware = require("../middlewares/validation.middleware");

const bookLoansRouter = Router();

bookLoansRouter
  .route("/loans")
  .post(
    BookLoansValidator.borrowBook,
    ValidationMiddleware.validationResult,
    BookLoansController.borrowBook
  )
  .put(
    BookLoansValidator.returnBook,
    ValidationMiddleware.validationResult,
    BookLoansController.returnBook
  );

bookLoansRouter
  .route("/loans/:id")
  .get(
    BookLoansValidator.getLoans,
    ValidationMiddleware.validationResult,
    BookLoansController.getUserLoans
  );

module.exports = bookLoansRouter;
