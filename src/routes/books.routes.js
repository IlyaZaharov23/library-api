const Router = require("express");
const BooksController = require("../controllers/books.controller");
const BooksValidator = require("../validations/books.validation");
const ValidationMiddleware = require("../middlewares/validation.middleware");

const booksRouter = Router();

booksRouter
  .route("/books")
  .get(BooksController.getBooks)
  .post(
    BooksValidator.createBook,
    ValidationMiddleware.validationResult,
    BooksController.createBook
  );

booksRouter
  .route("/books/search")
  .get(
    BooksValidator.getBookByTitle,
    ValidationMiddleware.validationResult,
    BooksController.getBooksByTitle
  );

booksRouter
  .route("/books/:id")
  .get(
    BooksValidator.getBookById,
    ValidationMiddleware.validationResult,
    BooksController.getBookById
  )
  .put(
    BooksValidator.updateBookById,
    ValidationMiddleware.validationResult,
    BooksController.updateBookById
  )
  .delete(
    BooksValidator.deleteBookById,
    ValidationMiddleware.validationResult,
    BooksController.deleteBookById
  );

module.exports = booksRouter;
