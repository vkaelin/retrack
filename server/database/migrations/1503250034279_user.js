'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.timestamps()

      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('email_hashed', 254)
      table.string('password', 60).notNullable()
      table.string('account_status')
      table.string('company')
      table.string('street')
      table.string('city')
      table.string('country')
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
