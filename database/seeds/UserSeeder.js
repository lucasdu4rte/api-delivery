"use strict";

const User = use("App/Models/User");

class UserSeeder {
  async run() {
    const users = await User.all();

    if (!users.toJSON().length) {
      await User.create({
        name: "Lucas Oliveira Duarte",
        email: "lucasdu4rte@gmail.com",
        password: "11223344l",
        type: "admin"
      });
    }
  }
}

module.exports = UserSeeder;
