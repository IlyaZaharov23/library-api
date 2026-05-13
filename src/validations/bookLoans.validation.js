const { body, param, checkExact } = require("express-validator");
const REQUEST_FIELD = require("../constants/requestField.constants");
const ERROR_MESSAGES = require("../constants/errorMessages.constants");

const bookLoansRequirements = {
  paramUserId: () =>
    param(REQUEST_FIELD.ID)
      .isInt({ min: 1 })
      .withMessage(ERROR_MESSAGES.INVALID_FORMAT(REQUEST_FIELD.ID))
      .toInt(),
  bodyUserId: () =>
    body(REQUEST_FIELD.USER_ID)
      .notEmpty()
      .withMessage(ERROR_MESSAGES.FIELD_REQUIRED(REQUEST_FIELD.USER_ID))
      .isInt({ min: 1 })
      .withMessage(ERROR_MESSAGES.INVALID_FORMAT(REQUEST_FIELD.USER_ID))
      .toInt(),
  bookId: () =>
    body(REQUEST_FIELD.BOOK_ID)
      .notEmpty()
      .withMessage(ERROR_MESSAGES.FIELD_REQUIRED(REQUEST_FIELD.BOOK_ID))
      .isInt({ min: 1 })
      .withMessage(ERROR_MESSAGES.INVALID_FORMAT(REQUEST_FIELD.BOOK_ID))
      .toInt(),
  dueDate: () =>
    body(REQUEST_FIELD.DUE_DATE)
      .notEmpty()
      .withMessage(ERROR_MESSAGES.FIELD_REQUIRED(REQUEST_FIELD.DUE_DATE))
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
    checkExact([], {
      message: ERROR_MESSAGES.ONLY_FIELDS_ALLOWED([
        REQUEST_FIELD.BOOK_ID,
        REQUEST_FIELD.USER_ID,
      ]),
    }),
  ],
  getLoans: [bookLoansRequirements.paramUserId()],
};
