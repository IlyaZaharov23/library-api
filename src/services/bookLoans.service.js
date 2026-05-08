const BookLoans = require("../models");

class BookLoansService {
  async borrowBook(data) {
    try {
      const { userId, bookId, dueDate } = data;
      const activeLoan = await BookLoans.findOne({
        where: { bookId, returnedAt: null },
      });
      if (activeLoan) {
        return null;
      }
      const borrowData = {
        userId,
        bookId,
        dueDate,
      };
      const res = await BookLoans.create(borrowData);
      return res;
    } catch (error) {
      throw error;
    }
  }
  async returnBook(userId, bookId) {
    try {
      const currentLoan = await BookLoans.findOne({
        where: { bookId, userId, returnedAt: null },
      });
      if (!currentLoan) {
        return null;
      }
      const returnedDate = new Date();
      const status =
        currentLoan.dueDate < returnedDate ? "overdue" : "returned";
      currentLoan.status = status;
      currentLoan.returnedAt = returnedDate;
      await currentLoan.save();
      return currentLoan;
    } catch (error) {
      throw error;
    }
  }
  async getUserLoans(userId) {
    try {
      const loans = await BookLoans.findAll({ where: { userId } });
      return loans;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BookLoansService;
