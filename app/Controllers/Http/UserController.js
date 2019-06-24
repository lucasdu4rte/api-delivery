"use strict";
const User = use("App/Models/User");

class UserController {
  async store({ request, auth }) {
    const data = request.only(["name", "email", "password"]);

    const user = await User.create({ ...data, type: "user" });

    const token = await auth.generate(user)

    return { user, token };
  }
}

module.exports = UserController;
