'use strict'

const User = use('App/Models/User')
// const Persona = use('Persona')
const InvalidCredential = use('App/Exceptions/InvalidCredentialException')

class AuthController {
  async current ({ auth }) {
    console.log('HELLO')
    return auth.user
  }

  async login({ auth, request, response }) {
    const { uid, password } = request.all()
    console.log(uid, password)

    const payload = request.only(['uid', 'password'])

    // const token = await auth.withRefreshToken().attempt(email, password)
    // const user = await auth.attempt(email, password)

    console.log(payload)

    // const user = await Persona.verify(payload)
    //   .catch(() => {
    //     throw new InvalidCredential('Authentication failed. Either supplied credentials are invalid or the account is inactive', 401, 'E_INVALID_CREDENTIAL')
    //   })

    // await auth.login(user)
    const user = await auth.attempt(uid, password)

    return user
  }

  async register({ request, response }) {
    const { name, email, password } = request.all()
    const user = new User({
      name,
      email,
      password,
    })
    await user.save()
    return response.created('User created!')
  }
}

module.exports = AuthController
