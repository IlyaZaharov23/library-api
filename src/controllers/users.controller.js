const UsersService = require("../services/users.service");

class UsersController {
  async getUsers(req, res) {
    try {
      const { offset, limit } = req.query;
      const result = await UsersService.getUsers(offset, limit);
      res.send(result.data);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  async getUserById(req, res) {
    try {
      const id = req.params.id;
      const result = await UsersService.getUserById(id);
      if (!result.success) {
        return res.status(404).send({ message: result.reason });
      }
      res.send(result.data);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  async createUser(req, res) {
    try {
      console.log(req.body);
      
      const result = await UsersService.createUser(req.body);
      if (!result.success) {
        return res.status(400).send({ message: result.reason });
      }
      res.status(201).send(result.data);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  async updateUserById(req, res) {
    try {
      const result = await UsersService.updateUserById(req.body, req.params.id);
      if (!result.success) {
        return res
          .status(result.reason === "User not found." ? 404 : 400)
          .send({ message: result.reason });
      }
      res.send(result.data);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  async deleteUserById(req, res) {
    try {
      const result = await UsersService.deleteUserById(req.params.id);
      if (!result.success) {
        return res.status(404).send({ message: result.reason });
      }
      res.send(result.id);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}

module.exports = new UsersController();
