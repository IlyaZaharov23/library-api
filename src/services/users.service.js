const { Users } = require("../models");

class UsersService {
  async getUsers(offset, limit) {
    try {
      const { count, rows: users } = await Users.findAndCountAll({
        offset: offset || 0,
        limit: limit || 100,
      });
      return { success: true, data: { count, users } };
    } catch (error) {
      throw error;
    }
  }
  async getUserById(id) {
    try {
      const user = await Users.findByPk(id);
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
      
      const res = await Users.create(user);
      return { success: true, data: res };
    } catch (error) {
      throw error;
    }
  }
  async updateUserById(user, id) {
    try {
      const existingUser = await Users.findByPk(id);
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
      await Users.update(user, { where: { id } });
      const updatedUser = await Users.findByPk(id);
      return { success: true, data: updatedUser };
    } catch (error) {
      throw error;
    }
  }
  async deleteUserById(id) {
    try {
      const existingUser = await Users.findByPk(id);
      if (!existingUser) {
        return { success: false, reason: "User not found." };
      }
      await Users.destroy({ where: { id } });
      return { success: true, id };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UsersService();
