const { body, checkExact, param, query } = require("express-validator");
const REQUEST_FIELD = require("../constants/requestField.constants");
const ERROR_MESSAGES = require("../constants/errorMessages.constants");

const bookRequirements = {
  paramId: () =>
    param(REQUEST_FIELD.ID)
      .isInt({ min: 1 })
      .withMessage(ERROR_MESSAGES.INVALID_FORMAT(REQUEST_FIELD.ID))
      .toInt(),
  queryTitle: () =>
    query(REQUEST_FIELD.TITLE)
      .isLength({ min: 4, max: 200 })
      .withMessage(ERROR_MESSAGES.LENGTH_RANGE(REQUEST_FIELD.TITLE, 4, 200)),
  bodyTitle: () =>
    body(REQUEST_FIELD.TITLE)
      .trim()
      .notEmpty()
      .withMessage(ERROR_MESSAGES.FIELD_REQUIRED(REQUEST_FIELD.TITLE))
      .isLength({ min: 3, max: 200 })
      .withMessage(ERROR_MESSAGES.LENGTH_RANGE(REQUEST_FIELD.TITLE, 4, 200)),
  author: () =>
    body(REQUEST_FIELD.AUTHOR)
      .trim()
      .notEmpty()
      .withMessage(ERROR_MESSAGES.FIELD_REQUIRED(REQUEST_FIELD.AUTHOR))
      .isLength({ min: 3, max: 100 })
      .withMessage(ERROR_MESSAGES.LENGTH_RANGE(REQUEST_FIELD.AUTHOR, 3, 100)),
  year: () =>
    body(REQUEST_FIELD.YEAR)
      .notEmpty()
      .withMessage(ERROR_MESSAGES.FIELD_REQUIRED(REQUEST_FIELD.YEAR))
      .isInt({ max: new Date().getFullYear() })
      .withMessage(
        `Year must be a number and cannot be more than ${new Date().getFullYear()}.`
      ),
  pages: () =>
    body(REQUEST_FIELD.PAGES)
      .notEmpty()
      .withMessage(ERROR_MESSAGES.FIELD_REQUIRED(REQUEST_FIELD.PAGES))
      .isInt({ min: 1, max: 10000 })
      .withMessage(ERROR_MESSAGES.LENGTH_RANGE(REQUEST_FIELD.PAGES, 1, 10000)),
};

module.exports = {
  getBookById: [bookRequirements.paramId()],
  getBookByTitle: [bookRequirements.queryTitle()],
  createBook: [
    bookRequirements.bodyTitle(),
    bookRequirements.author(),
    bookRequirements.year(),
    bookRequirements.pages(),
    checkExact([], {
      message: ERROR_MESSAGES.ONLY_FIELDS_ALLOWED([
        REQUEST_FIELD.TITLE,
        REQUEST_FIELD.AUTHOR,
        REQUEST_FIELD.YEAR,
        REQUEST_FIELD.PAGES,
      ]),
    }),
  ],
  updateBookById: [
    bookRequirements.paramId(),
    bookRequirements.bodyTitle().optional(),
    bookRequirements.author().optional(),
    bookRequirements.year().optional(),
    bookRequirements.pages().optional(),
    body().custom((value) => {
      if (Object.keys(value).length === 0) {
        throw new Error(ERROR_MESSAGES.AT_LEAST_ONE);
      }
      return true;
    }),
    checkExact([], {
      message: ERROR_MESSAGES.ONLY_FIELDS_ALLOWED([
        REQUEST_FIELD.TITLE,
        REQUEST_FIELD.AUTHOR,
        REQUEST_FIELD.YEAR,
        REQUEST_FIELD.PAGES,
      ]),
    }),
  ],
  deleteBookById: [bookRequirements.paramId()],
};
