const Router = require("express");
const UsersController = require("../controllers/users.controller");

const usersRouter = Router();

usersRouter
  .route("/users")
  .get(UsersController.getUsers)
  .post(UsersController.createUser);

usersRouter
  .route("/users/:id")
  .get(UsersController.getUserByUuid)
  .put(UsersController.updateUserByUuid)
  .delete(UsersController.deleteUserByUuid);

module.exports = usersRouter;
