const { body, param, checkExact } = require("express-validator");

const userRequirements = {
  paramId: () =>
    param("id").isInt({ min: 1 }).withMessage("Invalid id param.").toInt(),
  name: () =>
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required.")
      .isLength({ min: 3, max: 100 })
      .withMessage("Name must be between 3 and 100 symbols."),
  email: () =>
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Invalid email format."),
};

module.exports = {
  getUserById: [userRequirements.paramId()],
  createUser: [
    userRequirements.name(),
    userRequirements.email(),
    checkExact([], { message: "Only name and email are allowed." }),
  ],
  updateUserById: [
    userRequirements.paramId(),
    userRequirements.name().optional(),
    userRequirements.email().optional(),
    checkExact([], { message: "Only name and email are allowed." }),
    body().custom((value) => {
      if (Object.keys(value).length === 0) {
        throw new Error("At least one field must be provided.");
      }
      return true;
    }),
  ],
  deleteUserById: [userRequirements.paramId()],
};
