const Books = require("../models");
const { v4: uuid } = require("uuid");
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
        limit: limit || 10,
      });
      return { success: true, data: { books, count } };
    } catch (error) {
      throw error;
    }
  }
  async getBookByUuid(uuid) {
    try {
      const book = await Books.findOne({ where: { uuid } });
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
      const newBook = { ...book, uuid: uuid() };
      const res = await Books.create(newBook);
      return { success: true, data: res };
    } catch (error) {
      throw error;
    }
  }
  async updateBookByUuid(uuid, book) {
    try {
      const [affectedCount] = await Books.update(book, { where: { uuid } });
      if (!affectedCount) {
        return { success: false, reason: "Book not found." };
      }
      const updatedBook = await Books.findOne({ where: { uuid } });
      return { success: true, updatedBook };
    } catch (error) {
      throw error;
    }
  }
  async deleteBookByUuid(uuid) {
    try {
      const deletedCount = await Books.destroy({ where: { uuid } });
      if (!deletedCount) {
        return { success: false, reason: "Book not found." };
      }
      return { success: true, uuid };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BooksService;
