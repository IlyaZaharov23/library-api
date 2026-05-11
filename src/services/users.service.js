const { v4: uuid } = require("uuid");
const Users = require("../models");

class UsersService {
  async getUsers(offset, limit) {
    try {
      const { count, rows: users } = await Users.findAndCountAll({
        offset: offset || 0,
        limit: limit || 10,
      });
      return { success: true, data: { count, users } };
    } catch (error) {
      throw error;
    }
  }
  async getUserByUuid(uuid) {
    try {
      const user = await Users.findOne({ where: { uuid } });
      if (!user) {
        return { success: false, reason: "User not found." };
      }
      return { success: true, data: user };
    } catch (error) {
      throw error;
    }
  }
  async createUser(user) {
    try {
      const existingUser = await Users.findOne({
        where: { email: user.email },
        attributes: ["id"],
      });
      if (existingUser) {
        return {
          success: false,
          reason: "User with this email already exists.",
        };
      }

      const newUser = { ...user, uuid: uuid() };
      const res = await Users.create(newUser);
      return { success: true, data: res };
    } catch (error) {
      throw error;
    }
  }
  async updateUserByUuid(user, uuid) {
    try {
      const existingUser = await Users.findOne({
        where: { uuid },
        attributes: ["id", "email"],
      });
      if (!existingUser) {
        return {
          success: false,
          reason: "User not found.",
        };
      }
      if (user.email && user.email !== existingUser.email) {
        const activeUser = await Users.findOne({
          where: { email: user.email },
          attributes: ["id"],
        });
        if (activeUser) {
          return {
            success: false,
            reason: "User with this email already exists.",
          };
        }
      }
      await Users.update(user, { where: { uuid } });
      const updatedUser = await Users.findOne({ where: { uuid } });
      return { success: true, data: updatedUser };
    } catch (error) {
      throw error;
    }
  }
  async deleteUserByUuid(uuid) {
    try {
      const existingUser = await Users.findOne({
        where: { uuid },
        attributes: ["id"],
      });
      if (!existingUser) {
        return { success: false, reason: "User not found." };
      }
      const res = await Users.destroy({ where: { uuid } });
      return { success: true, data: res };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UsersService;
