'use strict'

class SessionController {
  async store({ auth, request, response }) {
    const { uid, password } = request.all()
    console.log(uid, password)

    await auth.logout()
    const user = await auth.remember(true).attempt(uid, password)

    return user
  }

  async destroy({ auth, response }) {
    await auth.logout()

    return response.ok({
      status: 200,
      message: 'Logged out successfully',
    })
  }
}

module.exports = SessionController
