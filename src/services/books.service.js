const Books = require("../models");
const { v4: uuid } = require("uuid");

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
      return { books, count };
    } catch (error) {
      throw error;
    }
  }
  async getBookByUuid(uuid) {
    try {
      const book = await Books.findOne({ where: { uuid } });
      return book;
    } catch (error) {
      throw error;
    }
  }
  async getBookByTitle(bookTitle) {
    try {
      const whereClause = {};
      if (bookTitle) {
        whereClause.title = bookTitle;
      }
      const books = await Books.findAll({ where: whereClause });
      return books;
    } catch (error) {
      throw error;
    }
  }
  async createBook(book) {
    try {
      const newBook = { ...book, uuid: uuid() };
      const res = await Books.create(newBook);
      return res;
    } catch (error) {
      throw error;
    }
  }
  async updateBookByUuid(uuid, book) {
    try {
      const updatedBook = await Books.update(book, { where: { uuid } });
      return updatedBook;
    } catch (error) {
      throw error;
    }
  }
  async deleteBookByUuid(uuid) {
    try {
      const res = await Books.destroy({ where: { uuid } });
      return res;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BooksService;
