'use strict'

const Persona = use('Persona')

class UserController {
  async current({ auth }) {
    return auth.user
  }

  async store({ auth, request, response }) {
    const payload = request.only([
      'username', 'email', 'password', 'password_confirmation'])

    const user = await Persona.register(payload)

    await auth.login(user)

    return response.ok({
      user,
    })
  }
}

module.exports = UserController
