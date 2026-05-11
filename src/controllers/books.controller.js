const BooksService = require("../services/books.service");

class BooksController {
  async getBooks(req, res) {
    try {
      const { offset, limit, authorName } = req.query;
      const result = await BooksService.getBooks(authorName, offset, limit);
      res.send(result.data);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  async getBookByUuid(req, res) {
    try {
      const uuid = req.params.id;
      const result = await BooksService.getBookByUuid(uuid);
      if (!result.success) {
        return res.status(404).send({ message: result.reason });
      }
      res.send(result.book);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  async getBooksByTitle(req, res) {
    try {
      const bookTitle = req.query.title;
      const result = await BooksService.getBooksByTitle(bookTitle);
      res.send(result.books);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  async createBook(req, res) {
    try {
      const result = await BooksService.createBook(req.body);
      res.status(201).send(result.data);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  async updateBookByUuid(req, res) {
    try {
      const uuid = req.params.id;
      const result = await BooksService.updateBookByUuid(uuid, req.body);
      if (!result.success) {
        return res.status(404).send({ message: result.reason });
      }
      res.send(result.updatedBook);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  async deleteBookByUuid(req, res) {
    try {
      const uuid = req.params.id;
      const result = await BooksService.deleteBookByUuid(uuid);
      if (!result.success) {
        return res.status(404).send({ message: result.reason });
      }
      res.send(result.uuid);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}

module.exports = BooksController;
