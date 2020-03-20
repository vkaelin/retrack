'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectUsersSchema extends Schema {
  up () {
    this.create('project_users', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('project_users')
  }
}

module.exports = ProjectUsersSchema
