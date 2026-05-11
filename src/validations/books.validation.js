const { body, checkExact, param, query } = require("express-validator");

const bookRequirements = {
  paramId: () =>
    param("id").isInt({ min: 1 }).withMessage("Invalid id param.").toInt(),
  queryTitle: () =>
    query("title")
      .isLength({ min: 4, max: 200 })
      .withMessage("Title must be between 4 and 200 symbols."),
  bodyTitle: () =>
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Title is required.")
      .isLength({ min: 3, max: 200 })
      .withMessage("Title must be between 4 and 200 symbols."),
  author: () =>
    body("author")
      .trim()
      .notEmpty()
      .withMessage("Author is required.")
      .isLength({ min: 3, max: 100 })
      .withMessage("Author must be between 3 and 100 symbols."),
  year: () =>
    body("year")
      .notEmpty()
      .withMessage("Year is required.")
      .isInt({ max: new Date().getFullYear() })
      .withMessage(
        `Year must be a number and cannot be more than ${new Date().getFullYear()}.`
      ),
  pages: () =>
    body("pages")
      .notEmpty()
      .withMessage("Pages is required.")
      .isInt({ min: 1, max: 10000 })
      .withMessage("Pages must be between 1 and 10000."),
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
      message: "Only title, author, year and pages are allowed.",
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
        throw new Error("At least one field must be provided.");
      }
      return true;
    }),
    checkExact([], {
      message: "Only title, author, year and pages are allowed.",
    }),
  ],
  deleteBookById: [bookRequirements.paramId()],
};
