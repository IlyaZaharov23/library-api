const { body, param, checkExact } = require("express-validator");
const REQUEST_FIELD = require("../constants/requestField.constants");
const ERROR_MESSAGES = require("../constants/errorMessages.constants");

const userRequirements = {
  paramId: () =>
    param(REQUEST_FIELD.ID)
      .isInt({ min: 1 })
      .withMessage(ERROR_MESSAGES.INVALID_FORMAT(REQUEST_FIELD.ID))
      .toInt(),
  name: () =>
    body(REQUEST_FIELD.NAME)
      .trim()
      .notEmpty()
      .withMessage(ERROR_MESSAGES.FIELD_REQUIRED(REQUEST_FIELD.NAME))
      .isLength({ min: 3, max: 100 })
      .withMessage(ERROR_MESSAGES.LENGTH_RANGE(REQUEST_FIELD.NAME, 3, 100)),
  email: () =>
    body(REQUEST_FIELD.EMAIL)
      .trim()
      .notEmpty()
      .withMessage(ERROR_MESSAGES.FIELD_REQUIRED(REQUEST_FIELD.EMAIL))
      .isEmail()
      .withMessage(ERROR_MESSAGES.INVALID_FORMAT(REQUEST_FIELD.EMAIL)),
};

module.exports = {
  getUserById: [userRequirements.paramId()],
  createUser: [
    userRequirements.name(),
    userRequirements.email(),
    checkExact([], {
      message: ERROR_MESSAGES.ONLY_FIELDS_ALLOWED([
        REQUEST_FIELD.NAME,
        REQUEST_FIELD.EMAIL,
      ]),
    }),
  ],
  updateUserById: [
    userRequirements.paramId(),
    userRequirements.name().optional(),
    userRequirements.email().optional(),
    checkExact([], {
      message: ERROR_MESSAGES.ONLY_FIELDS_ALLOWED([
        REQUEST_FIELD.NAME,
        REQUEST_FIELD.EMAIL,
      ]),
    }),
    body().custom((value) => {
      if (Object.keys(value).length === 0) {
        throw new Error(ERROR_MESSAGES.AT_LEAST_ONE);
      }
      return true;
    }),
  ],
  deleteUserById: [userRequirements.paramId()],
};
