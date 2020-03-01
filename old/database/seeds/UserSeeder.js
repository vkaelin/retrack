'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')
// const Persona = use('Persona')

class UserSeeder {
  async run() {
    for (let i = 0; i < 20; i++) {
      await Factory.model('App/Models/User').create()
    }

    await User.create({
      username: 'John',
      email: 'john@doe.com',
      password: '1234'
    })

    // const payload = {
    //   username: 'John',
    //   email: 'john@doe.com',
    //   password: '1234',
    //   password_confirmation: '1234'
    // }

    // await Persona.register(payload)
  }
}

module.exports = UserSeeder
