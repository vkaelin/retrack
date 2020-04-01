'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectSchema extends Schema {
  up() {
    this.create('projects', (table) => {
      table.increments()
      table.timestamps()

      table.string('name', 255)
      table.float('hourly_rate', 2)

      table.integer('client_id').unsigned()
      table.integer('owner_id').unsigned().notNullable()
    })
  }

  down() {
    this.drop('projects')
  }
}

module.exports = ProjectSchema
