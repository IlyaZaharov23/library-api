const BookLoansService = require("../services/bookLoans.service");
const ErrorHelpers = require("../helpers/error.helpers");

class BookLoansController {
  async borrowBook(req, res) {
    try {
      const result = await BookLoansService.borrowBook(req.body);
      if (!result.success) {
        return res.status(400).send(ErrorHelpers.customError(result.reason));
      }
      res.send(result.data);
    } catch (error) {
      ErrorHelpers.catchError(res, error);
    }
  }
  async returnBook(req, res) {
    try {
      const { userId, bookId } = req.body;
      const result = await BookLoansService.returnBook(userId, bookId);
      if (!result.success) {
        return res.status(400).send(ErrorHelpers.customError(result.reason));
      }
      res.send(result.data);
    } catch (error) {
      ErrorHelpers.catchError(res, error);
    }
  }
  async getUserLoans(req, res) {
    try {
      const userId = req.params.id;
      const result = await BookLoansService.getUserLoans(userId);
      res.send(result.loans);
    } catch (error) {
      ErrorHelpers.catchError(res, error);
    }
  }
}

module.exports = new BookLoansController();
