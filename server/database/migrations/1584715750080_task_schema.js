'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TaskSchema extends Schema {
  up () {
    this.create('tasks', (table) => {
      table.increments()
      table.timestamps()

      table.string('name', 255).notNullable()
      table.string('description', 255)
      table.date('date_start')
      table.date('date_end')
      table.integer('planned_time')
      table.integer('actual_time')
      table.boolean('started').defaultTo(false)
      table.date('last_time_started')
      table.boolean('payed').defaultTo(false)
      
      table.integer('project_id').unsigned().notNullable()
      table.integer('invoice_id').unsigned()
    })
  }

  down () {
    this.drop('tasks')
  }
}

module.exports = TaskSchema
