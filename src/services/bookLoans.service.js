const { BookLoans, Books, Users } = require("../models");

class BookLoansService {
  async borrowBook(data) {
    try {
      const { userId, bookId, dueDate } = data;
      const currentUser = await Users.findByPk(userId);
      const currentBook = await Books.findByPk(bookId);
      if (!currentUser || !currentBook) {
        return { success: false, reason: "User or book not found." };
      }
      const activeLoan = await BookLoans.findOne({
        where: { bookId, returnedAt: null },
      });
      if (activeLoan) {
        return { success: false, reason: "Book already borrowed." };
      }
      if (new Date(dueDate) < new Date()) {
        return { success: false, reason: "Due date must be in the future." };
      }
      const borrowData = {
        userId,
        bookId,
        dueDate,
      };
      const res = await BookLoans.create(borrowData);
      await Books.update({ isAvailable: false }, { where: { id: bookId } });
      return { success: true, data: res };
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
        return {
          success: false,
          reason: "No active loan found for this user and book.",
        };
      }
      const returnedDate = new Date();
      const status =
        currentLoan.dueDate < returnedDate ? "overdue" : "returned";
      currentLoan.status = status;
      currentLoan.returnedAt = returnedDate;
      await currentLoan.save();
      await Books.update({ isAvailable: true }, { where: { id: bookId } });
      return { success: true, data: currentLoan };
    } catch (error) {
      throw error;
    }
  }
  async getUserLoans(userId) {
    try {
      const loans = await BookLoans.findAll({
        where: { userId },
        include: [
          {
            model: Books,
            attributes: ["title", "author", "pages", "year"],
          },
        ],
      });
      return { success: true, loans };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new BookLoansService();
