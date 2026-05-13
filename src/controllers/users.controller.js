const UsersService = require("../services/users.service");
const ErrorHelpers = require("../helpers/error.helpers");

class UsersController {
  async getUsers(req, res) {
    try {
      const { offset, limit } = req.query;
      const result = await UsersService.getUsers(offset, limit);
      res.send(result.data);
    } catch (error) {
      ErrorHelpers.catchError(res, error);
    }
  }
  async getUserById(req, res) {
    try {
      const id = req.params.id;
      const result = await UsersService.getUserById(id);
      if (!result.success) {
        return res.status(404).send(ErrorHelpers.customError(result.reason));
      }
      res.send(result.data);
    } catch (error) {
      ErrorHelpers.catchError(res, error);
    }
  }
  async createUser(req, res) {
    try {
      const result = await UsersService.createUser(req.body);
      if (!result.success) {
        return res.status(404).send(ErrorHelpers.customError(result.reason));
      }
      res.status(201).send(result.data);
    } catch (error) {
      ErrorHelpers.catchError(res, error);
    }
  }
  async updateUserById(req, res) {
    try {
      const result = await UsersService.updateUserById(req.body, req.params.id);
      if (!result.success) {
        return res
          .status(result.reason === "User not found." ? 404 : 400)
          .send(ErrorHelpers.customError(result.reason));
      }
      res.send(result.data);
    } catch (error) {
      ErrorHelpers.catchError(res, error);
    }
  }
  async deleteUserById(req, res) {
    try {
      const result = await UsersService.deleteUserById(req.params.id);
      if (!result.success) {
        return res.status(404).send(ErrorHelpers.customError(result.reason));
      }
      res.send({ id: result.id });
    } catch (error) {
      ErrorHelpers.catchError(res, error);
    }
  }
}

module.exports = new UsersController();
