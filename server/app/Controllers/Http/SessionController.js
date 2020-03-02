'use strict'

const Persona = use('Persona')

class SessionController {
  async store({ auth, request, response }) {
    // const { uid, password } = request.all()
    // console.log(uid, password)

    // await auth.logout()
    // const user = await auth.attempt(uid, password)

    const payload = request.only(['uid', 'password'])
    console.log(payload)

    const user = await Persona.verify(payload)
    await auth.login(user)

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
