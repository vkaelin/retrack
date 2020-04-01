'use strict'

/*
|--------------------------------------------------------------------------
| ClientSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
// const Factory = use('Factory')
const Client = use('App/Models/Client')

class ClientSeeder {
  async run() {
    await Client.create({
      company: 'FIBA',
      street: 'Route Suisse 5',
      city: '1295 Mies',
      country: 'Switzerland',
      owner_id: 21,
    })

    await Client.create({
      company: 'Wikimedia Foundation, Inc',
      street: '120 Kearny Street',
      city: 'San Francisco, California 94104',
      country: 'USA',
      owner_id: 21,
    })

  }
}

module.exports = ClientSeeder
