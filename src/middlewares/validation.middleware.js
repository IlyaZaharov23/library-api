const { validationResult } = require("express-validator");
const ErrorHelpers = require("../helpers/error.helpers");

class ValidationMiddleware {
  validationResult(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(ErrorHelpers.validationError(errors.array()));
    }
    next();
  }
}

module.exports = new ValidationMiddleware();
