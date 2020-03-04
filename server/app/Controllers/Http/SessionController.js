'use strict'

const Persona = use('Persona')

class SessionController {
  async store({ auth, request, response }) {
    const payload = request.only(['uid', 'password'])
    console.log(payload)

    const user = await Persona.verify(payload)
    const remember = request.input('remember')
    await auth.remember(remember).login(user)

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
