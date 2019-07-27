'use strict'
const User = use('App/Models/User')

class SessionController {
  async store ({ request, response, auth }) {
    const { email, password } = request.all()
    try {
      const token = await auth.attempt(email, password)
      const user = await User.query().where('email', email).first()

      return { ...token, user }
    } catch (error) {
      return response.status(404).json({ error: error.message })
    }
  }
}

module.exports = SessionController
