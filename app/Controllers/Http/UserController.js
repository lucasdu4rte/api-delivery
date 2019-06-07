"use strict";
const User = use("App/Models/User");

class UserController {
  async store({ request }) {
    const data = request.only(["name", "email", "password", "type"]);

    const user = await User.create({ ...data, type: "user" });

    return user;
  }
}

module.exports = UserController;
