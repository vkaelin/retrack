'use strict'

class AuthController {
  async login({ auth, request, response }) {
    const { uid, password } = request.all()
    console.log(uid, password)

    await auth.logout()
    const user = await auth.remember(true).attempt(uid, password)

    return user
  }
}

module.exports = AuthController
