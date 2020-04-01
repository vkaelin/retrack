'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.increments()
      table.timestamps()

      table.string('company')
      table.string('street')
      table.string('city')
      table.string('country')

      table.integer('owner_id').unsigned().notNullable()
    })
  }

  down () {
    this.drop('clients')
  }
}

module.exports = ClientSchema
