const { body, param, checkExact } = require("express-validator");

const bookLoansRequirements = {
  paramUserId: () =>
    param("id").isInt({ min: 1 }).withMessage("Invalid id param.").toInt(),
  bodyUserId: () =>
    body("userId")
      .notEmpty()
      .withMessage("UserId is required.")
      .isInt({ min: 1 })
      .withMessage("Invalid userId.")
      .toInt(),
  bookId: () =>
    body("bookId")
      .notEmpty()
      .withMessage("BookId is required.")
      .isInt({ min: 1 })
      .withMessage("Invalid bookId.")
      .toInt(),
  dueDate: () =>
    body("dueDate")
      .notEmpty()
      .withMessage("Due date is required.")
      .isISO8601()
      .withMessage("Due date must be a valid date (YYYY-MM-DD).")
      .custom((value) => {
        const date = new Date(value);
        const today = new Date();
        if (date <= today) {
          throw new Error("Due date must be in the future.");
        }
        return true;
      }),
};

module.exports = {
  borrowBook: [
    bookLoansRequirements.bodyUserId(),
    bookLoansRequirements.bookId(),
    bookLoansRequirements.dueDate(),
  ],
  returnBook: [
    bookLoansRequirements.bodyUserId(),
    bookLoansRequirements.bookId(),
    checkExact([], { message: "Only bookId and userId are allowed." }),
  ],
  getLoans: [bookLoansRequirements.paramUserId()],
};
