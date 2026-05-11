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
  async getBookById(req, res) {
    try {
      const id = req.params.id;
      const result = await BooksService.getBookById(id);
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
  async updateBookById(req, res) {
    try {
      const id = req.params.id;
      const result = await BooksService.updateBookById(id, req.body);
      if (!result.success) {
        return res.status(404).send({ message: result.reason });
      }
      res.send(result.updatedBook);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  async deleteBookById(req, res) {
    try {
      const id = req.params.id;
      const result = await BooksService.deleteBookById(id);
      if (!result.success) {
        return res.status(404).send({ message: result.reason });
      }
      res.send(result.id);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}

module.exports = new BooksController();
