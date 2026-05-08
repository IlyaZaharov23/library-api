const { v4: uuid } = require("uuid");
const Users = require("../models");

class UsersService {
  async getUsers(offset, limit) {
    try {
      const { count, rows: users } = await Users.findAndCountAll({
        offset: offset || 0,
        limit: limit || 10,
      });
      return { count, users };
    } catch (error) {
      throw error;
    }
  }
  async getUserByUuid(uuid) {
    try {
      const user = await Users.findOne({ where: { uuid } });
      return user;
    } catch (error) {
      throw error;
    }
  }
  async createUser(user) {
    try {
      const newUser = { ...user, uuid: uuid() };
      const res = await Users.create(newUser);
      return res;
    } catch (error) {
      throw error;
    }
  }
  async updateUserByUuid(user, uuid) {
    try {
      const updatedUser = await Users.update(user, { where: { uuid } });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
  async deleteUserByUuid(uuid) {
    try {
      const res = await Users.destroy({ where: { uuid } });
      return res;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UsersService;
