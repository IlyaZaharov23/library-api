const Router = require("express");
const UsersController = require("../controllers/users.controller");
const UsersValidator = require("../validations/users.validation");
const ValidationMiddleware = require("../middlewares/validation.middleware");

const usersRouter = Router();

usersRouter
  .route("/users")
  .get(UsersController.getUsers)
  .post(
    UsersValidator.createUser,
    ValidationMiddleware.validationResult,
    UsersController.createUser
  );

usersRouter
  .route("/users/:id")
  .get(
    UsersValidator.getUserById,
    ValidationMiddleware.validationResult,
    UsersController.getUserById
  )
  .put(
    UsersValidator.updateUserById,
    ValidationMiddleware.validationResult,
    UsersController.updateUserById
  )
  .delete(
    UsersValidator.deleteUserById,
    ValidationMiddleware.validationResult,
    UsersController.deleteUserById
  );

module.exports = usersRouter;
