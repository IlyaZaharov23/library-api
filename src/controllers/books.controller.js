const BooksService = require("../services/books.service");
const ErrorHelpers = require("../helpers/error.helpers");

class BooksController {
  async getBooks(req, res) {
    try {
      const { offset, limit, authorName } = req.query;
      const result = await BooksService.getBooks(authorName, offset, limit);
      res.send(result.data);
    } catch (error) {
      ErrorHelpers.catchError(res, error);
    }
  }
  async getBookById(req, res) {
    try {
      const id = req.params.id;
      const result = await BooksService.getBookById(id);
      if (!result.success) {
        return res.status(404).send(ErrorHelpers.customError(result.reason));
      }
      res.send(result.book);
    } catch (error) {
      ErrorHelpers.catchError(res, error);
    }
  }
  async getBooksByTitle(req, res) {
    try {
      const bookTitle = req.query.title;
      const result = await BooksService.getBooksByTitle(bookTitle);
      res.send(result.books);
    } catch (error) {
      ErrorHelpers.catchError(res, error);
    }
  }
  async createBook(req, res) {
    try {
      const result = await BooksService.createBook(req.body);
      res.status(201).send(result.data);
    } catch (error) {
      ErrorHelpers.catchError(res, error);
    }
  }
  async updateBookById(req, res) {
    try {
      const id = req.params.id;
      const result = await BooksService.updateBookById(id, req.body);
      if (!result.success) {
        return res.status(404).send(ErrorHelpers.customError(result.reason));
      }
      res.send(result.updatedBook);
    } catch (error) {
      ErrorHelpers.catchError(res, error);
    }
  }
  async deleteBookById(req, res) {
    try {
      const id = req.params.id;
      const result = await BooksService.deleteBookById(id);
      if (!result.success) {
        return res.status(404).send(ErrorHelpers.customError(result.reason));
      }
      res.send(result.id);
    } catch (error) {
      ErrorHelpers.catchError(res, error);
    }
  }
}

module.exports = new BooksController();
