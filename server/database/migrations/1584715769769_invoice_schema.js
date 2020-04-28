'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InvoiceSchema extends Schema {
  up () {
    this.create('invoices', (table) => {
      table.increments()
      table.timestamps()

      table.string('status').defaultTo('Draft')
      table.integer('number')
      table.string('remark').defaultTo('All prices in USD.')

      table.integer('project_id').unsigned().notNullable()
      table.integer('owner_id').unsigned().notNullable()
    })
  }

  down () {
    this.drop('invoices')
  }
}

module.exports = InvoiceSchema
