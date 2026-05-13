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
    const message =
      process.env.NODE_ENV === "PRODUCTION"
        ? "Internal server error."
        : error.message;
    res.status(500).send(this.customError(message));
  }
}

module.exports = new ErrorHelpers();
