const Sentry = require("@sentry/node");
class ErrorHelpers {
  validationError(errors) {
    return errors.map((err) => err.msg);
  }
  customError(reason) {
    return [reason];
  }
  catchError(res, error) {
    Sentry.captureException(error);
    res.status(500).send(this.customError(error.message));
  }
}

module.exports = new ErrorHelpers();
