const BookLoansService = require("../services/bookLoans.service");

class BookLoansController {
  async borrowBook(req, res) {
    try {
      const result = await BookLoansService.borrowBook(req.body);
      if (!result.success) {
        return res.status(400).send({ message: result.reason });
      }
      res.send(result.data);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  async returnBook(req, res) {
    try {
      const { userId, bookId } = req.body;
      const result = await BookLoansService.returnBook(userId, bookId);
      if (!result.success) {
        return res.status(400).send({ message: result.reason });
      }
      res.send(result.data);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  async getUserLoans(req, res) {
    try {
      const userId = req.params.id;
      const result = await BookLoansService.getUserLoans(userId);
      res.send(result.loans);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}

module.exports = BookLoansController;
