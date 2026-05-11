const Router = require("express");
const BooksController = require("../controllers/books.controller");

const booksRouter = Router();

booksRouter
  .route("/books")
  .get(BooksController.getBooks)
  .post(BooksController.createBook);

booksRouter.route("/books/search").get(BooksController.getBooksByTitle);

booksRouter
  .route("/books/:id")
  .get(BooksController.getBookByUuid)
  .put(BooksController.updateBookByUuid)
  .delete(BooksController.deleteBookByUuid);

module.exports = booksRouter;
