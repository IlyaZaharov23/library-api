const { Books } = require("../models");
const { Op } = require("sequelize");

class BooksService {
  async getBooks(authorName, offset, limit) {
    try {
      const whereClause = {};      
      if (authorName) {
        whereClause.author = authorName;
      }      
      const { count, rows: books } = await Books.findAndCountAll({
        where: whereClause,
        offset: offset || 0,
        limit: limit || 100,
      });
      return { success: true, data: { books, count } };
    } catch (error) {
      throw error;
    }
  }
  async getBookById(id) {
    try {
      const book = await Books.findByPk(id);
      if (!book) {
        return { success: false, reason: "Book not found." };
      }
      return { success: true, book };
    } catch (error) {
      throw error;
    }
  }
  async getBooksByTitle(bookTitle) {
    try {
      const whereClause = {};
      if (bookTitle) {
        whereClause.title = { [Op.like]: `%${bookTitle}%` };
      }
      const books = await Books.findAll({ where: whereClause });
      return { success: true, books };
    } catch (error) {
      throw error;
    }
  }
  async createBook(book) {
    try {
      const res = await Books.create(book);
      return { success: true, data: res };
    } catch (error) {
      throw error;
    }
  }
  async updateBookById(id, book) {
    try {
      const [affectedCount] = await Books.update(book, { where: { id } });
      if (!affectedCount) {
        return { success: false, reason: "Book not found." };
      }
      const updatedBook = await Books.findByPk(id);
      return { success: true, updatedBook };
    } catch (error) {
      throw error;
    }
  }
  async deleteBookById(id) {
    try {
      const deletedCount = await Books.destroy({ where: { id } });
      if (!deletedCount) {
        return { success: false, reason: "Book not found." };
      }
      return { success: true, id };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new BooksService();
